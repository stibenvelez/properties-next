import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronDownIcon, UserIcon } from "@heroicons/react/solid";
import { singOutAction } from "../../redux/auth/authActions";
function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function MenuProfile() {
    const dispatch = useDispatch();
    const user = useSelector(({ auth }) => auth.user);
    const signOut = () => dispatch(singOutAction())
    return (
        <Menu as="div" className="relative inline-block text-left"  >
            <div>
                <Menu.Button className="inline-flex items-center justify-center w-full gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                    <UserIcon className="capitalize text-cyan-900" />
                    {user.firstName}
                    <ChevronDownIcon
                        className="w-5 h-5 ml-2 -mr-1"
                        aria-hidden="true"
                    />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <NavLink
                                    to={`/admin/profile/${user.idUser}`}
                                    className={classNames(
                                        active
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-700",
                                        "block px-4 py-2 text-sm"
                                    )}
                                >
                                    Cuenta
                                </NavLink>
                            )}
                        </Menu.Item>
                        {/* <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="#"
                                    className={classNames(
                                        active
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-700",
                                        "block px-4 py-2 text-sm"
                                    )}
                                >
                                    Support
                                </a>
                            )}
                        </Menu.Item> */}
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    type="button"
                                    className={classNames(
                                        active
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-700",
                                        "block w-full text-left px-4 py-2 text-sm"
                                    )}
                                    onClick={() => signOut()}
                                >
                                    Cerrar sesión
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
