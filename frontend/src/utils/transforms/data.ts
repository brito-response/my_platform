export function toISODate(dateInput: Date | string): string {
  if (!dateInput) throw new Error("Data inválida");

  let date: Date;

  // Se já for Date, usamos direto
  if (dateInput instanceof Date) {
    date = dateInput;
  } 
  // Se for string, convertemos
  else if (typeof dateInput === "string") {
    const trimmed = dateInput.trim();
    if (!trimmed) throw new Error("Data inválida");

    if (trimmed.includes("/")) {
      // Formato brasileiro DD/MM/YYYY
      const [day, month, year] = trimmed.split("/").map(Number);
      date = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
    } else if (trimmed.includes("-")) {
      // Formato ISO simples YYYY-MM-DD
      const [year, month, day] = trimmed.split("-").map(Number);
      date = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
    } else {
      throw new Error("Formato de data não reconhecido");
    }
  } else {
    throw new Error("Tipo de data inválido");
  }

  if (isNaN(date.getTime())) throw new Error("Data inválida");

  // Retorna string ISO completa com hora em UTC
  return date.toISOString(); // "2025-10-30T00:00:00.000Z"
}
