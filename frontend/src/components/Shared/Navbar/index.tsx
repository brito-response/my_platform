"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavBarProps = {
  isMobile?: boolean;
  onLinkClick?: () => void;
};

export const NavBar: React.FC<NavBarProps> = ({ isMobile, onLinkClick }) => {
  const pathname = usePathname();

  const items = [{ label: "About", href: "/about" }];

  return (
    <ul className={`flex items-center justify-around ${isMobile ? "flex-col space-y-3" : "space-x-4"}`}>
      {items.map((item) => {
        const isActive = pathname === item.href;
        return (
          <li key={item.href}>
            <Link href={item.href} onClick={() => onLinkClick?.()} className={`text-gray-800 font-medium text-base px-3 py-2 rounded-md transition-colors duration-200 hover:bg-gray-200 hover:text-black focus:outline-none ${isActive ? "bg-gray-400 text-white" : ""}`}>
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
