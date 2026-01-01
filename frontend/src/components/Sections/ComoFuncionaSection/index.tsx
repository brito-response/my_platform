"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, UserCheck, CheckCircle2, MessageSquare, Star, CrownIcon } from "lucide-react";

const steps = [
  {
    icon: Briefcase,
    title: "Publique seu projeto",
    description: "Descreva suas necessidades e expectativas em detalhes.",
  },
  {
    icon: UserCheck,
    title: "Receba propostas",
    description: "Freelancers qualificados entram em contato para colaborar.",
  },
  {
    icon: CheckCircle2,
    title: "Escolha o profissional ideal",
    description: "Analise portfólios, avaliações e selecione quem melhor atende ao seu projeto.",
  },
  {
    icon: MessageSquare,
    title: "Gerencie e acompanhe",
    description: "Use ferramentas integradas e comunique-se facilmente durante o projeto.",
  },
  {
    icon: Star,
    title: "Finalize e avalie",
    description: "Conclua o projeto, faça o pagamento seguro e deixe sua avaliação.",
  },
];

export default function ComoFuncionaSection() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
  };

  return (
   

      <div className="relative flex flex-col items-start w-full max-w-3xl">
        <p className="mt-6 text-gray-500 text-sm mb-5">
          Clique no passo atual para avançar.
        </p>
        <div className="flex flex-col space-y-10 relative z-10">
          {steps.map((step, index) => (
            <motion.div key={index} initial={{ opacity: 0, x: -50 }} animate={{ opacity: index <= currentStep ? 1 : 0.3, x: 0 }} transition={{ duration: 0.5 }}
              className={`flex items-center md:gap-6 cursor-pointer ${index === currentStep ? "scale-105" : ""}`} onClick={() => index === currentStep && handleNext()}>
              {/* Ícone estilo commit */}
              <div className="relative shrink-0">
                <div className={`w-10 h-10 flex items-center justify-center rounded-full text-white shadow-lg border-2 border-white
                    ${index <= currentStep ? "bg-linear-to-br from-(--brand-400) to-[(var(--brand-100))]" : "bg-gray-300"}`}
                >
                  <step.icon size={20} />
                </div>

                {/* Linha para próximo */}
                {index < steps.length - 1 && (
                  <div className={`absolute left-[19px] top-10 h-10 w-[2px] ${index < currentStep ? "bg-(--brand-400)" : "bg-gray-300"}`} />
                )}
              </div>

              {/* Texto */}
              <div className="mt-2 md:mt-0">
                <h3 className={`text-lg font-semibold ${index <= currentStep ? "text-gray-900" : "text-gray-400"}`}>
                  {step.title}
                </h3>
                <p className={`text-sm md:text-base leading-relaxed max-w-md ${index <= currentStep ? "text-gray-600" : "text-gray-300"}`}>
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mensagem final */}
        {currentStep === steps.length && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="mt-8 text-center text-(--brand-300) font-semibold text-lg" >
            <CrownIcon /> Projeto completo!
          </motion.div>
        )}
      </div>

  );
}
