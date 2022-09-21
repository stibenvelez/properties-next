import { FC } from "react";
import { PropertyDataType } from "../../data/types";
import Link from "next/link";


export interface StayCardProps {
    className?: string;
    property?: PropertyDataType;
    size?: "default" | "small";
}

const PropertyCardSkeleton: FC<StayCardProps> = ({
    size = "default",
    className = "",
}) => {
    const renderContent = () => {
        return (
            <div
                className={
                    size === "default" ? "p-4 space-y-4" : "p-3 space-y-2"
                }
            >
                <div className="space-y-2">
                    <div className="flex gap-3"></div>
                    <div className="flex items-center space-x-2">
                        <div className="block w-full h-4 bg-gray-200"></div>
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-neutral-500 dark:text-neutral-400">
                        <div className="block w-full h-2 bg-gray-200"></div>
                    </div>
                </div>
                <div className="border-b w-14 border-neutral-100 dark:border-neutral-800"></div>
                <div className="flex items-center justify-between"> 
                    <div className="block w-full h-2 font-semibold bg-gray-200"></div>
                </div>
            </div>
        );
    };

    return (
        <div
            className={`nc-StayCard group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden will-change-transform  transition-shadow animate-pulse ${className}`}
            data-nc-id="StayCard "
        >
           
                <a>
                    <div className="relative w-full bg-gray-100 h-52"></div>
                    {renderContent()}
                </a>
          
        </div>
    );
};

export default PropertyCardSkeleton;
