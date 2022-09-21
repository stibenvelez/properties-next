import React from "react";
import { ReactNode } from "react";
import { useSelector } from "react-redux";

export interface Heading2Props {
    heading?: ReactNode;
    subHeading?: ReactNode;
    className?: string;
    properties?: any;
}

const Heading2: React.FC<Heading2Props> = ({
    className = "",
    heading,
    subHeading,
}) => {
    const {properties} = useSelector(
        ({ properties }: any) => properties
    );
    return (
        <div className={`mb-2 lg:mb-4 ${className}`}>
            <h2 className="text-4xl font-semibold">{heading}</h2>
            {subHeading ? (
                subHeading
            ) : (
                <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
                    {properties.length || 0} propiedades
                </span>
            )}
        </div>
    );
};

export default Heading2;
