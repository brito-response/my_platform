import { CompanyCarousel } from "@/components/CompanyCarousel";
import { RankingTable } from "@/components/RankingTable";
import { Paragraph } from "@/components/Sections";
import ComoFuncionaSection from "@/components/Sections/ComoFuncionaSection";
import { ButtonNormal } from "@/components/Shared/Buttons/ButtonNormal";
import { EntityLabel } from "@/components/Shared/EntityLabel";
import Image from "next/image";

export default function Home() {

  const users = [
    { id: "1", name: "Ana Souza", role: "Designer", avatarUrl: "", score: 1250 },
    { id: "2", name: "João Lima", role: "Dev Fullstack", avatarUrl: "", score: 980 },
    { id: "3", name: "Maria Alves", role: "PM", avatarUrl: "", score: 870 },
  ];

  const bebeficios = [
    "+ Possibilidade com mais de 1.000 freelancers qualificados.",
    "+ Segurança com pagamento protegido e suporte 24/7.",
    "+ Participação e coperação de freelancers no mesmo projeto.",
    "+ Facilidade com plataforma intuitiva e ferramentas de gestão com integração direto do github.",
  ];

  return (
    <div className="w-full overflow-x-hidden">

      {/* Seção principal */}
      <section className="max-w-full flex flex-col md:flex-row items-center justify-evenly bg-(--bg-section-100) px-4 sm:px-8 md:px-12 py-12 gap-6 md:gap-12 overflow-hidden">
        <div className="flex-1 flex flex-col justify-center text-center md:text-left">
          <h1 className="text-left text-3xl text-(--textcolor) md:text-5xl font-bold mb-4 wrap-break-word">
            Não importa a complexidade ou o tamanho, nós temos o freelancer ideal para o seu <EntityLabel name={"Projeto."} sideText={"text-4xl"} />
          </h1>
          {bebeficios.map((beneficio, index) => (
            <Paragraph key={index}>
              {beneficio}
            </Paragraph>
          ))}
          <div className="w-full h-4 my-4">
            <ButtonNormal textLabel={"Crie Agora"} link="cadastro" />
          </div>
        </div>

        <div className="flex-1 flex lg:p-20 justify-end">
          <Image src="/images/bg.png" width={500} height={250} alt="background" className="w-full h-auto max-w-[250px] md:max-w-[500px]" />
        </div>
      </section>

      {/* Seção top score */}
      <section className="max-w-full flex flex-col items-center justify-evenly bg-(--bg-section-200) px-4 sm:px-8 md:px-12 py-12 gap-6 md:gap-12 overflow-hidden">
        <h2 className="w-full text-3xl md:text-4xl text-center mb-4 font-bold text-gray-900 wrap-break-word">
          Top freelacers - {new Date().toLocaleString("pt-BR", { month: "long" }) + " de " + new Date().getFullYear()}
        </h2>
        <RankingTable users={users} />
      </section>

      {/* Como funciona */}
      <section className="flex flex-col md:flex-row items-center justify-evenly w-full bg-(--bg-section-100) px-4 sm:px-8 md:px-12 py-12 gap-6 md:gap-12 overflow-hidden">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center wrap-break-word">Como funciona?</h2>
          <ComoFuncionaSection />
        </div>
      </section>

      {/* Companies */}
      <section className="w-full flex flex-col items-center justify-center bg-(--bg-section-100) pt-4 overflow-hidden">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center wrap-break-word">Empresas que utilizam</h2>
        <CompanyCarousel />
      </section>

    </div>
  );
}
