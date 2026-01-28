"use client";

import Link from "next/link";
import { sendEmail, Response } from "@/utils/actions";
import { redirect } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const FormForgot = () => {
    const [data, setData] = useState<Response>({ statusCode: 0, message: '' });

    useEffect(() => { }, [data]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = (e.target as HTMLFormElement).email.value;
        const data = await sendEmail(email);
        setData(data);
        if (data.statusCode != 200) {
            toast.error(data.message);
        } else {
            redirect('/forgotredef');
        }
    }

    return (
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input id="email" type="email" className="w-full px-3 py-2 mt-1 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300" />

                <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">Send</button>
                <div className="mt-3 flex justify-between">
                    <Link href="/" className="text-sm text-blue-500 hover:underline" > Back to login </Link>
                    <Link href="/cadastro" className="text-sm text-blue-500 hover:underline" > Create account </Link>
                </div>
            </form>
        </div>
    );
}