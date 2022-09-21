import { FC, Suspense, useState } from "react";
import LocationMarker from "../../components/AnyReactComponent/LocationMarker";
import GoogleMapReact from "google-map-react";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import NcImage from "../../shared/NcImage/NcImage";
import ModalPhotos from "../../components/PropertyDetail/ModalPhotos";
import formatMoney from "../../helpers/formatMoney";
import ModalContactMe from "./ModalContactMe";

import SpinnerButton from "../../components/SpinnerButton";
import { useRouter } from "next/router";
import {
    CashIcon,
    LocationMarkerIcon,
    QrcodeIcon,
} from "@heroicons/react/outline";
import { useQuery } from "@apollo/client";
import { GET_PROPERTY } from "../../graphql/queries/properties";
import Logo from "../../shared/Logo/Logo";
import Features from "./Features";
import FormContactMe from "./FormContactMe";
const IMAGES_DEFAULT = [
    "image1",
    "image2",
    "image3",
    "image4",
    "image5",
    "image6",
];

type Props = {
    className?: string;
    isPreviewMode?: boolean;
};

const PropertyDetail: FC<Props> = ({ className = "", isPreviewMode }) => {
    const router = useRouter();
    const query = router.query;
    const [isOpen, setIsOpen] = useState(false);
    const [openFocusIndex, setOpenFocusIndex] = useState(0);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [newComment, setNewComment] = useState({
        name: "",
        comment: "",
        score: 5,
        propertyId: 1,
    });

    const handleOpenModal = (index: number) => {
        setIsOpen(true);
        setOpenFocusIndex(index);
    };
    const handleCloseModal = () => setIsOpen(false);

    const { data, loading, error }: any = useQuery(GET_PROPERTY, {
        variables: { id: Number(query?.id), suspend: true },
    });

    if (loading) {
        return (
            <div className=" animate-pulse min-h-[300px] gap-4  flex flex-col items-center justify-center">
                <Logo />
                <SpinnerButton className={"h-8 w-8"} />
            </div>
        );
    }

    if (!data) {
        return (
            <div className="min-h-[300px]  flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold text-center">
                    No se encontró este inmueble
                </h1>
                <p>Comprueba que este disponible</p>
            </div>
        );
    }
    const { getProperty: property } = data;

    const renderSection1 = () => {
        return (
            <div className="w-full flex flex-col sm:rounded-2xl border-b sm:border-t sm:border-l sm:border-r border-neutral-200 dark:border-neutral-700  sm:space-y-8 pb-10 px-0 sm:p-4 xl:p-8 !space-y-6">
                <h2 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">
                    {property.title}
                </h2>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center gap-1">
                        <QrcodeIcon className="h-5" />
                        <span className="ml-1">
                            Codigo: {property.idProperty}
                        </span>
                    </div>
                    <span>|</span>
                    <div className="flex items-center gap-1">
                        <LocationMarkerIcon className="h-5" />
                        <span className="ml-1">
                            {property.city.city} - {property.city.departament}
                        </span>
                    </div>
                </div>
                <div className="w-full border-b border-neutral-100 dark:border-neutral-700" />
                <Features property={property} />
            </div>
        );
    };

    const renderDescriptionSection = () => {
        return (
            <div className="flex flex-col w-full px-0 pb-10 space-y-6 border-b sm:rounded-2xl sm:border-t sm:border-l sm:border-r border-neutral-200 dark:border-neutral-700 sm:space-y-8 sm:p-4 xl:p-8">
                <h2 className="text-2xl font-semibold">Descripción</h2>
                <div className="border-b w-14 border-neutral-200 dark:border-neutral-700"></div>
                <div className="text-neutral-6000 dark:text-neutral-300">
                    <span>{property.description}</span>
                </div>
            </div>
        );
    };

    const renderMapSection = () => {
        return (
            <div className="flex flex-col w-full px-0 pb-10 space-y-6 border-b sm:rounded-2xl sm:border-t sm:border-l sm:border-r border-neutral-200 dark:border-neutral-700 sm:space-y-8 sm:p-4 xl:p-8">
                {/* HEADING */}
                <div>
                    <h2 className="text-2xl font-semibold">Ubicacion</h2>
                    <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                        {property.building} - {property.address} -{" "}
                        <span className="capitalize">
                            {property.city.city}{" "}
                        </span>
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
            <div className="flex flex-col w-full p-2 pb-10 space-y-6 border-t border-b border-l border-r shadow-xl rounded-2xl border-neutral-200 dark:border-neutral-700 sm:space-y-8 sm:p-4 xl:p-8">
                {/* PRICE */}
                <div className="flex flex-col items-center justify-between gap-2 text-gray-600 dark:text-white">
                    <span className="text-3xl font-semibold">
                        {formatMoney.format(property.price)}
                    </span>
                    <div className="flex items-center gap-2 px-2 text-sm bg-indigo-100 rounded dark:bg-indigo-900 dark:text-gray-50 xl">
                        <CashIcon className="h-4 text-primary-600 dark:text-gray-100" />
                        Administracion{" "}
                        {formatMoney.format(property.lastAdminprice)}
                    </div>
                    {/* <StartRating /> */}
                </div>

                <div className="flex flex-col space-y-4">
                    <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                        <span>¿Te interesó este inmueble?</span>
                    </div>

                    <ButtonPrimary onClick={() => setModalIsOpen(true)}>
                        Quiero que me contacten
                    </ButtonPrimary>
                    <span className="block text-sm text-gray-500 dark:text-neutral-400">
                        {property.building} - {property.address} -{" "}
                        <span className="capitalize ">
                            {property.city.city}{" "}
                        </span>
                    </span>
                </div>
            </div>
        );
    };

    return (
        <Suspense
            fallback={
                <div className="bg-red-500 animate-pulse min-h-[300px] gap-4  flex flex-col items-center justify-center">
                    gdsgd
                </div>
            }
        >
            <>
                <div className="rounded-md sm:rounded-xl">
                    <div className="py-2">
                        <button
                            onClick={() => router.back()}
                            className="px-2 py-1 text-gray-700 rounded-lg bg-slate-200"
                        >
                            Volver
                        </button>
                    </div>
                    <div className="relative grid grid-cols-3 gap-1 sm:grid-cols-4 sm:gap-2">
                        <div
                            className={` ${
                                property.galleryImages &&
                                property.galleryImages.length <= 1
                                    ? "col-span-3"
                                    : "col-span-2"
                            } relative  row-span-3 overflow-hidden rounded-md cursor-pointer sm:row-span-2 sm:rounded-xl`}
                            onClick={() => handleOpenModal(0)}
                        >
                            <NcImage
                                containerClassName={`${
                                    property.galleryImages &&
                                    property.galleryImages.length <= 1
                                        ? "relative"
                                        : "absolute"
                                } inset-0`}
                                className="object-cover w-full h-full rounded-md sm:rounded-xl"
                                src={`${property.galleryImages[0]?.url}`}
                            />
                            <div className="absolute inset-0 transition-opacity opacity-0 bg-neutral-900 bg-opacity-20 hover:opacity-100"></div>
                        </div>
                        {property.galleryImages &&
                            property.galleryImages
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
                                            src={item.url}
                                        />

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
                </div>

                {property.galleryImages && (
                    <ModalPhotos
                        imgs={property.galleryImages}
                        isOpen={isOpen}
                        onClose={handleCloseModal}
                        initFocus={openFocusIndex}
                        uniqueClassName="nc-ListingStayDetailPage-modalPhotos"
                    />
                )}

                <div className="relative z-10 flex flex-col mt-11 lg:flex-row">
                    <div className="w-full space-y-8 lg:w-4/6 xl:w-4/6 lg:space-y-10 lg:pr-10">
                        {renderSection1()}
                        {property.description && renderDescriptionSection()}
                        {renderMapSection()}
                    </div>
                    <div className="flex-grow block mt-14 lg:mt-0 ">
                        <div className="sticky transition-all duration-200 ease-in-out top-14">
                            {renderSidebar()}
                        </div>
                    </div>
                </div>

                {!isPreviewMode && (
                    <div className="fixed inset-x-0 bottom-0 z-20 block py-4 bg-white border-t lg:hidden text-neutral-900 border-neutral-200">
                        <div className="flex items-center justify-between">
                            <ButtonPrimary href="##">
                                Quiero que me contacten
                            </ButtonPrimary>
                        </div>
                    </div>
                )}
            </>
            <ModalContactMe isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
                <h3 className="text-3xl font-bold text-center text-indigo-500">
                    ¿Estas interesado en este inmueble?
                </h3>
                <p className="text-center text-gray-700 dark:text-white">
                    Llena los siguientes datos y un asesor se pondra en contacto
                    contigo cuanto antes.
                </p>
                <div className="flex justify-center mt-4">
                    <FormContactMe
                        property={property}
                        setIsOpen={setModalIsOpen}
                    />
                </div>
            </ModalContactMe>
        </Suspense>
    );
};

export default PropertyDetail;
