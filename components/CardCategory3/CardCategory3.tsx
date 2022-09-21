import React, { FC, useState } from "react";
import NcImage from "shared/NcImage/NcImage";
import { TaxonomyType } from "data/types";


export interface CardCategory3Props {
    className?: string;
    taxonomy: TaxonomyType;
    setIsOpen: (isOpen: boolean) => void;
    setCitySelected: any;
}

const CardCategory3: FC<CardCategory3Props> = ({
    className = "",
    taxonomy,
    setIsOpen,
    setCitySelected,
}) => {
    const {
        count,
        name,
        href = "/",
        thumbnail,
        countSell,
        countRent,
    } = taxonomy;

    const handleClick = () => {
        setIsOpen(true);
        setCitySelected({
            name: "city",
            value: name,
        });
    };

    return (
        <div
            onClick={handleClick}
            className={`nc-CardCategory3 flex flex-col ${className} cursor-pointer`}
            data-nc-id="CardCategory3"
        >
            <div
                className={`flex-shrink-0 relative w-full aspect-w-5 aspect-h-4 sm:aspect-h-7 h-0 rounded-2xl overflow-hidden group`}
            >
                <NcImage
                    src={thumbnail}
                    className="object-cover w-full h-full rounded-2xl"
                />
                <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity"></span>
            </div>
            <div className="mt-4 truncate">
                <h2
                    className={`text-base sm:text-lg text-neutral-900 dark:text-neutral-100 font-medium truncate`}
                >
                    {name}
                </h2>
                <span
                    className={`block mt-2 text-sm text-neutral-6000 dark:text-neutral-400`}
                >
                    <p>{countSell? countSell + " En venta": null}</p>
                    <p>{countRent? countRent + " En arriendo": null}</p>
                </span>
            </div>
        </div>
    );
};

export default CardCategory3;
