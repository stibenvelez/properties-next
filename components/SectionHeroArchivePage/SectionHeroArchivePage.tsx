import React, { FC, ReactNode } from "react";
import HeroSearchForm, {
  SearchTab,
} from "../../components/HeroSearchForm/";

export interface SectionHeroArchivePageProps {
    className?: string;
    listingType?: ReactNode;
    currentPage: "Venta" | "Arriendo";
    currentTab: SearchTab;
    rightImage?: string;
}

const SectionHeroArchivePage: FC<SectionHeroArchivePageProps> = ({
    className = "",
    listingType,
    currentPage,
    currentTab,
    rightImage = "/images/hero-right2.png",
}) => {
    return (
        <div
            className={`nc-SectionHeroArchivePage flex flex-col relative ${className}`}
            data-nc-id="SectionHeroArchivePage"
        >
            <div className="flex flex-col lg:flex-row lg:items-center">
                <div className="flex flex-col items-start flex-shrink-0 space-y-6 lg:w-1/2 lg:space-y-10 pb-14 lg:pb-64 xl:pb-80 xl:pr-14 lg:mr-10 xl:mr-0">
                    <h2 className="font-medium text-4xl md:text-5xl xl:text-7xl leading-[110%]">
                        Tokyo, Jappan
                    </h2>
                    <div className="flex items-center text-base md:text-lg text-neutral-500 dark:text-neutral-400">
                        <i className="text-2xl las la-map-marked"></i>
                        <span className="ml-2.5">Jappan </span>
                        <span className="mx-5"></span>
                        {listingType ? (
                            listingType
                        ) : (
                            <>
                                <i className="text-2xl las la-home"></i>
                                <span className="ml-2.5">112 properties</span>
                            </>
                        )}
                    </div>
                </div>
                <div className="flex-grow">
                    <img className="w-full" src={rightImage} alt="hero" />
                </div>
            </div>

            <div className="flow-root w-full">
                <div className="z-10 w-full lg:-mt-40 xl:-mt-56">
                    <HeroSearchForm
                        currentPage={currentPage}
                        currentTab={currentTab}
                    />
                </div>
            </div>
        </div>
    );
};

export default SectionHeroArchivePage;
