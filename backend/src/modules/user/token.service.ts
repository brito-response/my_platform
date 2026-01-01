import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiError } from 'src/common/errors/api.error';
import * as crypto from 'crypto';

@Injectable()
export class TokenService {
  private readonly secretKey: Buffer;
  private static readonly ENCRYPTION_ALGORITHM = 'aes-256-gcm';
  private static readonly IV_LENGTH = 12;
  private static readonly TAG_LENGTH = 16;

  constructor(private readonly configService: ConfigService) {
    const envSecret = this.configService.get<string>('TOKEN_SECRET') ?? 'default_secret_32_bytes_long';
    this.secretKey = Buffer.alloc(32); // 256 bits = 32 bytes
    const keyBytes = Buffer.from(envSecret, 'utf-8');
    keyBytes.copy(this.secretKey, 0, 0, Math.min(keyBytes.length, this.secretKey.length));
  }

  public async generateToken(email: string): Promise<string> {
    const iv = crypto.randomBytes(TokenService.IV_LENGTH);
    const cipher = crypto.createCipheriv(TokenService.ENCRYPTION_ALGORITHM, this.secretKey, iv, { authTagLength: TokenService.TAG_LENGTH });

    const tokenData = `${email}:${this.secretKey.toString('utf-8')}`;
    const encrypted = Buffer.concat([cipher.update(tokenData, 'utf-8'), cipher.final()]);
    const authTag = cipher.getAuthTag();

    // Concatenar iv, authTag e encryptedData para formar o token
    return Buffer.concat([iv, authTag, encrypted]).toString('base64');
  }

  public async decryptToken(token: string): Promise<string> {
    const tokenBuffer = Buffer.from(token, 'base64');

    const iv = tokenBuffer.subarray(0, TokenService.IV_LENGTH);
    const authTag = tokenBuffer.subarray(TokenService.IV_LENGTH, TokenService.IV_LENGTH + TokenService.TAG_LENGTH);
    const encryptedData = tokenBuffer.subarray(TokenService.IV_LENGTH + TokenService.TAG_LENGTH);

    try {
      const decipher = crypto.createDecipheriv(TokenService.ENCRYPTION_ALGORITHM, this.secretKey, iv, { authTagLength: TokenService.TAG_LENGTH });
      decipher.setAuthTag(authTag);
      
      const decrypted = Buffer.concat([decipher.update(encryptedData), decipher.final()]);
      return decrypted.toString('utf-8');
    } catch {
      throw new ApiError('Error decrypting token', 500);
    }
  }

  public async validateToken(token: string, email: string): Promise<boolean> {
    try {
      const decryptedData = await this.decryptToken(token);
      const [decryptedEmail, secret] = decryptedData.split(':');

      return (decryptedEmail === email && secret === this.secretKey.toString('utf-8'));
    } catch (error) {
      throw new ApiError(error, 500);
    }
  }
}
