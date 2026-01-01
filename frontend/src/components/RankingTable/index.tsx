import { Crown } from "lucide-react";

type User = { id: string; name: string; role?: string; avatarUrl?: string; score: number };
type RankingTableProps = { title?: string; users: User[] };

export const RankingTable: React.FC<RankingTableProps> = ({ title = "Freelancers-Pontuação", users }) => {
    const sorted = [...users].sort((a, b) => b.score - a.score);
    const [titleOne, titleTwo] = title.split("-");

    return (
        <div className="w-full max-w-7xl rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-between px-4 py-3">
                <h3 className="text-lg font-semibold text-black">{titleOne}</h3>
                <span className="text-sm text-black">
                    {titleTwo}
                </span>
            </div>

            {/* Lista de usuários */}
            <ul className="divide-y text-black">
                {sorted.map((user, idx) => (
                    <li key={user.id} className="flex flex-col md:flex-row items-center justify-between gap-4 px-4 py-3">
                        {/* Colocação e avatar */}
                        <div className="flex items-center gap-4">
                            <span className="w-6 font-semibold text-orange-400">{idx + 1}</span>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden ring-1 ring-slate-200 dark:ring-slate-700">
                                    {user.avatarUrl ? (<img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />) : (
                                        <div className="w-full h-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-200 font-semibold">
                                            {user.name.split(" ").map(s => s[0]).slice(0, 2).join("")}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-black">{user.name}</span>
                                        {idx === 0 && (
                                            <span className="inline-flex items-center px-2 py-0.5 text-xs rounded-full bg-linear-to-r from-yellow-400 to-orange-400 text-white font-semibold">
                                                <Crown className="w-4 h-4 mr-1" />
                                                TOP
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-black dark:text-slate-400">{user.role ?? "Freelancer"}</p>
                                </div>
                            </div>
                        </div>

                        {/* Score */}
                        <div className="w-36 text-right">
                            <div className="text-sm font-semibold text-black">{user.score} pts</div>
                            <div className="mt-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full"
                                    style={{
                                        width: `${Math.min(100, (user.score / (sorted[0]?.score || 1)) * 100)}%`,
                                        background: idx === 0 ? "linear-gradient(90deg,#f59e0b,#ef4444)" : undefined,
                                    }}
                                />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="px-4 py-2 text-center text-xs text-slate-500 dark:text-slate-400">
                Visualização atualizada automaticamente
            </div>
        </div>
    );
};
