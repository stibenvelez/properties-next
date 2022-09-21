import { gql, useMutation, useQuery } from "@apollo/client";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import { formatDate, formatDateTime } from "helpers/formatDate";
import Link from "next/link";
import Spinner from "shared/Spinner";

const GET_CONTATME_LIST = gql`
    query GetAllContactMe {
        getAllContactMe {
            firstName
            lastName
            email
            message
            stateId
            createdAt
            updatedAt
            contactDate
            idProperty
            state {
                stateId
                state
            }
        }
    }
`;



const MAP_STATE_CONTACT = {
    1: {
        style: "bg-red-100",
    },
    2: {
        style: "bg-green-100",
    },
    3: {
        style: "bg-yellow-100",
    },
    4: {
        style: "bg-gray-100",
    },
};

const ToContactList = () => {

    const { data, loading } = useQuery(GET_CONTATME_LIST);
    const { getAllContactMe: toContactList } = data || [];


    if (loading) {
        return (<div className="py-4">
            <Spinner/>
        </div>)
    }

    return (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-white uppercase bg-slate-800 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Nombre
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Mensaje
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Fecha
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Estado
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800">
                    {toContactList &&
                        toContactList.map((toContact, index) => (
                            <tr
                                key={index}
                                className={`border-b  dark:border-gray-600 border-gray-200 dark:hover:bg-slate-700 hover:bg-gray-50 ${toContact.firstName}`}
                            >
                                <td className="px-6 py-4 whitespace-no-wrap">
                                    <div>
                                        <Link
                                            href={`/admin/property/${toContact.id}`}
                                        >
                                            <a className="text-lg hover:text-indigo-500">
                                                {toContact.firstName}{" "}
                                                {toContact.lastName}
                                            </a>
                                        </Link>
                                    </div>
                                    <p className="text-sm">{toContact.email}</p>
                                </td>
                                <td className="max-w-md px-6 py-4 whitespace-no-wrap">
                                    <p className="truncate">
                                        {toContact.message}
                                    </p>
                                </td>

                                <td className="px-6 py-4 whitespace-no-wrap">
                                    {formatDate(toContact.createdAt)}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap">
                                    {console.log(
                                        MAP_STATE_CONTACT[
                                            toContact.state.stateId
                                        ].style
                                    )}
                                    <p
                                        className={`py-1 px-2 rounded-full text-xs text-center ${
                                            MAP_STATE_CONTACT[
                                                toContact.state.stateId
                                            ].style
                                        }`}
                                    >
                                        {toContact.state.state}
                                    </p>
                                </td>

                                <td className="px-6 py-4 whitespace-no-wrap">
                                    <div className="flex gap-1 ">
                                        <Link
                                            href={`to-contact/${toContact.id}`}
                                        >
                                            <a
                                                className="px-2 py-1 text-xs text-gray-500 transition duration-200 ease-in-out rounded hover:bg-gray-500 hover:text-white"
                                            >
                                                Ver
                                            </a>
                                        </Link>
                                        {/* <button className="px-2 py-1 text-gray-500 transition duration-200 ease-in-out rounded hover:bg-indigo-500 hover:text-white">
                                            <Link href={`#`} className="text-xs ">
                                                <PencilAltIcon className="w-4 h-4" />
                                            </Link>
                                        </button> */}
                                        {toContact.stateId !== 4 && (
                                            <button
                                                onClick={() =>
                                                    handleDeleteProperty(
                                                        toContact.id
                                                    )
                                                }
                                                className="px-2 py-1 text-xs text-gray-500 transition duration-200 ease-in-out rounded hover:bg-red-500 hover:text-white"
                                            >
                                                <TrashIcon className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default ToContactList;
