import { FC } from "react";
import GallerySlider from "../../components/GallerySlider";
import { PropertyDataType } from "../../data/types";
import BtnLikeIcon from "../../components/BtnLikeIcon";
import SaleOffBadge from "../../components/SaleOffBadge";
import Badge from "../../shared/Badge";
import formatMoney from "../../helpers/formatMoney";
import Link from "next/link";
import { OfficeBuildingIcon } from "@heroicons/react/outline";

export interface StayCardProps {
    className?: string;
    property?: any;
    size?: "default" | "small";
}


const PropertyCard: FC<StayCardProps> = ({
    size = "default",
    className = "",
    property,
}) => {
    const {
        address,
        title,
        bedrooms,
        saleOff,
        isAds,
        price,
        idProperty,
        area,
        bathrooms,
        reference,
        neighborhood,
        propertyType,
        offer,
        galleryImages,
    }: any = property;

    const renderSliderGallery = () => {
        const like = !!localStorage.getItem(idProperty);
        return (
            <div className="relative w-full">
                <GallerySlider
                    uniqueID={`Property_${idProperty}`}
                    ratioClass="aspect-w-4 aspect-h-3 "
                    galleryImgs={galleryImages}
                    id={idProperty}
                />
                <BtnLikeIcon
                    isLiked={like}
                    className="absolute right-3 top-3 z-[1]"
                    idProperty={idProperty}
                />
                {saleOff ? (
                    <SaleOffBadge className="absolute left-3 top-3" />
                ) : null}
            </div>
        );
    };

    const renderContent = () => {
        return (
            <div
                className={
                    size === "default" ? "p-4 space-y-4" : "p-3 space-y-2"
                }
            >
                <div className="space-y-2">
                    <div className="flex gap-3">
                        {area && (
                            <span className="text-sm text-neutral-500 dark:text-neutral-400">
                                {area}m²
                            </span>
                        )}
                        {bedrooms && (
                            <span className="text-sm text-neutral-500 dark:text-neutral-400">
                                {bedrooms} hab
                            </span>
                        )}
                        {bathrooms && (
                            <span className="text-sm text-neutral-500 dark:text-neutral-400">
                                {bathrooms} {bathrooms > 1 ? "baños" : "baño"}
                            </span>
                        )}
                    </div>
                    <div className="items-center space-x-2  whitespace-normal ">
                        {isAds && <Badge name="ADS" color="green" />}
                        <h2
                            className={` font-medium capitalize truncate     ${
                                size === "default" ? "text-lg" : "text-base"
                            }`}
                        >
                            {title}
                        </h2>
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-neutral-500 dark:text-neutral-400">
                        {size === "default" && (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                        )}
                        <span className="">
                            {address} {neighborhood}
                        </span>
                    </div>
                </div>
                <div className="border-b w-14 border-neutral-100 dark:border-neutral-800"></div>
                <div className="flex flex-col justify-between">
                    <span className="text-lg font-semibold">
                        {formatMoney.format(price)}
                    </span>
                    <span className="text-sm text-gray-300">{reference}</span>
                    <div className="flex gap-2 items-center pt-1">
                        <OfficeBuildingIcon className="h-3 " />
                        <span className="text-sm text-gray-400">
                            {propertyType.propertyType} en {offer.offer}
                        </span>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div
            className={`nc-StayCard group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden will-change-transform hover:shadow-xl transition-shadow ${className}`}
            data-nc-id="StayCard"
        >
            <div>
                {renderSliderGallery()}
                <Link href={`/property/${idProperty}`}>
                    <a>{renderContent()}</a>
                </Link>
            </div>
        </div>
    );
};

export default PropertyCard;
