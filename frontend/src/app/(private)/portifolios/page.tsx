import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Banner } from "@/components/Banner";
import { FooterProjects } from "@/components/FooterProjects";
import { SpiderChart } from "@/components/SpiderChart";
import { Portfolio } from "@/utils/data_types/portifolios";
import { Session } from "@/utils/data_types/session";
import { MapPin, Briefcase, GraduationCap, SquarePenIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

type GithubRepo = {
    id: number;
    name: string;
    full_name: string;
    private: boolean;
    fork: boolean;
    html_url: string;
    description: string | null;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    language: string | null;
    languages_url: string;
    stargazers_count: number;
    watchers_count: number;
    forks_count: number;
    owner: {
        login: string;
        id: number;
        avatar_url: string;
        html_url: string;
    };
};

export type PortfolioData = {
    linguagem: string;
    porcentagem: number;
};

export async function getPortfolioData(username: string): Promise<PortfolioData[]> {
    try {
        const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
        const headers: Record<string, string> = { "User-Agent": "NextApp", Authorization: `token ${GITHUB_TOKEN}`, };

        // Busca os repositórios do usuário
        const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, { method: "GET", headers, cache: "no-store" });

        if (!response.ok) return getDefaultLanguages();

        const repositorios = await response.json();
        if (!Array.isArray(repositorios)) return getDefaultLanguages();

        // Filtra apenas os repositórios originais (não fork)
        const reposNaoFork = repositorios.filter(
            (r: GithubRepo) => !r.fork && r.languages_url
        );

        // Busca linguagens de todos os repositórios
        const settled = await Promise.allSettled(
            reposNaoFork.map((repo: GithubRepo) => fetch(repo.languages_url, { method: "GET", headers, cache: "no-store" }).then(async (res) => (res.ok ? res.json() : {})).catch(() => ({})))
        );

        // Soma total de bytes por linguagem
        const linguagemTotal: Record<string, number> = {};
        for (const result of settled) {
            if (result.status === "fulfilled" && typeof result.value === "object") {
                for (const [linguagem, bytes] of Object.entries(result.value)) {
                    linguagemTotal[linguagem] =
                        (linguagemTotal[linguagem] || 0) + (bytes as number);
                }
            }
        }

        const totalBytes = Object.values(linguagemTotal).reduce((a, b) => a + b, 0);
        if (totalBytes === 0) return getDefaultLanguages();

        // Calcula porcentagem
        const resultado: PortfolioData[] = Object.entries(linguagemTotal).map(([linguagem, bytes]) => ({ linguagem, porcentagem: parseFloat(((bytes / totalBytes) * 100).toFixed(2)) }));

        // Ordena do maior para o menor
        resultado.sort((a, b) => b.porcentagem - a.porcentagem);

        return resultado;
    } catch (err) {
        console.error("Erro ao buscar dados do GitHub:", err);
        return getDefaultLanguages();
    }
};

function getDefaultLanguages(): PortfolioData[] {
    return [{ linguagem: "Cobol", porcentagem: 0 }, { linguagem: "TypeScript", porcentagem: 0 }, { linguagem: "Python", porcentagem: 0 }, { linguagem: "Java", porcentagem: 0 }, { linguagem: "C#", porcentagem: 0 }];
};

async function getPortifolioOfUser(userId: string, token: string): Promise<Portfolio | null> {
    try {
        const response = await fetch(`http://localhost:3000/users/${userId}/portfolios`, {
            method: "GET",
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        if (!response.ok) return null;
        const data: Portfolio = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching portfolio data:", error);
        return null;
    }
}

export default async function Portifolio() {
    const session: Session | null = await getServerSession(authOptions);
    if (!session) redirect("/");
    const { user, accessToken } = session;
    const portifolio = await getPortifolioOfUser(user.id, accessToken);

    let linguagens: PortfolioData[] = [];
    try {
        linguagens = await getPortfolioData("tacianosilva");
    } catch (err) {
        console.error("Erro ao obter PortfolioData:", err);
        linguagens = [];
    }
    const playerData = linguagens.slice(0, 5);

    return (
        <main className={"w-full min-h-screen bg-(--bg-section-100) flex flex-col"}>
            {/* Capa */}
            <section className="relative w-full h-[300px] pb-16">
                {portifolio && portifolio.banner ? (<Banner imgSrc={portifolio.banner} />) : (<Banner />)}
            </section>

            {/* Corpo */}
            <section className="relative flex py-16">
                <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-2xl p-5 md:p-12 -mt-32">
                    <div className="w-full flex flex-row justify-around">
                        {/* Cabeçalho */}
                        <div className="flex flex-col items-center text-center">
                            <div className="mt-7 inline-block rounded-full shadow-lg" style={{ boxShadow: "0px 8px 11.14px rgba(0,0,0,0.46)" }}>
                                <div className="w-50 h-50 rounded-full overflow-hidden ring-6 ring-gray-100">
                                    <img src={user ? `http://localhost:3000${user.image}` : `http://localhost:3001/default/user.png`} alt="Profile" className="w-full h-full object-cover" />
                                </div>
                            </div>
                            <Link href={`/users/update`} className="flex items-center justify-center gap-4  mt-6 bg-(--brand-200) hover:bg-(--brand-300) text-white font-bold text-xs px-4 py-1 rounded-sm shadow transition-all duration-150">
                                Editar Foto <SquarePenIcon width={16} />
                            </Link>
                            <h2 className="mt-6 text-3xl font-semibold text-blueGray-700">{session.user.name}</h2>
                            <div className="mt-2 flex items-center gap-2 text-blueGray-400 uppercase text-sm font-semibold">
                                <MapPin size={16} />
                                Los Angeles, California
                            </div>
                            <div className="mt-4 flex flex-row lg:flex-col items-center gap-2 sm:gap-4 text-blueGray-600">
                                <span className="flex items-center gap-2">
                                    <Briefcase size={16} />
                                    Solution Manager - Creative Tim Officer
                                </span>
                                <span className="flex items-center gap-2">
                                    <GraduationCap size={16} />
                                    University of Computer Science
                                </span>
                            </div>
                        </div>

                        {/* Gráfico Radar */}
                        <div className="w-[300px]">
                            <SpiderChart data={playerData} color="#F1C478" />
                        </div>
                    </div>

                    {/* editar Portifolio */}
                    <div className="mt-4 flex flex-row lg:flex-col items-end gap-2 sm:gap-4 text-blueGray-600">
                        <Link href={`/portifolios/${portifolio?.portfolioId}/edit`} className="flex items-center justify-center gap-4  mt-6 bg-(--brand-200) hover:bg-(--brand-300) text-white font-bold text-xs px-4 py-1 rounded-sm shadow transition-all duration-150">
                            Editar Portifolio <SquarePenIcon width={16} />
                        </Link>
                    </div>

                    {/* Descrição */}
                    <div className="mt-10 border-t border-blueGray-200 pt-8 text-center">
                        <p className="text-blueGray-700 text-lg leading-relaxed mb-4">
                            Um programador com base python e typescript. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Impedit rem quibusdam odit quasi nihil suscipit esse libero quod temporibus incidunt id, consequuntur
                            praesentium earum beatae ratione asperiores mollitia hic ipsa?
                        </p>
                    </div>
                </div>
            </section>

            {/* Rodapé */}
            <footer className="bg-blueGray-200">
                <FooterProjects portfolio={portifolio} />
            </footer>
        </main>
    );
}
