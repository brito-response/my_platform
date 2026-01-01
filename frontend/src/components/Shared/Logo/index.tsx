import Link from 'next/link'
import { oleoScript } from '@/utils/fonts';

export const Logo = () => (
  <Link href="/" className="flex items-center cursor-pointer">
    <div className="bg-[#d17a00] rounded-full py-1 px-2">
      <span className={`${oleoScript.className} text-white italic text-lg`}>
        Rei dos
      </span>
    </div>
    <span className={`${oleoScript.className} ml-2 text-[#d17a00] text-lg`}>
      Freelas
    </span>
  </Link>
)
