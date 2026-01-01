import { ContainerUpdateUser } from "@/components/Containers/ConatainerUpdateUser";

export default async function UpdateUserPage() {
    // const session: Session | null = await getServerSession(authOptions);

    return (
        <div className="w-full min-h-screen bg-(--bg-section-100) p-5">
            <ContainerUpdateUser />
        </div>
    );
}