import { HCustom } from "@/components/Texts/HCustom";
import { FormRegisterJob } from "@/forms";

export default function NewPJob() {
  return (
    <div className="w-full min-h-screen bg-(--bg-section-100) flex flex-col items-center">
      <HCustom level={2} className="text-center py-3 mb-3">Criar novo Trabalho</HCustom>
      <div className="min-w-[90%] h-full p-4">
        <FormRegisterJob />
      </div>
    </div>
  );
}