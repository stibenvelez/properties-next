import { Fragment, useEffect, useRef, useState } from "react";
import { Combobox, Disclosure, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { readFilters } from "../../redux/properties/propertiesActions";
import {
    LocationMarkerIcon,
    MinusSmIcon,
    PlusSmIcon,
} from "@heroicons/react/outline";
import Input from "../../shared/Input";
import { GET_CITIES_NAMES } from "../../graphql/queries/cities";
import { useQuery } from "@apollo/client";

const DATA_FILTER = {
    id: "location",
    name: "Ubicación",
    icon: <LocationMarkerIcon className="h-5" />,
    numRoom: [
        { name: "1", value: "1", inStock: true },
        { name: "2", value: "2", inStock: true },
        { name: "3", value: "3", inStock: true },
        { name: ">4", value: "4", inStock: true },
    ],
};

const InputCitySearch = () => {
    const router = useRouter();
    const dispatch: any = useDispatch();
    //const [city, setSelectedCity] = useState("");
    //const [neighborhood, setSelectedNeighborhood] = useState("");
    const [values, setValues] = useState({
        city: "",
        neighborhood: "",
    });
    const [query, setQuery] = useState("");

    const { data, loading, error }: any = useQuery(GET_CITIES_NAMES);
    const { getCities: cities } = data || [[]];

    //const { cities, loading } = useSelector(({ cities }: any) => cities);
    const cityRef: any = useRef();
    const neighborhoodRef: any = useRef();
    const urlQuery = router.query;
    
    const filteredCity =
        query === ""
            ? cities
            : cities.filter((city: any) =>
                  city.city
                      .toLowerCase()
                      .replace(/\s+/g, "")
                      .includes(query.toLowerCase().replace(/\s+/g, ""))
              );
    useEffect(() => {
        const valueCity: any = router.query.city;
        const valueNeighborhood: any = router.query.neighborhood;
        setValues({
            city: valueCity ? valueCity : values.city,
            neighborhood: valueNeighborhood
                ? valueNeighborhood
                : values.neighborhood,
        });

        dispatch(readFilters(router.query));
    }, [router.query]);

    const handleChange = (input: any) => {
        const valuesChanges = { ...values, ...input };
        setValues(valuesChanges);

        router.replace({
            pathname: router.route,
            query: {
                ...urlQuery,
                city: valuesChanges.city,
                neighborhood: valuesChanges.neighborhood,
            },
        });
    };

    const handleClearFilter = () => {
      
            const { city, neighborhood, ...rest } = urlQuery;
            cityRef.current.value = "";
            neighborhoodRef.current.value ="";
            router.push({
                pathname: router.route,
                query: rest,
            });
  
      
    };

    const renderCity = () => (
        <div className="relative flex flex-col space-y-8">
            <Transition
                as={Fragment}
                enter="transition ease-out duration-300"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <div className="relative z-20 py-2">
                    <label className="text-gray-600">Ciudad</label>
                    <Combobox
                        value={values.city}
                        onChange={(value) =>
                            handleChange({
                                city: value,
                            })
                        }
                    >
                        <div className="relative">
                            <div className="relative w-full overflow-hidden text-left bg-white border border-gray-200 rounded-lg shadow-sm cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-600 sm:text-sm">
                                <Combobox.Input
                                    className="w-full py-3 pl-3 pr-10 text-sm leading-5 text-gray-900 border-none dark:bg-slate-900 focus:ring-0 focus:outline-none"
                                    displayValue={(city: any) => city}
                                    onChange={(e) => setQuery(e.target.value)}
                                    ref={cityRef}
                                />
                                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                    <SelectorIcon
                                        className="w-5 h-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </Combobox.Button>
                            </div>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                                afterLeave={() => {}}
                            >
                                <Combobox.Options className="absolute z-20 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {filteredCity &&
                                    filteredCity.length === 0 &&
                                    query !== "" ? (
                                        <div className="relative px-4 py-2 text-gray-700 cursor-default select-none">
                                            Nothing found.
                                        </div>
                                    ) : (
                                        filteredCity &&
                                        filteredCity.map((city: any) => (
                                            <Combobox.Option
                                                key={city.cityId}
                                                className={({ active }) =>
                                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                        active
                                                            ? "bg-indigo-600 text-white"
                                                            : "text-gray-900"
                                                    }`
                                                }
                                                value={city.city}
                                            >
                                                {({ selected, active }) => (
                                                    <>
                                                        <span
                                                            className={`block truncate ${
                                                                selected
                                                                    ? "font-medium"
                                                                    : "font-normal"
                                                            }`}
                                                        >
                                                            {city.city}
                                                        </span>
                                                        {selected ? (
                                                            <span
                                                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                                    active
                                                                        ? "text-white"
                                                                        : "text-primary-600"
                                                                }`}
                                                            >
                                                                <CheckIcon
                                                                    className="w-5 h-5"
                                                                    aria-hidden="true"
                                                                />
                                                            </span>
                                                        ) : null}
                                                    </>
                                                )}
                                            </Combobox.Option>
                                        ))
                                    )}
                                </Combobox.Options>
                            </Transition>
                        </div>
                    </Combobox>
                </div>
            </Transition>

        </div>
    );

    const renderNeighborhood = () => (
        <div className="flex flex-col space-y-8">
            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <div className="py-2 ">
                <label className="text-gray-600">Barrio</label>
                    <div className="relative">
                        <div className="w-full overflow-hidden text-left bg-white border border-gray-200 rounded-lg shadow-sm cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-600 sm:text-sm">
                            <Input
                                className="w-full py-3 pl-3 pr-10 text-sm leading-5 text-gray-900 border-none dark:bg-slate-900 focus:ring-0 focus:outline-none"
                                onChange={(e) =>
                                    handleChange({
                                        neighborhood: e.target.value,
                                    })
                                }
                                defaultValue={values.neighborhood}
                                placeholder="Barrio"
                                ref={neighborhoodRef}
                            />
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
    );

    return (
        <Disclosure as="div" className="py-6 border-b border-gray-200">
            {({ open }: any) => (
                <Fragment>
                    <h3 className="flow-root -my-3 text-gray-800 hover:text-indigo-600">
                        <Disclosure.Button className="flex items-center justify-between w-full py-3 text-sm text-gray-600 hover:text-primary-600">
                            <div className="flex gap-2 dark:text-white">
                                {DATA_FILTER.icon}
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
                    <div className="pt-2">
                        {renderCity()}
                        {renderNeighborhood()}
                    </div>
                    {(values.city || values.neighborhood) && (
                        <div className="flex justify-end py-2">
                            <button
                                onClick={()=>handleClearFilter()}
                                className="text-sm text-gray-500 hover:text-primary-600"
                            >
                                Limpiar filtro
                            </button>
                        </div>
                    )}
                </Fragment>
            )}
        </Disclosure>
    );
};

export default InputCitySearch;
