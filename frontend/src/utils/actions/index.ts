const URL_FRONTEND: string = "http://localhost:3001/api";
const URL_BACKEND: string = "http://localhost:3000";

export class MessageError {
    private _message: string;

    constructor(message: string) {
        this._message = message;
    }
    public get message(): string {
        return this._message;
    }
    public set message(value: string) {
        this._message = value;
    }
    public static isMessageError(obj: unknown): obj is MessageError {
        return (
            typeof obj === "object" &&
            obj !== null &&
            obj instanceof MessageError
        );
    }
}
export interface Response { message: string; statusCode: number; };
export async function sendEmailServerSideProps(
    email: string
): Promise<Response> {
    try {
        const response = await fetch(URL_BACKEND + "/auth/sendEmail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email }),
        });
        if (response.ok) {
            return {
                message: "email enviado com sucesso.",
                statusCode: 200,
            } as Response;
        } else if (response.status === 404) {
            return {
                message: "esse email não esta cadastrado no sistema.",
                statusCode: 404,
            } as Response;
        }
        return {
            message: "formato de email incooreto.",
            statusCode: 400,
        } as Response;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return {
            message: "o servidor não esta responedo.",
            statusCode: 500,
        } as Response;
    }
}

// redem password
export interface IFormInputRedem {
    token: string;
    password: string;
    confirpassword: string;
}
export async function sendRedemServerSideProps(data: IFormInputRedem): Promise<Response> {
    try {
        const response = await fetch(URL_BACKEND + "/auth/redefinir", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                // 'Authorization': 'Bearer seu_token_aqui'  // Se precisar de autenticação, descomente esta linha
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
        // Erro de rede pode ocorrer nenhum status é retornado
        return {
            message: "o servidor deve estar fumando e não conseguiu respondeu.",
            statusCode: 500,
        } as Response;
    }
}

// register user
type FormRegister = {
    username: string;
    email: string;
    phone: string;
    cpf: string;
    password: string;
};
export interface IFormInput {
    name: string;
    email: string;
    telefone: string;
    cpf: string;
    password: string;
    repassword: string;
}
export async function registerUsuarioServerSideProps(data: IFormInput): Promise<Response> {
    try {
        const response = await fetch(URL_BACKEND + "/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: data.name,
                email: data.email,
                phone: data.telefone,
                cpf: data.cpf,
                password: data.password,
            } as FormRegister),
        });

        if (response.status === 201) {
            return {
                statusCode: 201,
                message: "registrado com sucesso.",
            } as Response;
        }
        return {
            statusCode: 400,
            message:
                "Ese email ja existe na aplicação, prossiga para redefinição de senha..",
        } as Response;
    } catch {
        return {
            statusCode: 500,
            message: "o servidor deve estar fumando e não conseguiu respondeu.",
        } as Response;
    }
}