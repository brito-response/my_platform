type StatProps = {
    label: string,
    value: number,
    color?: "gray" | "green" | "red" | "blue",
}
export const Stat: React.FC<StatProps> = ({ label, value, color = "gray" }) => {
    const colors: Record<string, string> = { gray: "text-gray-700", green: "text-green-600", red: "text-red-600", blue: "text-blue-600" };

    return (
        <div className="rounded-lg bg-gray-50 p-3">
            <p className="text-xs text-gray-500">{label}</p>
            <p className={`text-lg font-bold ${colors[color]}`}>{value}</p>
        </div>
    );
};