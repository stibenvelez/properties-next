import { Fragment, useState } from "react";
import { Combobox, Dialog, Popover, Transition } from "@headlessui/react";
import NcInputNumber from "../../components/NcInputNumber/NcInputNumber";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import ButtonThird from "../../shared/Button/ButtonThird";
import ButtonClose from "../../shared/ButtonClose/ButtonClose";
import Checkbox from "../../shared/Checkbox/Checkbox";
import Range from "rc-slider";
import convertNumbThousand from "../../helpers/convertNumbThousand";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../redux/properties";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { clearFilter } from "../../redux/properties/propertiesActions";

// DEMO DATA
const typeOfProperties = [
    {
        name: "Casa",
    },
    {
        name: "Apartamento",
    },
    {
        name: "Local",
    },
];

const TabFilters = () => {
    const dispatch: any = useDispatch();
    const [isOpenMoreFilterMobile, setisOpenMoreFilterMobile] = useState(false);
    const [query, setQuery] = useState("");

    //
    const closeModalMoreFilterMobile = () => setisOpenMoreFilterMobile(false);
    const openModalMoreFilterMobile = () => setisOpenMoreFilterMobile(true);
    //
    const filters = useSelector(({ properties }: any) => properties.filters);
    const properties = useSelector(
        ({ properties }: any) => properties.properties
    );

    const {cities} = useSelector(({ cities }: any) => cities);

    const handleChange = (item: any) => {
        dispatch(
            setFilters({
                ...filters,
                [item.name]: item.value,
            })
        );
    };

    const filteredCity =
        query === ""
            ? cities
            : cities.filter((city: any) =>
                  city.city
                      .toLowerCase()
                      .replace(/\s+/g, "")
                      .includes(query.toLowerCase().replace(/\s+/g, ""))
              );

    const renderXClear = () => {
        return (
            <span className="flex items-center justify-center w-4 h-4 ml-3 text-white rounded-full cursor-pointer bg-primary-500">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 h-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </span>
        );
    };
    const RenderSelectCity = () => {
        return (
            <div className="">
                <Combobox
                    value={filters}
                    onChange={(value) =>
                        handleChange({
                            name: "city",
                            value: value,
                        })
                    }
                >
                    <div className="relative">
                        <div className="relative inline-block">
                            <Combobox.Input
                                className="flex items-center justify-center px-4 py-2 text-sm border border-gray-200 rounded-md bg-gray-50 focus:outline-2 focus:outline-indigo-600 dark:border-neutral-700 focus:outline-none"
                                displayValue={(city: any) => city.city}
                                placeholder="Seleccione una ciudad"
                                onChange={(event) =>
                                    setQuery(event.target.value)
                                }
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
                            afterLeave={() => setQuery("")}
                        >
                            <Combobox.Options className="absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                <Combobox.Option
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active
                                                ? "bg-primary-500 text-white"
                                                : "text-gray-900"
                                        }`
                                    }
                                    value=""
                                >
                                    Todas
                                </Combobox.Option>
                                {filteredCity.length === 0 && query !== "" ? (
                                    <div className="relative px-4 py-2 text-gray-700 cursor-default select-none">
                                        Nothing found.
                                    </div>
                                ) : (
                                    cities.results &&
                                    cities.results.map((city: any) => (
                                        <Combobox.Option
                                            key={city.cityId}
                                            className={({ active }) =>
                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                    active
                                                        ? "bg-primary-500 text-white"
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
                                                        {city.city} (
                                                        {city.countProperties})
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
        );
    };

    const RenderInputneighborhood = () => {
        return (
            <div className="">
                <input
                    placeholder="Indique un barrio"
                    className="flex items-center justify-center px-4 py-2 text-sm bg-transparent border rounded-full border-neutral-300 dark:border-neutral-700 focus:outline-none"
                    name="neighborhood"
                    value={filters.neighborhood}
                    onChange={({ target }) =>
                        handleChange({
                            name: target.name,
                            value: target.value,
                        })
                    }
                />
            </div>
        );
    };

    const renderTabsTypeProperty = () => {
        return (
            <div className="">
                <Combobox
                    value={filters}
                    onChange={(value) =>
                        handleChange({
                            name: "propertyType",
                            value,
                        })
                    }
                >
                    <div className="relative">
                        <div className="relative inline-block">
                            <Combobox.Input
                                className="flex items-center justify-center px-4 py-2 text-sm bg-transparent border rounded-full border-neutral-300 dark:border-neutral-700 focus:outline-none"
                                displayValue={({ propertyType }: any) =>
                                    propertyType
                                }
                                placeholder="Seleccione una ciudad"
                                onChange={(e) => setQuery(e.target.value)}
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
                            afterLeave={() => setQuery("")}
                        >
                            <Combobox.Options className="absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                <Combobox.Option
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active
                                                ? "bg-primary-500 text-white"
                                                : "text-gray-900"
                                        }`
                                    }
                                    value=""
                                >
                                    Todas
                                </Combobox.Option>
                                {typeOfProperties &&
                                    typeOfProperties.map(
                                        (typeProperty: any) => (
                                            <Combobox.Option
                                                key={typeProperty.name}
                                                className={({ active }) =>
                                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                        active
                                                            ? "bg-primary-500 text-white"
                                                            : "text-gray-900"
                                                    }`
                                                }
                                                value={typeProperty.name}
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
                                                            {typeProperty.name}
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
                                        )
                                    )}
                            </Combobox.Options>
                        </Transition>
                    </div>
                </Combobox>
            </div>
        );
    };

    const renderTabsRoomAndBeds = () => {
        return (
            <Popover className="relative">
                {({ open, close }) => (
                    <>
                        <Popover.Button
                            className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 focus:outline-none ${
                                open ? "!border-primary-500 " : ""
                            }`}
                        >
                            <span>
                                <div className="flex gap-3">
                                    <p>
                                        {filters.bedrooms
                                            ? `${filters.bedrooms} habitaciones`
                                            : null}
                                    </p>
                                    <p>
                                        {filters.bathrooms
                                            ? `${filters.bathrooms} baños`
                                            : null}
                                    </p>
                                </div>
                                {!filters.bedrooms &&
                                    !filters.bathrooms &&
                                    "Habitaciones o baños "}
                            </span>
                            <i className="ml-2 las la-angle-down"></i>
                        </Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel className="absolute left-0 z-10 w-screen max-w-sm px-4 mt-3 sm:px-0 lg:max-w-md">
                                <div className="overflow-hidden bg-white border shadow-xl rounded-2xl dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700">
                                    <div className="relative flex flex-col px-5 py-6 space-y-5">
                                        <NcInputNumber
                                            label="Habitaciones desde"
                                            max={10}
                                            onChange={(value) =>
                                                handleChange({  
                                                    name: "bedrooms",
                                                    value,
                                                })
                                            }
                                            defaultValue={filters.bedrooms}
                                        />
                                        <NcInputNumber
                                            label="Baños desde"
                                            max={10}
                                            onChange={(value) =>
                                                handleChange({
                                                    name: "bathrooms",
                                                    value,
                                                })
                                            }
                                            defaultValue={filters.bathrooms}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800">
                                        <ButtonThird
                                            onClick={close}
                                            sizeClass="px-4 py-2 sm:px-5"
                                        >
                                            Clear
                                        </ButtonThird>
                                        {/* <ButtonPrimary
                                            sizeClass="px-4 py-2 sm:px-5"
                                            onClick={() => {
                                                handleFilter();
                                                close();
                                            }}
                                        >
                                            Apply
                                        </ButtonPrimary> */}
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        );
    };

    const renderTabsPriceRage = () => {
        return (
            <Popover className="relative">
                {({ open, close }) => (
                    <>
                        <Popover.Button
                            className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border dark:border-neutral-700   focus:outline-none ${
                                filters && filters?.rangePrices[1] !== 0
                                    ? "border-primary-500 bg-primary-50 text-primary-700"
                                    : "border-neutral-300"
                            } `}
                        >
                            <span>
                                {`$${convertNumbThousand(
                                    filters?.rangePrices[0]
                                )} - $${convertNumbThousand(
                                    filters?.rangePrices[1]
                                )}`}{" "}
                            </span>
                        </Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel className="absolute left-0 z-10 w-screen max-w-sm px-4 mt-3 sm:px-0 ">
                                <div className="overflow-hidden bg-white border shadow-xl rounded-2xl dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700">
                                    <div className="relative flex flex-col px-5 py-6 space-y-8">
                                        <div className="space-y-5">
                                            <span className="font-medium">
                                                Price per day
                                            </span>
                                            <Range
                                                className="text-red-400"
                                                min={0}
                                                max={
                                                    properties?.maxPrice ||
                                                    1000000000
                                                }
                                                defaultValue={[
                                                    filters?.rangePrices[0],
                                                    filters?.rangePrices[1],
                                                ]}
                                                allowCross={false}
                                                onChange={(value) => {
                                                    handleChange({
                                                        name: "rangePrices",
                                                        value,
                                                    });
                                                }}
                                                step={
                                                    properties?.maxPrice /
                                                        100 || 1000
                                                }
                                            />
                                        </div>

                                        <div className="flex justify-between space-x-5">
                                            <div>
                                                <label
                                                    htmlFor="minPrice"
                                                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                                >
                                                    Min price
                                                </label>
                                                <div className="relative mt-1 rounded-md">
                                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                        <span className="text-neutral-500 sm:text-sm">
                                                            $
                                                        </span>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        name="minPrice"
                                                        disabled
                                                        id="minPrice"
                                                        className={`block w-full pr-3 rounded-full   pl-7 sm:text-sm 
                                                        border-neutral-200 text-neutral-900"`}
                                                        value={
                                                            filters
                                                                .rangePrices[0]
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="maxPrice"
                                                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                                >
                                                    Max price
                                                </label>
                                                <div className="relative mt-1 rounded-md">
                                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                        <span className="text-neutral-500 sm:text-sm">
                                                            $
                                                        </span>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        disabled
                                                        name="maxPrice"
                                                        id="maxPrice"
                                                        className="block w-full pr-3 rounded-full focus:ring-indigo-500 focus:border-indigo-500 pl-7 sm:text-sm border-neutral-200 text-neutral-900"
                                                        value={
                                                            filters
                                                                .rangePrices[1]
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800">
                                        <ButtonThird
                                            sizeClass="px-4 py-2 sm:px-5"
                                            onClick={() => {
                                                handleChange({
                                                    name: "rangePrices",
                                                    value: [0, 0],
                                                });
                                                close();
                                            }}
                                        >
                                            Clear
                                        </ButtonThird>
                                        {/* <ButtonPrimary
                                            onClick={() => {
                                                handleFilter();
                                                close();
                                            }}
                                            sizeClass="px-4 py-2 sm:px-5"
                                        >
                                            Apply
                                        </ButtonPrimary> */}
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        );
    };

    const renderMoreFilterItem = (
        data: {
            name: string;
            defaultChecked?: boolean;
        }[]
    ) => {
        const list1 = data.filter((_, i) => i < data.length / 2);
        const list2 = data.filter((_, i) => i >= data.length / 2);
        return (
            <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col space-y-5">
                    {list1.map((item) => (
                        <Checkbox
                            key={item.name}
                            name={item.name}
                            label={item.name}
                            defaultChecked={!!item.defaultChecked}
                        />
                    ))}
                </div>
                <div className="flex flex-col space-y-5">
                    {list2.map((item) => (
                        <Checkbox
                            key={item.name}
                            name={item.name}
                            label={item.name}
                            defaultChecked={!!item.defaultChecked}
                        />
                    ))}
                </div>
            </div>
        );
    };

    const renderTabMoreFilterMobile = () => {
        return (
            <div>
                <div
                    className={`flex lg:hidden items-center justify-center px-4 py-2 text-sm rounded-full border border-primary-500 bg-primary-50 text-primary-700 focus:outline-none cursor-pointer`}
                    onClick={openModalMoreFilterMobile}
                >
                    <span>Más filtros (3)</span>
                    {renderXClear()}
                </div>

                <Transition appear show={isOpenMoreFilterMobile} as={Fragment}>
                    <Dialog
                        as="div"
                        className="fixed inset-0 z-50 overflow-y-auto"
                        onClose={closeModalMoreFilterMobile}
                    >
                        <div className="min-h-screen text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40 dark:bg-opacity-60" />
                            </Transition.Child>

                            {/* This element is to trick the browser into centering the modal contents. */}
                            <span
                                className="inline-block h-screen align-middle"
                                aria-hidden="true"
                            >
                                &#8203;
                            </span>
                            <Transition.Child
                                className="inline-block w-full h-screen py-8"
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <div className="inline-flex flex-col w-full h-full max-w-4xl overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100">
                                    <div className="relative flex-shrink-0 px-6 py-4 text-center border-b border-neutral-200 dark:border-neutral-800">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Más filtros
                                        </Dialog.Title>
                                        <span className="absolute left-3 top-3">
                                            <ButtonClose
                                                onClick={
                                                    closeModalMoreFilterMobile
                                                }
                                            />
                                        </span>
                                    </div>

                                    <div className="flex-grow overflow-y-auto">
                                        <div className="px-10 divide-y divide-neutral-200 dark:divide-neutral-800">
                                            {/* ---- */}
                                            <div className="py-7">
                                                <h3 className="text-xl font-medium">
                                                    Ciudad
                                                </h3>

                                                <div className="relative flex flex-col px-5 py-6 space-y-5">
                                                    {RenderSelectCity()}
                                                </div>
                                            </div>
                                            {/* ---- */}
                                            <div className="py-7">
                                                <h3 className="text-xl font-medium">
                                                    Barrio
                                                </h3>

                                                <div className="relative flex flex-col px-5 py-6 space-y-5">
                                                    {RenderInputneighborhood()}
                                                </div>
                                            </div>
                                            {/* ---- */}
                                            <div className="py-7">
                                                <h3 className="text-xl font-medium">
                                                    Tipo de propiedad
                                                </h3>
                                                <div className="relative mt-6 ">
                                                    {RenderSelectCity()}
                                                </div>
                                            </div>

                                            {/* ---- */}
                                            <div className="py-7">
                                                <h3 className="text-xl font-medium">
                                                    Tipo de propiedad
                                                </h3>
                                                <div className="relative mt-6 ">
                                                    {renderTabsTypeProperty()}
                                                </div>
                                            </div>

                                            {/* ---- */}
                                            <div className="py-7">
                                                <h3 className="text-xl font-medium">
                                                    Range Prices
                                                </h3>
                                                <div className="relative flex flex-col px-5 py-6 space-y-8">
                                                    <div className="space-y-5">
                                                        <span className="font-medium">
                                                            Price per day
                                                        </span>
                                                        <Range
                                                            className="text-red-400"
                                                            min={0}
                                                            max={
                                                                properties?.maxPrice ||
                                                                1000000000
                                                            }
                                                            defaultValue={[
                                                                filters
                                                                    ?.rangePrices[0],
                                                                filters
                                                                    ?.rangePrices[1],
                                                            ]}
                                                            allowCross={false}
                                                            onChange={(
                                                                value
                                                            ) => {
                                                                handleChange({
                                                                    name: "rangePrices",
                                                                    value,
                                                                });
                                                            }}
                                                            step={
                                                                properties?.maxPrice /
                                                                    100 || 1000
                                                            }
                                                        />
                                                    </div>

                                                    <div className="flex justify-between space-x-5">
                                                        <div>
                                                            <label
                                                                htmlFor="minPrice"
                                                                className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                                            >
                                                                Min price
                                                            </label>
                                                            <div className="relative mt-1 rounded-md">
                                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                                    <span className="text-neutral-500 sm:text-sm">
                                                                        $
                                                                    </span>
                                                                </div>
                                                                <input
                                                                    type="text"
                                                                    name="minPrice"
                                                                    disabled
                                                                    id="minPrice"
                                                                    className={`block w-full pr-3 rounded-full   pl-7 sm:text-sm 
                                                        border-neutral-200 text-neutral-900"`}
                                                                    value={
                                                                        filters
                                                                            .rangePrices[0]
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label
                                                                htmlFor="maxPrice"
                                                                className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                                            >
                                                                Max price
                                                            </label>
                                                            <div className="relative mt-1 rounded-md">
                                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                                    <span className="text-neutral-500 sm:text-sm">
                                                                        $
                                                                    </span>
                                                                </div>
                                                                <input
                                                                    type="text"
                                                                    disabled
                                                                    name="maxPrice"
                                                                    id="maxPrice"
                                                                    className="block w-full pr-3 rounded-full focus:ring-indigo-500 focus:border-indigo-500 pl-7 sm:text-sm border-neutral-200 text-neutral-900"
                                                                    value={
                                                                        filters
                                                                            .rangePrices[1]
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* ---- */}
                                            <div className="py-7">
                                                <h3 className="text-xl font-medium">
                                                    Rooms and beds
                                                </h3>

                                                <div className="relative flex flex-col px-5 py-6 space-y-5">
                                                    <NcInputNumber
                                                        label="Habitaciones desde"
                                                        max={10}
                                                        onChange={(value) =>
                                                            handleChange({
                                                                name: "bedrooms",
                                                                value,
                                                            })
                                                        }
                                                        defaultValue={
                                                            filters.bedrooms
                                                        }
                                                    />
                                                    <NcInputNumber
                                                        label="Baños desde"
                                                        max={10}
                                                        onChange={(value) =>
                                                            handleChange({
                                                                name: "bathrooms",
                                                                value,
                                                            })
                                                        }
                                                        defaultValue={
                                                            filters.bathrooms
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between flex-shrink-0 p-6 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800">
                                        <ButtonThird
                                            onClick={() => {
                                                dispatch(clearFilter());
                                                closeModalMoreFilterMobile();
                                            }}
                                            sizeClass="px-4 py-2 sm:px-5"
                                        >
                                            Clear
                                        </ButtonThird>
                                        <ButtonPrimary
                                            onClick={closeModalMoreFilterMobile}
                                            sizeClass="px-4 py-2 sm:px-5"
                                        >
                                            Apply
                                        </ButtonPrimary>
                                    </div>
                                </div>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        );
    };

    return (
        <div>
            <div className="flex items-center lg:space-x-4">
                <div className="items-center hidden space-x-4 lg:flex lg:flex-wrap gap-y-2 lg:items-center">
                    {RenderSelectCity()}
                    {RenderInputneighborhood()}
                    {renderTabsTypeProperty()}
                    {renderTabsPriceRage()}
                    {renderTabsRoomAndBeds()}
                    {/* {renderTabMoreFilter()} */}
                    <ButtonThird
                        onClick={() => {
                            dispatch(clearFilter());
                            closeModalMoreFilterMobile();
                        }}
                        className="text-sm text-gray-500 outline-none hover:outline-indigo-500 hover:outline hover:text-indigo-500"
                        sizeClass="px-4 py-1 sm:px-5"
                    >
                        <span>Limpiar filtros</span>
                    </ButtonThird>
                </div>
                {renderTabMoreFilterMobile()}
            </div>
            {/* <div className="flex gap-2 pt-4">
                {filters &&
                    Object.entries(filters)
                        .filter(
                            (filter) =>
                                filter[1] !== "" &&
                                !Array.isArray(filter[1]) &&
                                filter[1] // TODO add filters tags for rangeprice
                        )
                        .map((filter: any, index: number) => (
                            <span
                                key={index}
                                className="px-2 py-1 text-xs text-white bg-indigo-500 rounded-xl"
                            >
                                {!Array.isArray(filter[0])
                                    ? filter[0]
                                    : filter[1][0]}
                                -{" "}
                                {!Array.isArray(filter[1])
                                    ? filter[1]
                                    : `${filter[1][0]} - ${filter[1][1]} `}
                            </span>
                        ))}
            </div> */}
        </div>
    );
};

export default TabFilters;
