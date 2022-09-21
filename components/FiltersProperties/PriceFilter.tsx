import {
    Fragment,
    useEffect,
    useRef,
    useState,
    useTransition,
} from "react";
import { Disclosure, Transition } from "@headlessui/react";
import {
    CurrencyDollarIcon,
    MinusSmIcon,
    PlusSmIcon,
} from "@heroicons/react/outline";

import React from "react";
import { useRouter } from "next/router";
import { readFilters } from "../../redux/properties/propertiesActions";
import { useDispatch } from "react-redux";

import "rc-slider/assets/index.css";
import Input from "../../shared/Input";

const DATA_FILTER = {
    id: "price",
    name: "Precio"
};

const initialState = {
    minPrice: 0,
    maxPrice: 0,
};

const PriceFilter = () => {
    const router = useRouter();
    const dispatch: any = useDispatch();
    const [pending, startTransition] = useTransition();
    const [priceRange, setPriceRange]: any = useState(initialState);

    const urlQuery = router.query;

    const minPriceRef:any = useRef()
    const maxPriceRef:any = useRef()
    useEffect(() => {
        dispatch(readFilters(router.query));
    }, [router.query]);

    const handleChange = (e: React.SyntheticEvent<EventTarget>) => {
        const target = e.target as HTMLInputElement;
        setPriceRange({
            ...priceRange,
            [target.name]: target.value,
        }); 
        
        startTransition(() => {
            router.push({
                pathname: router.route,
                query: {
                    ...urlQuery,
                    [target.name]: target.value,
                },
            });
        });
    };

    const handleClearFilter = () => {
        if (priceRange) {
            const { minPrice, maxPrice, ...rest } = urlQuery;
            minPriceRef.current.value = 0
            maxPriceRef.current.value = 0
            router.push({
                pathname: router.route,
                query: rest,
            });
        }
    };

    return (
        <Disclosure as="div" className="py-6 border-b border-gray-200">
            {({ open }: any) => (
                <Fragment>
                    <h3 className="flow-root -my-3 text-gray-800 hover:text-indigo-600">
                        <Disclosure.Button className="flex items-center justify-between w-full py-3 text-sm text-gray-600 hover:text-primary-600">
                            <div className="flex gap-2 dark:text-white">
                                <CurrencyDollarIcon className="h-5" />
                                <span className="flex font-medium">
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
                        <div className="relative flex flex-col space-y-8">
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                            >
                                <div>
                                    <div className="flex gap-2 mt-6">
                                        <div className="flex-1">
                                            <Input
                                                type="number"
                                                placeholder="Precio mínimo"
                                                name="minPrice"
                                                onChange={handleChange}
                                                defaultValue={
                                                    priceRange.minPrice
                                                }
                                                ref={minPriceRef}
                                                min={0}
                                            />
                                            <label className="text-sm text-gray-400">
                                                MIn.
                                            </label>
                                        </div>
                                        <div className="justify-end flex-1">
                                            <Input
                                                type="number"
                                                placeholder="Precio Máximo"
                                                name="maxPrice"
                                                onChange={handleChange}
                                                defaultValue={
                                                    priceRange.maxPrice
                                                }
                                                ref={maxPriceRef}
                                                min={0}
                                            />
                                            <label className="text-sm text-gray-400 ">
                                                Max.
                                            </label>
                                        </div>
                                    </div>
                                    {(priceRange.minPrice !== 0 ||
                                        priceRange.maxPrice !== 0) && (
                                        <div className="flex justify-end py-2">
                                            <button
                                                onClick={()=>handleClearFilter()}
                                                className="text-sm text-gray-500 hover:text-primary-600"
                                            >
                                                Limpiar filtro
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </Transition>
                        </div>
                    </div>
                </Fragment>
            )}
        </Disclosure>
    );
};

export default PriceFilter;
