import useUser from "lib/useUser";
import React from "react";
import LoginForm from "../../components/LoginForm";
import Logo from "../../shared/Logo/Logo";


const LoginPage = () => {
    return (
        <div className="bg-gray-50">
            <div className="grid grid-col-1 lg:grid-cols-2 xl:grid-cols-3  min-h-screen">
                <div className="flex flex-col justify-center items-center container mx-auto space-y-4">
                    <Logo />
                    <h1 className="text-4xl font-bold">Ingresar</h1>
                    <LoginForm />
                </div>
                <div className="hidden lg:block bg-login bg-no-repeat bg-cover bg-center w-full lg:col-span-1 xl:col-span-2 transition-all duration-200 ease-in-out"></div>
            </div>
        </div>
    );
};

export default LoginPage;
