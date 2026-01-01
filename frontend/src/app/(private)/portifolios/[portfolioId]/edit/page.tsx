interface Props { params: { portfolioId: string }; };

export default async function EditPortifolio({ params }: Props) {
    const { portfolioId } = await params;

    return (
        <div className="w-full min-h-screen bg-(--bg-section-100)">
            <h2 className="text-cyan-50">EditPortifolio{portfolioId}</h2>
        </div>
    );
}