import { FC } from "react";
import TabFilters from "../../components/TabFilters";
import Heading2 from "../../components/Heading/Heading2";
import PropertyList from "../../components/PropertiesList";

import Pagination from "../../shared/Pagination/Pagination";
import { Transition } from "@headlessui/react";

export interface SectionGridFilterCardProps {
    className?: string;
    setFilters?: any;
    filters?: any;
    categoryProperty?: string;
    setShowFilters?: any;
    showFilters?: boolean;
}

const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
    className = "",
    categoryProperty,
    setShowFilters,
    showFilters,
}) => {
    const handleShowFilters = () => {
        setShowFilters(!showFilters);
    };

    return (
        <div
            className={`nc-SectionGridFilterCard  ${className}`}
            data-nc-id="SectionGridFilterCard"
        >
            <div className="flex items-center justify-start gap-4 mb-4 lg:mb-8">
                <Transition show={!showFilters}>
                    <Transition.Child
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <button
                            onClick={handleShowFilters}
                            className="px-4 py-2 text-white rounded-md bg-primary-600 hover:bg-primary-500"
                        >
                            Filtros
                        </button>
                    </Transition.Child>
                </Transition>
                {/* <input type="search" className="px-4 py-2 border border-gray-200 rounded-md bg-gray-50 focus:outline-2 focus:outline-indigo-600" placeholder="" /> */}
                {/* <TabFilters /> */}
            </div>
        </div>
    );
};

export default SectionGridFilterCard;
