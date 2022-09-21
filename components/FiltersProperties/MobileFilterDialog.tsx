import { Dialog, Disclosure, Transition } from '@headlessui/react';
import { MinusSmIcon, PlusSmIcon, XIcon } from '@heroicons/react/outline';
import React, { FC, Fragment } from 'react'

interface MobileFilterDialog {
    mobileFiltersOpen: boolean;
    setMobileFiltersOpen: (value: boolean) => void;
    subCategories: any;
    filters: any;
}

const MobileFilterDialog: FC<MobileFilterDialog> = ({
    mobileFiltersOpen,
    setMobileFiltersOpen,
    subCategories,
    filters,
}) => {
    return (
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-40 lg:hidden"
                onClose={setMobileFiltersOpen}
            >
                <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 z-40 flex">
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-full"
                    >
                        <Dialog.Panel className="relative flex flex-col w-full h-full max-w-xs py-4 pb-12 ml-auto overflow-y-auto bg-white shadow-xl">
                            <div className="flex items-center justify-between px-4">
                                <h2 className="text-lg font-medium text-gray-900">
                                    Filters
                                </h2>
                                <button
                                    type="button"
                                    className="flex items-center justify-center w-10 h-10 p-2 -mr-2 text-gray-400 bg-white rounded-md"
                                    onClick={() => setMobileFiltersOpen(false)}
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XIcon
                                        className="w-6 h-6"
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>

                            {/* Filters */}
                            <form className="mt-4 border-t border-gray-200">
                                <h3 className="sr-only">Categories</h3>
                                <ul
                                    role="list"
                                    className="px-2 py-3 font-medium text-gray-900"
                                >
                                    {subCategories.map((category: any) => (
                                        <li key={category.name}>
                                            <a
                                                href={category.href}
                                                className="block px-2 py-3"
                                            >
                                                {category.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>

                                {filters.map((section: any) => (
                                    <Disclosure
                                        as="div"
                                        key={section.id}
                                        className="px-4 py-6 border-t border-gray-200"
                                    >
                                        {({ open }) => (
                                            <>
                                                <h3 className="flow-root -mx-2 -my-3">
                                                    <Disclosure.Button className="flex items-center justify-between w-full px-2 py-3 text-gray-400 bg-white hover:text-gray-500">
                                                        <span className="font-medium text-gray-900">
                                                            {section.name}
                                                        </span>
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
                                                <Disclosure.Panel className="pt-6">
                                                    <div className="space-y-6">
                                                        {section.options.map(
                                                            (
                                                                option: any,
                                                                optionIdx: any
                                                            ) => (
                                                                <div
                                                                    key={
                                                                        option.value
                                                                    }
                                                                    className="flex items-center"
                                                                >
                                                                    <input
                                                                        id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                        name={`${section.id}[]`}
                                                                        defaultValue={
                                                                            option.value
                                                                        }
                                                                        type="checkbox"
                                                                        defaultChecked={
                                                                            option.checked
                                                                        }
                                                                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                                                    />
                                                                    <label
                                                                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                        className="flex-1 min-w-0 ml-3 text-gray-500"
                                                                    >
                                                                        {
                                                                            option.label
                                                                        }
                                                                    </label>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                ))}
                            </form>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default MobileFilterDialog