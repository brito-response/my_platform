"use client";
import React, { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Bold, Italic, Underline, List, ListOrdered, Quote, Link as LinkIcon, Eye, Strikethrough, Image, Heading1, Heading2, AlignLeft, AlignCenter, AlignRight, Minus, Heading3, Heading4, Check, FileText, TagIcon, Tag } from "lucide-react";

interface RichTextEditorProps {
    name: string;
    label: string;
    placeholder?: string;
}

// 🔒 Remove tags potencialmente perigosas (script, iframe, etc)
const sanitizeHTML = (html: string): string => {
    const div = document.createElement("div");
    div.innerHTML = html;
    const scripts = div.querySelectorAll("script, iframe, object, embed");
    scripts.forEach((el) => el.remove());
    return div.innerHTML;
};

// Função auxiliar pra envolver seleção com tag
const wrapSelectionWithTag = (text: string, tagStart: string, tagEnd: string) => {
    const selection = window.getSelection();
    const selectedText = selection?.toString() || "";
    if (!selectedText) return text;

    const start = text.indexOf(selectedText);
    if (start === -1) return text;

    const before = text.substring(0, start);
    const after = text.substring(start + selectedText.length);
    return `${before}${tagStart}${selectedText}${tagEnd}${after}`;
};

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ name, label, placeholder }) => {
    const { control } = useFormContext();
    const [showPreview, setShowPreview] = useState(false);

    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-(--text-label)">{label}</label>
            <Controller control={control} name={name}
                render={({ field: { value, onChange } }) => (
                    <div className="border border-gray-300 rounded-md shadow-sm overflow-hidden">
                        {/* 🔹 Toolbar */}
                        <div className="flex flex-wrap items-center justify-between border-b border-gray-200 bg-gray-50 px-2 py-1">
                            <div className="flex flex-wrap items-center gap-1">
                                <ToolbarButton icon={<Tag size={16} />} title="Descrição destacada" onClick={() => {
                                    const descricaoTemplate = `<div class="descricao-bloco border-l-4 border-green-500 bg-blue-50 p-4 rounded-md my-3"><div class="flex items-center gap-2 mb-2 text-green-700 font-semibold"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"> <path stroke-linecap="round" stroke-linejoin="round" d="M12 20h9" /> <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /><span>Descrição:</span></div><p class="text-gray-700 leading-relaxed">Escreva aqui uma descrição detalhada...</p></div>`;
                                    onChange(`${value || ""}${descricaoTemplate}`);
                                }}/>
                                {/* Texto básico */}
                                <ToolbarButton icon={<Bold size={16} />} title="Negrito" onClick={() => onChange(wrapSelectionWithTag(value || "", "<b>", "</b>"))} />
                                <ToolbarButton icon={<Italic size={16} />} title="Itálico" onClick={() => onChange(wrapSelectionWithTag(value || "", "<i>", "</i>"))} />
                                <ToolbarButton icon={<Underline size={16} />} title="Sublinhado" onClick={() => onChange(wrapSelectionWithTag(value || "", "<u>", "</u>"))} />
                                <ToolbarButton icon={<Strikethrough size={16} />} title="Riscado" onClick={() => onChange(wrapSelectionWithTag(value || "", "<s>", "</s>"))} />

                                {/* Estrutura */}
                                <ToolbarButton icon={<Heading1 size={16} />} title="Título H1" onClick={() => onChange(wrapSelectionWithTag(value || "", "<h1 class='text-6xl'>", "</h1></br>"))} />
                                <ToolbarButton icon={<Heading2 size={16} />} title="Título H2" onClick={() => onChange(wrapSelectionWithTag(value || "", "<h2 class='text-5xl'>", "</h2></br>"))} />
                                <ToolbarButton icon={<Heading3 size={16} />} title="Título H3" onClick={() => onChange(wrapSelectionWithTag(value || "", "<h3 class='text-4xl'>", "</h3></br>"))} />
                                <ToolbarButton icon={<Heading4 size={16} />} title="Título H4" onClick={() => onChange(wrapSelectionWithTag(value || "", "<h4 class='text-3xl'>", "</h4></br>"))} />
                                <ToolbarButton icon={<Quote size={16} />} title="Citação" onClick={() => onChange(wrapSelectionWithTag(value || "", "<blockquote>", "</blockquote></br>"))} />
                                <ToolbarButton icon={<Minus size={16} />} title="Linha Horizontal" onClick={() => onChange(`${value || ""}</br><hr /></br>`)} />

                                {/* Listas */}
                                <ToolbarButton icon={<List size={16} />} title="Lista não ordenada" onClick={() => onChange(`${value || ""}<ul><li></li></ul>`)} />
                                <ToolbarButton icon={<ListOrdered size={16} />} title="Lista ordenada" onClick={() => onChange(`${value || ""}<ol><li></li></ol>`)} />
                                <ToolbarButton icon={<Check size={16} />} title="Tarefas" onClick={() => { const todoTemplate = `<ul class="task-list">\n<li class="accent-green-600"><input type="checkbox" /> item 1 </li>\n</ul>`; onChange(`${value || ""}${todoTemplate}`); }} />

                                {/* Alinhamento */}
                                <ToolbarButton icon={<AlignLeft size={16} />} title="Alinhar à esquerda" onClick={() => onChange(wrapSelectionWithTag(value || "", `<div style='text-align:left'>`, "</div>"))} />
                                <ToolbarButton icon={<AlignCenter size={16} />} title="Centralizar" onClick={() => onChange(wrapSelectionWithTag(value || "", `<div style='text-align:center'>`, "</div>"))} />
                                <ToolbarButton icon={<AlignRight size={16} />} title="Alinhar à direita" onClick={() => onChange(wrapSelectionWithTag(value || "", `<div style='text-align:right'>`, "</div>"))} />

                                {/* Link e imagem */}
                                <ToolbarButton icon={<LinkIcon size={16} />} title="Inserir link" onClick={() => {
                                    const url = prompt("Digite o link:");
                                    if (url) onChange(wrapSelectionWithTag(value || "", `<a href="${url}" target="_blank">`, "</a>"));
                                }}
                                />
                                <ToolbarButton icon={<Image size={16} />} title="Inserir imagem" onClick={() => {
                                    const url = prompt("URL da imagem:");
                                    if (url) onChange(`${value || ""}<img src="${url}" alt="" />`);
                                }}
                                />
                            </div>

                            {/* Preview toggle */}
                            <button type="button" onClick={() => setShowPreview((prev) => !prev)} className="p-2 rounded-md hover:bg-gray-200 text-gray-700 flex items-center gap-1"
                            >
                                <Eye size={16} /> {showPreview ? "Editar" : "Preview"}
                            </button>
                        </div>

                        {/* 🔹 Área de texto / Preview */}
                        {!showPreview ? (
                            <textarea value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
                                className="w-full min-h-[180px] p-3 font-mono text-sm text-gray-800 focus:outline-none focus:ring-0 resize-none"
                            />
                        ) : (
                            <div className="p-3 prose prose-sm max-w-none bg-white min-h-[180px]" dangerouslySetInnerHTML={{ __html: sanitizeHTML(value || "<p><br></p>") }} />
                        )}
                    </div>
                )}
            />
        </div>
    );
};

//Botão da toolbar com estilo consistente
const ToolbarButton = ({ icon, title, onClick }: { icon: React.ReactNode; title: string; onClick: () => void; }) => (<button type="button" title={title} onMouseDown={(e) => { e.preventDefault(); onClick(); }} className="p-2 rounded-md hover:bg-gray-200 active:bg-gray-300 transition-colors text-gray-700">
    {icon}
</button>
);
