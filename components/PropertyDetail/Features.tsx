import { ArrowsExpandIcon } from "@heroicons/react/outline";
import Image from "next/image";
import React, { FC } from "react";
import Area from "./icons/Area";
import {
    CashIcon,
    HomeIcon,
    LocationMarkerIcon,
    QrcodeIcon,
} from "@heroicons/react/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCommentDollar,
    faDoorClosed,
    faDoorOpen,
    faSquare,
    faSquareParking,
    faToilet,
} from "@fortawesome/free-solid-svg-icons";
interface Features {
    property: any;
}

const Features: FC<Features> = ({ property }) => {
    return (
        <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 ">
                <FontAwesomeIcon
                    icon={faSquare}
                    className="h-5 text-indigo-600"
                />

                <div className="">
                    <label className="text-gray-500 uppercase font-semibold">
                        Area
                    </label>
                    <p className="">{property.area} m2</p>
                </div>
            </div>
            <div className="flex items-center space-x-3 ">
                <FontAwesomeIcon
                    icon={faToilet}
                    className="h-5 text-indigo-600"
                />
                <div className="">
                    <label className="text-gray-500 uppercase font-semibold">
                        Baños
                    </label>
                    <p className=""> {property.bathrooms}</p>
                </div>
            </div>
            <div className="flex items-center space-x-3 ">
                <FontAwesomeIcon
                    icon={faCommentDollar}
                    className="h-5 text-indigo-600"
                />
                <div className="">
                    <label className="text-gray-500 uppercase font-semibold">
                        estrato
                    </label>
                    <p className="">{property.stratum}</p>
                </div>
            </div>
            <div className="flex items-center space-x-3 ">
                <FontAwesomeIcon
                    icon={faDoorClosed}
                    className="h-5 text-indigo-600"
                />
                <div className="">
                    <label className="text-gray-500 uppercase font-semibold">
                        Habitaciones
                    </label>
                    <p className=""> {property.bedrooms}</p>
                </div>
            </div>
            <div className="flex items-center space-x-3 ">
                <FontAwesomeIcon
                    icon={faSquareParking}
                    className="h-5 text-indigo-600"
                />
                <div className="">
                    <span className="">
                        <p className="">
                            {property.parking
                                ? "Con parqueadero"
                                : "Sin parqueadero"}
                        </p>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Features;
