import { FC, useEffect, useState } from "react";
import LocationMarker from "components/AnyReactComponent/LocationMarker";
import GoogleMapReact from "google-map-react";
import Avatar from "shared/Avatar/Avatar";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import NcImage from "shared/NcImage/NcImage";
import ModalPhotos from "./ModalPhotos";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import { useParams } from "react-router-dom";
import clientAxios from "config/axios";
import formatMoney from "utils/formatMoney";
import {
    AtSymbolIcon,
    DeviceMobileIcon,
    PhoneIcon,
} from "@heroicons/react/solid";
import ModalContactMe from "./ModalContactMe";
import { useDispatch, useSelector} from "react-redux";
import {
    getCommentsByPropertyAction,
} from "store/slice/comments/comments.actions";
import CommentsSection from "./CommentsSection";
import { getPropertyByIdAction } from "store/slice/properties/propertiesActions";
import SpinnerButton from "components/SpinnerButton/SpinnerButton";

export interface ListingStayDetailPageProps {
    className?: string;
    isPreviewMode?: boolean;
}

const PropertyDetailPage: FC<ListingStayDetailPageProps> = ({
    className = "",
    isPreviewMode,
}) => {
    const dispatch: any = useDispatch();
    const { id }: any = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const [openFocusIndex, setOpenFocusIndex] = useState(0);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [newComment, setNewComment] = useState({
        name: "",
        comment: "",
        score: 5,
        propertyId: id,
    });

    useEffect(() => {
        (() => dispatch(getPropertyByIdAction(id)))();
    }, []);

    useEffect(() => {
        (() => dispatch(getCommentsByPropertyAction(id)))();
    }, []);
    

    const handleOpenModal = (index: number) => {
        setIsOpen(true);
        setOpenFocusIndex(index);
    };

    const {property, loading} = useSelector(({properties}: any) => properties);

    const handleCloseModal = () => setIsOpen(false);


    if (loading) {
        return (
            <div className="min-h-[300px]  flex flex-col items-center justify-center">
                <SpinnerButton className={"h-8 w-8"} />
            </div>
        );
    };

    if (Object.keys(property).length == 0) {
        return (
            <div className="min-h-[300px]  flex flex-col items-center justify-center">
                <h1 className="text-2xl text-center font-bold">
                    No se encontró este inmueble
                </h1>
                <p>Comprueba que este disponible</p>
            </div>
        );
    };

    const renderSection1 = () => {
        return (
            <div className="listingSection__wrap !space-y-6">
                <h2 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">
                    {property.title}
                </h2>
                <div className="flex items-center space-x-4">
                    <span>·</span>
                    <span>
                        <i className="las la-map-marker-alt"></i>
                        <span className="ml-1">{property.city}</span>
                    </span>
                    <span>·</span>
                    <span>
                        <i className="las la-home"></i>
                        <span className="ml-1">{property.reference}</span>
                    </span>
                </div>

                {/* 4 */}
                <div className="flex items-center">
                    <Avatar
                        hasChecked
                        sizeClass="h-10 w-10"
                        radius="rounded-full"
                    />
                    <span className="ml-2.5 text-neutral-500 dark:text-neutral-400">
                        Contacto{" "}
                        <span className="font-medium text-neutral-900 dark:text-neutral-200">
                            {property.contactName}
                        </span>
                    </span>
                </div>

                {/* 5 */}
                <div className="w-full border-b border-neutral-100 dark:border-neutral-700" />

                {/* 6 */}
                <div className="flex items-center justify-between space-x-8 text-sm xl:justify-start xl:space-x-12 text-neutral-700 dark:text-neutral-300">
                    <div className="flex items-center space-x-3 ">
                        <i className="text-2xl las la-ruler-horizontal"></i>
                        <span className="">
                            {property.area}{" "}
                            <span className="hidden sm:inline-block">m2</span>
                        </span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <i className="text-2xl las la-bath"></i>
                        <span className="">
                            {property.bathrooms}{" "}
                            <span className="hidden sm:inline-block">
                                baños
                            </span>
                        </span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <i className="text-2xl las la-house"></i>
                        <span className="">
                            {property.stratum}{" "}
                            <span className="hidden sm:inline-block">
                                estrato
                            </span>
                        </span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <i className="text-2xl las la-door-open"></i>
                        <span className="">
                            {property.bedrooms}{" "}
                            <span className="hidden sm:inline-block">hab</span>
                        </span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <i className="text-2xl las la-parking"></i>
                        <span className="">
                            <span className="hidden sm:inline-block">
                                Parqueadero
                            </span>{" "}
                            {property.parking ? "si" : "no"}
                        </span>
                    </div>
                </div>
            </div>
        );
    };

    const renderSection2 = () => {
        return (
            <div className="listingSection__wrap">
                <h2 className="text-2xl font-semibold">Descripción</h2>
                <div className="border-b w-14 border-neutral-200 dark:border-neutral-700"></div>
                <div className="text-neutral-6000 dark:text-neutral-300">
                    <span>{property.description}</span>
                </div>
            </div>
        );
    };

    const renderSection5 = () => {
        return (
            <div className="listingSection__wrap">
                {/* HEADING */}
                <h2 className="text-2xl font-semibold">Contacto</h2>
                <div className="border-b w-14 border-neutral-200 dark:border-neutral-700"></div>

                {/* host */}
                <div className="flex items-center space-x-4">
                    <Avatar
                        hasChecked
                        hasCheckedClass="w-4 h-4 -top-0.5 right-0.5"
                        sizeClass="h-14 w-14"
                        radius="rounded-full"
                    />
                    <div>
                        <a className="block text-xl font-medium" href="##">
                            {property.contactName}
                        </a>
                    </div>
                </div>
                <div className="flex items-center space-x-4 flex-wrap gap-y-2">
                    {/* info */}
                    {property.contactCellphone && (
                        <div className="text-neutral-500 dark:text-neutral-400 space-y-2.5">
                            <div className="flex items-center space-x-2">
                                <DeviceMobileIcon className="w-6 h-6" />
                                <span>{property.contactCellphone}</span>
                            </div>
                        </div>
                    )}
                    {/* email */}
                    {property.contactEmail && (
                        <div className="text-neutral-500 dark:text-neutral-400 space-y-2.5">
                            <div className="flex items-center space-x-2">
                                <AtSymbolIcon className="w-6 h-6" />
                                <span>{property.contactEmail}</span>
                            </div>
                        </div>
                    )}
                    {/* email */}
                    {property.contactPhone && (
                        <div className="text-neutral-500 dark:text-neutral-400 space-y-2.5">
                            <div className="flex items-center space-x-2">
                                <PhoneIcon className="w-6 h-6" />
                                <span>{property.contactPhone}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const renderSection7 = () => {
        return (
            <div className="listingSection__wrap">
                {/* HEADING */}
                <div>
                    <h2 className="text-2xl font-semibold">Ubicacion</h2>
                    <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                        {property.building} - {property.address} -{" "}
                        <span className="capitalize">{property.city} </span>
                    </span>
                </div>
                <div className="border-b w-14 border-neutral-200 dark:border-neutral-700" />

                {/* MAP */}
                <div className="aspect-w-5 aspect-h-5 sm:aspect-h-3">
                    <div className="overflow-hidden rounded-xl">
                        <GoogleMapReact
                            bootstrapURLKeys={{
                                key: "AIzaSyDkDFnRyELEsM8J-lfKlKEq0zc0HQZzkaU",
                            }}
                            yesIWantToUseGoogleMapApiInternals
                            defaultZoom={15}
                            defaultCenter={{
                                lat: property.latitude,
                                lng: property.longitude,
                            }}
                        >
                            <LocationMarker
                                lat={property.latitude}
                                lng={property.longitude}
                            />
                        </GoogleMapReact>
                    </div>
                </div>
            </div>
        );
    };

    const renderSidebar = () => {
        return (
            <div className="shadow-xl listingSectionSidebar__wrap">
                {/* PRICE */}
                <div className="flex flex-col items-center justify-between">
                    <span className="text-3xl font-semibold">
                        {formatMoney.format(property.price)}
                    </span>
                    <span className="text-sm">
                        Administracion{" "}
                        {formatMoney.format(property.lastAdminprice)}
                    </span>
                    {/* <StartRating /> */}
                </div>

                {/* SUM */}
                <div className="flex flex-col space-y-4">
                    <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                        <span>¿Te interesó este inmueble?</span>
                    </div>
                </div>

                {/* SUBMIT */}
                <ButtonPrimary onClick={() => setModalIsOpen(true)}>
                    Quiero que me contacten
                </ButtonPrimary>
                <ModalContactMe
                    isOpen={modalIsOpen}
                    setIsOpen={setModalIsOpen}
                    property={property}
                />
                {/* MAP */}
                <div className="aspect-w-5 aspect-h-5 sm:aspect-h-3">
                    <div className="overflow-hidden rounded-xl">
                        <GoogleMapReact
                            bootstrapURLKeys={{
                                key: "AIzaSyDkDFnRyELEsM8J-lfKlKEq0zc0HQZzkaU",
                            }}
                            yesIWantToUseGoogleMapApiInternals
                            defaultZoom={15}
                            center={{
                                lat: property.latitude,
                                lng: property.longitude,
                            }}
                        >
                            <LocationMarker
                                lat={property.latitude}
                                lng={property.longitude}
                            />
                        </GoogleMapReact>
                    </div>
                </div>
                <div>
                    <span className="block text-sm dark:text-neutral-400">
                        {property.building} - {property.address} -{" "}
                        <span className="capitalize">{property.city} </span>
                    </span>
                </div>
            </div>
        );
    };

    return (
        <div
            className={`nc-ListingStayDetailPage  ${className}`}
            data-nc-id="ListingStayDetailPage"
        >
            {/* SINGLE HEADER */}
            <>
                <header className="container rounded-md 2xl:px-14 sm:rounded-xl">
                    <div className="relative grid grid-cols-3 gap-1 sm:grid-cols-4 sm:gap-2">
                        <div
                            className={` ${
                                property.galleryImgs &&
                                property.galleryImgs.length <= 1
                                    ? "col-span-3"
                                    : "col-span-2"
                            } relative  row-span-3 overflow-hidden rounded-md cursor-pointer sm:row-span-2 sm:rounded-xl`}
                            onClick={() => handleOpenModal(0)}
                        >
                            <NcImage
                                containerClassName={`${
                                    property.galleryImgs &&
                                    property.galleryImgs.length <= 1
                                        ? "relative"
                                        : "absolute"
                                } inset-0`}
                                className="object-cover w-full h-full rounded-md sm:rounded-xl"
                                src={
                                    property.galleryImgs?.length &&
                                    `${process.env.REACT_APP_API_PUBLIC_IMG}/${property.galleryImgs[0]}`
                                }
                            />
                            <div className="absolute inset-0 transition-opacity opacity-0 bg-neutral-900 bg-opacity-20 hover:opacity-100"></div>
                        </div>
                        {property.galleryImgs &&
                            property.galleryImgs
                                .filter((_: any, i: number) => i >= 1 && i < 5)
                                .map((item: any, index: any) => (
                                    <div
                                        key={index}
                                        className={`relative rounded-md sm:rounded-xl overflow-hidden ${
                                            index >= 3 ? "hidden sm:block" : ""
                                        }`}
                                    >
                                        <NcImage
                                            containerClassName="aspect-w-4 aspect-h-3 sm:aspect-w-6 sm:aspect-h-5"
                                            className="object-cover w-full h-full rounded-md sm:rounded-xl "
                                            src={`${process.env.REACT_APP_API_PUBLIC_IMG}/${item}`}
                                        />

                                        {/* OVERLAY */}
                                        <div
                                            className="absolute inset-0 transition-opacity opacity-0 cursor-pointer bg-neutral-900 bg-opacity-20 hover:opacity-100"
                                            onClick={() =>
                                                handleOpenModal(index + 1)
                                            }
                                        />
                                    </div>
                                ))}

                        <div
                            className="absolute z-10 hidden px-4 py-2 cursor-pointer md:flex md:items-center md:justify-center left-3 bottom-3 rounded-xl bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
                            onClick={() => handleOpenModal(0)}
                        >
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
                                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                                />
                            </svg>
                            <span className="ml-2 text-sm font-medium text-neutral-800">
                                Ver todas las fotos
                            </span>
                        </div>
                    </div>
                </header>
                {/* MODAL PHOTOS */}
                {property.galleryImgs && (
                    <ModalPhotos
                        imgs={property.galleryImgs}
                        isOpen={isOpen}
                        onClose={handleCloseModal}
                        initFocus={openFocusIndex}
                        uniqueClassName="nc-ListingStayDetailPage-modalPhotos"
                    />
                )}
            </>

            {/* MAIn */}
            <main className="container relative z-10 flex flex-col mt-11 lg:flex-row ">
                {/* CONTENT */}
                <div className="w-full space-y-8 lg:w-3/5 xl:w-2/3 lg:space-y-10 lg:pr-10">
                    {renderSection1()}
                    {property.description && renderSection2()}
                    {renderSection5()}
                    <CommentsSection
                        newComment={newComment}
                        setNewComment={setNewComment}
                    />
                </div>

                {/* SIDEBAR */}
                <div className="flex-grow block mt-14 lg:mt-0">
                    <div className="sticky top-24">{renderSidebar()}</div>
                </div>
            </main>

            {/* STICKY FOOTER MOBILE */}
            {/* {!isPreviewMode && (
                <div className="fixed inset-x-0 bottom-0 z-20 block py-4 bg-white border-t lg:hidden text-neutral-900 border-neutral-200">
                    <div className="container flex items-center justify-between">
                        <ButtonPrimary href="##">
                            Quiero que me contacten
                        </ButtonPrimary>
                    </div>
                </div>
            )} */}

            {/* OTHER SECTION */}
            {!isPreviewMode && (
                <div className="container py-24 lg:py-32">
                    {/* SECTION */}
                    <SectionSubscribe2 className="pt-24 lg:pt-32" />
                </div>
            )}
        </div>
    );
};

export default PropertyDetailPage;
