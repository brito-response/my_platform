export interface Session {
    user: { name: string; email: string; image: string; id: string; userStatus: string; };
    accessToken: string;
}