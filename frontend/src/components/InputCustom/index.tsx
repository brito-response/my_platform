"use client";
import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';

interface InputProps {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  ishidden?: boolean;
  pattern?: RegExp;
  placeholder?: string;
  asDate?: boolean;
}

export const InputCustom: React.FC<InputProps> = ({ name, label, type = 'text', required, pattern, placeholder, asDate, ishidden }) => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <div className="flex flex-col gap-2">
      {!ishidden && (
        <label htmlFor={name} className="text-sm font-medium text-(--text-label)">
          {label}:
        </label>
      )}
      <Controller control={control} name={name} rules={{
        required: !ishidden && required ? "Campo obrigatório" : false,
        pattern: pattern ? { value: pattern, message: "Formato inválido" } : undefined,
      }}
        render={({ field }) => {

          const value = asDate && typeof field.value === "string" ? field.value.split("T")[0] : field.value ?? "";

          return (
            <input {...field} id={name} type={type} placeholder={ishidden ? "" : placeholder} hidden={ishidden} aria-hidden={ishidden} value={value}
              onChange={(e) => {
                if (asDate) {
                  const [year, month, day] = e.target.value.split('-');
                  const isoDate = new Date(Number(year), Number(month) - 1, Number(day)).toISOString();
                  field.onChange(isoDate);
                } else {
                  field.onChange(e);
                }
              }}
              className={`w-full p-2 px-3 mt-1 border rounded-full shadow-sm outline-none transition-all focus:border-blue-300 focus:ring-1 focus:ring-blue-300 ${errors[name] ? "border-red-400" : "border-gray-300"}`}
            />
          );
        }}
      />
      {errors[name]?.message && (
        <p className="text-sm text-red-500">{errors[name]?.message as string}</p>
      )}
    </div>
  );
};
