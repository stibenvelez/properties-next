import { PencilAltIcon, TrashIcon } from '@heroicons/react/outline';
import { Property } from 'models';
import Link from 'next/link';
import React, { FC } from 'react'
import Swal from 'sweetalert2';

interface PropertyItem {
    property: Property;

}

const STATE_PROPERTY = {
    1: "bg-green-100 text-sm",
};

const OFFER_MAP = {
    arriendo: "Arriendo",
    venta: "Venta",
};

const ESTATE_ITEMS = {
    0: "bg-yellow-50",
    1: "",
    2: "bg-red-50 text-red-700",
};



const PropertyItem: FC<PropertyItem> = ({ property }) => {

    const handleDeleteProperty = (id) => {
        Swal.fire({
            title: "¿Deseas eliminar este inmueble?",
            text: "Una vez este eliminado no podrás verlo en la web",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#5046e5",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminarlo",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.value) {
                //dispatch(deletePropertyAction(id));
            }
        });
    };

    return (
        <tr
            className={`border-b  dark:border-gray-600 border-gray-200 hover:bg-gray-50 ${
                ESTATE_ITEMS[property.stateId]
            }`}
        >
            <td className="px-6 py-4 whitespace-no-wrap">
                <Link href={`/admin/property/${property.idProperty}`}>
                    <a className="hover:text-indigo-500">
                        {property.idProperty}
                    </a>
                </Link>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap">
                <Link href={`/admin/property/${property.idProperty}`}>
                    <a className="hover:text-indigo-500">{property.title}</a>
                </Link>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap">
                {property.city.city}
            </td>
            <td className="px-6 py-4 whitespace-no-wrap">
                {property.propertyType.propertyType}
            </td>

            <td className="px-6 py-4 whitespace-no-wrap">
                {OFFER_MAP[property.offer.offer]}
            </td>
            <td className="px-6 py-4 whitespace-no-wrap">
                <div
                    className={`${
                        STATE_PROPERTY[property.state.stateId]
                    } py-0.5 rounded-xl px-2 text-sm`}
                >
                    {property.state.state}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap">
                <div className="flex gap-1 ">
                    <button className=" hover:bg-gray-500 py-1 px-2 rounded hover:text-white text-gray-500 transition duration-200 ease-in-out">
                        <Link href={`/admin/property/${property.idProperty}`}>
                            <a className="text-xs ">Ver</a>
                        </Link>
                    </button>
                    <button className=" hover:bg-indigo-500 py-1 px-2 rounded hover:text-white text-gray-500 transition duration-200 ease-in-out">
                        <Link
                            href={`/admin/editar-inmueble/${property.idProperty}`}
                        >
                            <a className="text-xs ">
                                <PencilAltIcon className="w-4 h-4" />
                            </a>
                        </Link>
                    </button>
                    {property.stateId !== 2 && (
                        <button
                            onClick={() =>
                                handleDeleteProperty(property.idProperty)
                            }
                            className=" hover:bg-red-500 py-1 px-2 text-xs rounded hover:text-white text-gray-500 transition duration-200 ease-in-out"
                        >
                            <TrashIcon className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </td>
        </tr>
    );
};

export default PropertyItem