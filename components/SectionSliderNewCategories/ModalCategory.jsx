import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import NcImage from "public/images/NcImage";
import { setFilters } from "redux/properties";
import HIW3img from "../../images/HIW2-2.png";

const MAP_OFFER = {
    rent: "arriendo",
    sell: "venta",
};

const ModalCategory = ({ isOpen, setIsOpen, citySelected }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [dataModal, setDataModal] = useState({});

    const filters = useSelector(({ properties }) => properties.filters);
    const handleDataModal = (data) => {
        dispatch(
            setFilters({
                ...filters,
                [citySelected.name]: citySelected.value,
            })
        );
        router.push(`/${MAP_OFFER[data.value]}`);
    };

    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="relative z-50 "
            >
                {/* The backdrop, rendered as a fixed sibling to the panel container */}
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

                {/* Full-screen container to center the panel */}
                <div className="fixed inset-0 flex items-center justify-center p-4 ">
                    {/* The actual dialog panel  */}
                    <Dialog.Panel className="mx-auto  max-w-[800px] rounded bg-white">
                        <div className="p-8">
                            <Dialog.Title className="text-center text-xl">
                                ¿Que desea buscar?
                            </Dialog.Title>
                            <p className="text-center">
                                Indica el tipo de oferta estás buscando
                            </p>
                            <div className="grid grid-cols-2 justify-center gap-8">
                                <div className="flex items-center justify-center">
                                    <NcImage
                                        containerClassName="dark:hidden block  max-w-[300px] mx-auto"
                                        src={HIW3img}
                                    />
                                </div>
                                <div className="flex items-center">
                                    <div className="flex flex-col w-full overflow-hidden rounded-lg shadow">
                                        <button
                                            onClick={() =>
                                                handleDataModal({
                                                    name: "offer",
                                                    value: "sell",
                                                })
                                            }
                                            className="w-full bg-indigo-600 p-4 hover:bg-green-400 text-white flex items-center content-center gap-4 "
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                class="h-6 w-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                stroke-width="2"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                            En venta
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDataModal({
                                                    name: "offer",
                                                    value: "rent",
                                                })
                                            }
                                            className="w-full bg-indigo-600 p-4 hover:bg-green-400 text-white flex items-center content-center gap-4 "
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path
                                                
                                                    strokeLinejoin="round"
                                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                                />
                                            </svg>
                                            En arriendo
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    );
};

export default ModalCategory;
