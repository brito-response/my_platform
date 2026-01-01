export interface IAuthenticateUser { email: string | undefined; password: string | undefined; clientType: string; };

const requestAuthenticationUser = async (user: IAuthenticateUser) => {
    const resposta = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });
    return await resposta.json();
}
export { requestAuthenticationUser };
