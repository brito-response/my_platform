type EntityLabelProps = {
    name: string;
    color?: string; // cor principal (borda + texto)
    sideText: string; // texto lateral menor
};

export const EntityLabel: React.FC<EntityLabelProps> = ({ name, color = "#DD8C00", sideText }) => {
    return (
        <div className="relative inline-flex items-center justify-center px-4 py-1 font-bold text-base rounded-md" style={{ color, border: `2px solid ${color}` }}>
            {/* bolinhas nos cantos */}
            <span className="absolute w-3 h-3 rounded-full" style={{ backgroundColor: color, top: "-5px", left: "-5px" }} />
            <span className="absolute w-3 h-3 rounded-full" style={{ backgroundColor: color, top: "-5px", right: "-5px" }} />
            <span className="absolute w-3 h-3 rounded-full" style={{ backgroundColor: color, bottom: "-5px", left: "-5px" }} />
            <span className="absolute w-3 h-3 rounded-full" style={{ backgroundColor: color, bottom: "-5px", right: "-5px" }} />
            {/* texto */}
            <span className={sideText}>{name}</span>
        </div>
    );
};
