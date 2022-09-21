import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { FC } from "react";
import Select from "../../shared/Select/Select";

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
export interface PropertyTypeSelectProps {
    onChange?: (data: any) => void;
    fieldClassName?: string;
    value?: string;
}

const PropertyTypeSelect: FC<PropertyTypeSelectProps> = ({
    onChange,
    fieldClassName = "[ nc-hero-field-padding ]",
    value,
}) => {
    return (
        <Popover className="flex relative [ nc-flex-1 ]">
            {({ open, close }) => (
                <>
                    <Popover.Button
                        className={`flex p-6 text-left w-full flex-shrink-0 items-center ${fieldClassName} space-x-3 focus:outline-none cursor-pointer ${
                            open ? "nc-hero-field-focused" : ""
                        }`}
                    >
                        <div className="text-neutral-300 dark:text-neutral-400">
                            <svg
                                className="nc-icon-field nc-icon-field-2"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M6.75024 19.2502H17.2502C18.3548 19.2502 19.2502 18.3548 19.2502 17.2502V9.75025L12.0002 4.75024L4.75024 9.75025V17.2502C4.75024 18.3548 5.64568 19.2502 6.75024 19.2502Z"
                                ></path>
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M9.74963 15.7493C9.74963 14.6447 10.6451 13.7493 11.7496 13.7493H12.2496C13.3542 13.7493 14.2496 14.6447 14.2496 15.7493V19.2493H9.74963V15.7493Z"
                                ></path>
                            </svg>
                        </div>
                        <div className="flex-grow">
                            <span className="block font-semibold xl:text-lg">
                                {value === "" ? "Tipo" : value}
                            </span>
                            <span className="block mt-1 text-sm font-light leading-none text-neutral-400 ">
                                Tipo de inmueble
                            </span>
                        </div>
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
                        <Popover.Panel className="absolute left-0 z-10 w-full sm:min-w-[340px] max-w-sm bg-white dark:bg-neutral-800 top-full mt-3 py-5 sm:py-6 px-4 sm:px-8 rounded-3xl shadow-xl">
                            <Select
                                name="propertyType"
                                value={value}
                                onChange={onChange}
                            >
                                <option hidden value="">
                                    -- seleccione ---
                                </option>
                                {typeOfProperties &&
                                    typeOfProperties.map((item: any) => (
                                        <option key={item.name} className="">
                                            {item.name}
                                        </option>
                                    ))}
                            </Select>
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    );
};

export default PropertyTypeSelect;
