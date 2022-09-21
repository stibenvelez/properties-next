import Link from "next/link";
import React from "react";
import Input from "../../shared/Input";

const FormCreateAccount = () => {
    return (
        <div className="w-full">
            <form>
                <div className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-gray-800">Email</label>
                        <Input
                            type="email"
                            name="email"
                            placeholder="name@email.com"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-gray-800">Contraseña</label>
                        <Input
                            type="password"
                            name="password"
                            placeholder="Ingrese su contraseña"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-gray-800">
                            Confirmar contraseña
                        </label>
                        <Input
                            type="password"
                            name="passwordConfirm"
                            placeholder="Ingrese su contraseña"
                        />
                    </div>
                    <div className="flex gap-2">
                        <div className="space-y-1">
                            <label className="text-gray-800">Nombre</label>
                            <Input
                                type="text"
                                name="userName"
                                placeholder="Su nombre"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-gray-800">Apellido</label>
                            <Input
                                type="text"
                                name="lastName"
                                placeholder="Su apellido"
                            />
                        </div>
                    </div>
                    <div>
                        <button className="w-full font-bold bg-primary-600 py-2 px-4 rounded-xl text-white hover:bg-indigo-700">
                            Iniciar
                        </button>
                    </div>
                    <div className="flex justify-end">
                        <Link href="/login">
                            <a className="font-semibold text-indigo-600">
                                Iniciar sesión
                            </a>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default FormCreateAccount;
