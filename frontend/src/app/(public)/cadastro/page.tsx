import { FormRegister } from "@/forms";

export default function Cadastro() {
    return (
        <div className={"w-full min-h-screen bg-slate-100 p-0.5 flex flex-col items-center "}>
            <h1 className="text-2xl my-12">Cadastrar-se</h1>
            <FormRegister />
        </div>
    );
}