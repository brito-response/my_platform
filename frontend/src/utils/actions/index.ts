const URL_BACKEND: string = "http://localhost:3000";

export interface Response { message: string; statusCode: number; };
export async function sendEmail(email: string): Promise<Response> {
    try {
        const response = await fetch(URL_BACKEND + "/auth/sendEmail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email }),
        });
        if (response.ok) {
            return { message: "email enviado com sucesso.", statusCode: 200 } as Response;
        } else if (response.status === 404) {
            return { message: "esse email não esta cadastrado no sistema.", statusCode: 404 } as Response;
        }
        return { message: "formato de email incooreto.", statusCode: 400 } as Response;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return { message: "o servidor não esta responedo.", statusCode: 500 } as Response;
    }
}

// redem password
export interface IFormInputRedem { token: string; password: string; confirpassword: string; };
export async function sendredef(data: IFormInputRedem): Promise<Response> {
    try {
        const response = await fetch(URL_BACKEND + "/auth/redefinir", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: data.token, password: data.password, rePassword: data.confirpassword }),
        });

        if (response.ok) {
            return {
                message: "senha redefinida com sucesso.",
                statusCode: 200,
            } as Response;
        }

        return {
            message: "usuario não encontrado, ou token ivalido.",
            statusCode: 404,
        } as Response;

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return { message: "o servidor deve estar fumando e não conseguiu respondeu.", statusCode: 500 } as Response;
    }
}