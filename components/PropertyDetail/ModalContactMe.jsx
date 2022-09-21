import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import FormContactMe from "./FormContactMe";

const ModalContactMe = ({children, isOpen, setIsOpen }) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="relative z-50 "
            >
                {/* The backdrop, rendered as a fixed sibling to the panel container */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div
                        className="fixed inset-0 bg-black/30"
                        aria-hidden="true"
                    />
                </Transition.Child>

                {/* Full-screen container to center the panel */}
                <div className="fixed inset-0 flex items-center justify-center p-4 ">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        {/* The actual dialog panel  */}
                        <Dialog.Panel className="mx-auto  max-w-[800px] rounded bg-white dark:bg-slate-800">
                            <div className="lg:p-8 px-2 py-4">
{children}
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default ModalContactMe;
