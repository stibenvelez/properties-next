import React, { FC } from "react";
import { Fragment, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { AdjustmentsIcon, XIcon } from "@heroicons/react/outline";
import {
    ChevronDownIcon,
    FilterIcon,
    MinusSmIcon,
    PlusSmIcon,
    ViewGridIcon,
} from "@heroicons/react/solid";
import MoobileFilterDialog from "./MobileFilterDialog";
import RoomFilter from "./RoomFilter";
import PriceFilter from "./PriceFilter";
import InputCitySearch from "./InputCitySearch";
import PropertyCategory from "./Offer";
import BathroomFilter from "./BathroomFilter";
import PropertyType from "./PropertyType";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

interface FilteProperties {
    showFilters: boolean;
    setShowFilters: (boolean: boolean) => void;
}

const FilteProperties: FC<FilteProperties> = ({
    showFilters,
    setShowFilters,
}) => {
    const [mobileFiltersOpen, setMobileFiltersOpen]: any = useState(true);
    const handleCloseFilters = () => {
        setShowFilters(false);
    };

    return (
        <div className=" hidden overflow-hidden overflow-y-auto shadow dark:bg-slate-700 bg-indigo-50 w-80 rounded-r-xl lg:block ">
            <div className="">
                {/* <MoobileFilterDialog
                        mobileFiltersOpen={mobileFiltersOpen}
                        setMobileFiltersOpen={setMobileFiltersOpen}
                        subCategories={subCategories}
                        filters={filters}
                    /> */}
                <div className="flex items-center justify-between px-6 py-4 ">
                    <div className="flex items-center gap-2 ">
                        <AdjustmentsIcon className="h-6 text-indigo-600 dark:text-indigo-400" />
                        <h3 className="text-2xl font-bold text-gray-700 dark:text-white ">
                            Filtros
                        </h3>
                    </div>
                    <button
                        onClick={() => handleCloseFilters()}
                        className="text-gray-700 transition duration-200 ease-in-out rounded-full hover:bg-indigo-200 hover:text-indigo-800 focus:outline-none"
                    >
                        <XIcon className="right-0 h-6" />
                    </button>
                </div>
                <div className="px-4 pb-8 mx-auto max-w-7xl sm:px-4 lg:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-1 gap-x-8 gap-y-10">
                        <div className="hidden lg:block ">
                            <InputCitySearch />
                            <PropertyCategory />
                            <PropertyType />
                            <PriceFilter />
                            <RoomFilter />
                            <BathroomFilter />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilteProperties;
