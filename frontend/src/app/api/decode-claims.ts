import { jwtDecode } from 'jwt-decode';

export interface IObjectClaims { id: string; username: string; email: string; imagem: string; roles: string | string[]; userStatus?: string; };

export const decoderTokenToClaims = (token: string): Partial<IObjectClaims> | null => {
    if (token) {
        try {
            const decodedToken = jwtDecode(token) as any;
            return { id: decodedToken.userId, username: decodedToken.userName, email: decodedToken.email, imagem: decodedToken.image, roles: decodedToken.roles, userStatus: decodedToken.userStatus };
        } catch (error) {
            return null;
        }
    } else {
        return null;
    }
}