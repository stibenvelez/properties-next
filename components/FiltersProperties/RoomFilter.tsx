import { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, RadioGroup, Transition } from "@headlessui/react";
import { CollectionIcon, MinusSmIcon, PlusSmIcon, XIcon } from "@heroicons/react/outline";

import React from "react";
import { useRouter } from "next/router";
import { readFilters } from "../../redux/properties/propertiesActions";
import { useDispatch } from "react-redux";

const DATA_FILTER = {
    id: "rooms",
    name: "Habitaciones",
    numRoom: [
        { name: "1", value: 1, inStock: true },
        { name: "2", value: 2, inStock: true },
        { name: "3", value: 3, inStock: true },
        { name: ">4", value: 4, inStock: true },
    ],
};

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

const RoomFilter = () => {
    const router = useRouter();
    const dispatch:any = useDispatch();
    const [selectedNumRoom, setSelectedNumRoom]: any = useState("");
    const urlQuery = router.query;

    useEffect(() => {
        setSelectedNumRoom(router.query.bedrooms);
        dispatch(readFilters(router.query));
    }, [router.query]);
    
    const handleChange = (value: any) => {
        setSelectedNumRoom(value);
        router.push({
            pathname: router.route,
            query: {
                ...urlQuery,
                bedrooms: value,
            },
        });
    };

    const handleClearFilter = () => {
        if (selectedNumRoom) {
            
            const { bedrooms, ...rest } = urlQuery;
            setSelectedNumRoom("");
            router.push({
                pathname: router.route,
                query: rest
            }
            );
        }
        
    };

    return (
        <Disclosure as="div" className="py-6 border-b border-gray-200">
            {({ open }: any) => (
                <Fragment>
                    <h3 className="flow-root -my-3 text-gray-800 hover:text-indigo-600">
                        <Disclosure.Button className="flex items-center justify-between w-full py-3 text-sm text-gray-600 hover:text-primary-600">
                            <div className="flex gap-2">
                                <CollectionIcon className="h-5 dark:text-white" />
                                <span className="flex font-medium dark:text-white">
                                    {DATA_FILTER.name}
                                </span>
                            </div>
                            <span className="flex items-center ml-6 dark:text-white">
                                {open ? (
                                    <MinusSmIcon
                                        className="w-5 h-5"
                                        aria-hidden="true"
                                    />
                                ) : (
                                    <PlusSmIcon
                                        className="w-5 h-5"
                                        aria-hidden="true"
                                    />
                                )}
                            </span>
                        </Disclosure.Button>
                    </h3>
                    <div>
                        <div className="space-y-4 ">
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                            >
                                {/* Sizes */}
                                <div className="">
                                    <RadioGroup
                                        value={selectedNumRoom}
                                        onChange={handleChange}
                                        className="mt-4"
                                    >
                                        <RadioGroup.Label className="sr-only">
                                            Choose a size
                                        </RadioGroup.Label>
                                        <div className="grid grid-cols-4 gap-4 ">
                                            {DATA_FILTER.numRoom.map((num) => (
                                                <RadioGroup.Option
                                                    key={num.name}
                                                    value={num.value}
                                                    className={({ active }) =>
                                                        classNames(
                                                            num.inStock
                                                                ? "bg-white shadow-sm dark:bg-slate-800  dark:text-white text-gray-900 cursor-pointer"
                                                                : "bg-gray-50 dark:text-white text-gray-200 cursor-not-allowed",
                                                            active
                                                                ? "ring-2 ring-indigo-500"
                                                                : "",
                                                            "group relative border dark:border-gray-500  rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1"
                                                        )
                                                    }
                                                >
                                                    {({ active, checked }) => (
                                                        <>
                                                            <RadioGroup.Label as="span">
                                                                {num.name}
                                                            </RadioGroup.Label>
                                                            {num.inStock ? (
                                                                <span
                                                                    className={classNames(
                                                                        active
                                                                            ? "border"
                                                                            : "border-2",
                                                                        checked
                                                                            ? "border-indigo-500"
                                                                            : "border-transparent",
                                                                        "absolute -inset-px rounded-md pointer-events-none"
                                                                    )}
                                                                    aria-hidden="true"
                                                                />
                                                            ) : (
                                                                <span
                                                                    aria-hidden="true"
                                                                    className="absolute border-2 border-gray-200 rounded-md pointer-events-none -inset-px"
                                                                >
                                                                    <svg
                                                                        className="absolute inset-0 w-full h-full text-gray-200 stroke-2"
                                                                        viewBox="0 0 100 100"
                                                                        preserveAspectRatio="none"
                                                                        stroke="currentColor"
                                                                    >
                                                                        <line
                                                                            x1={
                                                                                0
                                                                            }
                                                                            y1={
                                                                                100
                                                                            }
                                                                            x2={
                                                                                100
                                                                            }
                                                                            y2={
                                                                                0
                                                                            }
                                                                            vectorEffect="non-scaling-stroke"
                                                                        />
                                                                    </svg>
                                                                </span>
                                                            )}
                                                        </>
                                                    )}
                                                </RadioGroup.Option>
                                            ))}
                                        </div>
                                        {selectedNumRoom && (
                                            <div className="flex justify-end py-2">
                                                <button
                                                    onClick={handleClearFilter}
                                                    className="text-sm text-gray-500 hover:text-primary-600"
                                                >
                                                    Limpiar filtro
                                                </button>
                                            </div>
                                        )}
                                    </RadioGroup>
                                </div>
                            </Transition>
                        </div>
                    </div>
                </Fragment>
            )}
        </Disclosure>
    );
};

export default RoomFilter;
