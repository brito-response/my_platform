import { IsIn, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshDto {
  @ApiProperty({example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',description: 'refresh token da aplicação',})
  @IsString({ message: 'O refresh token deve ser uma string válida.' })
  refreshToken: string;

  @ApiProperty({example: 'web',description: 'Tipo de cliente que solicita o refresh (web ou mobile)',enum: ['web', 'mobile'],})
  @IsIn(['web', 'mobile'], { message: 'O tipo de cliente deve ser "web" ou "mobile".' })
  clientType: 'web' | 'mobile';
}
