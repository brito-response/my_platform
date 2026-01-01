'use client';

import Image from "next/image";
import { Loader } from "../Shared/Loader";
import { useEffect, useState } from "react";

type BannerProps = {
    imgSrc?: string;
} & React.ComponentProps<'div'>;

export const Banner: React.FC<BannerProps> = ({ imgSrc = "/banner/default.svg", ...props }) => {
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => { setLoading(false); }, 1000);
        return () => clearTimeout(timer);
    }, [isLoading]);

    return (
        <div className="w-full h-full"{...props}>
            {isLoading ? (<Loader />) : (<Image src={imgSrc} alt="Banner default" fill className="object-cover" />)}
        </div>
    );
};