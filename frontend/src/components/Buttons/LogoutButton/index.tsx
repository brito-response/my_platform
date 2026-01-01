import { signOut } from "next-auth/react";

export const LogoutButton = () => {
    const handleLogout = () => {
        signOut({
            callbackUrl: "/login",
        });
    };

    return (
        <button onClick={handleLogout} className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-700">Logout</button>
    );
};