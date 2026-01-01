import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";
import { IAuthenticateUser, requestAuthenticationUser } from "../../request-api";
import { decoderTokenToClaims } from "../../decode-claims";

export type User = { id: string; name: string; email: string; image: string; userStatus?: string; accessToken: string; };

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: "/",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "example@gmail.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req): Promise<User | null> {
                const user: IAuthenticateUser = {
                    email: credentials?.email,
                    password: credentials?.password,
                    clientType: "web",
                };
                const resposta = await requestAuthenticationUser(user);

                if (resposta.accessToken && resposta.accessToken !== "User with credentials not found or invalid") {
                    (await cookies()).set("jwt_back", resposta.accessToken, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 3600 });
                    (await cookies()).set("jwt_back_refresh", resposta.refreshToken, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 3600 });

                    const decodedClaims = decoderTokenToClaims(resposta.accessToken);
                    return { id: decodedClaims?.id ?? "", name: decodedClaims?.username ?? "", email: decodedClaims?.email ?? "", image: decodedClaims?.imagem ?? "", userStatus: decodedClaims?.userStatus ?? "unknown", accessToken: resposta.accessToken } as User;
                }
                return null;
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (user) {
                const u = user as any;
                token.id = u.id ?? "";
                token.name = u.name ?? "";
                token.email = u.email ?? "";
                token.image = u.image ?? "";
                token.userStatus = u.userStatus ?? "";
                if ("accessToken" in u) token.accessToken = u.accessToken ?? "";
            }

            if (trigger === "update" && session?.user) {
                token.name = session.user.name ?? token.name;
                token.email = session.user.email ?? token.email;
                token.image = session.user.image ?? token.image;
                token.userStatus = session.user.userStatus ?? token.userStatus;
            }

            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = (token as any).id;
                session.user.name = (token as any).name;
                session.user.email = (token as any).email;
                const image = typeof (token as any).image === "string" ? (token as any).image : undefined;
                session.user.image = image;
                (session.user as any).userStatus = (token as any).userStatus;
            }
            (session as any).accessToken = (token as any).accessToken ?? null;
            return session;
        },
    },
};

// Exporta o handler do NextAuth usando authOptions
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
