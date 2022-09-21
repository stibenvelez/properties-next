import React from "react";
import Link from "next/link";

export interface LogoProps {
    img?: string;
    imgLight?: string;
    className?: string;
    href?: string;
}

const Logo: React.FC<LogoProps> = ({
    href = "/",
    img = "../../images/logos/logo.svg",
    imgLight = "../../images/logos/logo-white.svg",
    className = "",
}) => {
    return (
        <Link
            href={href}
            className={`ttnc-logo inline-block text-primary-6000 ${className}`}
        >
            <a>
                {/* <LogoSvgLight />
      <LogoSvg /> */}

                {/* THIS USE FOR MY CLIENT */}
                {/* PLEASE UN COMMENT BELLOW CODE AND USE IT */}
                {img ? (
                    <img
                        className={`block h-12 ${
                            imgLight ? "dark:hidden" : ""
                        }`}
                        src={img}
                        alt="Logo"
                    />
                ) : (
                    "Logo Here"
                )}
                {imgLight && (
                    <img
                        className="hidden h-12 dark:block"
                        src={imgLight}
                        alt="Logo-Light"
                    />
                )}
            </a>
        </Link>
    );
};

export default Logo;
