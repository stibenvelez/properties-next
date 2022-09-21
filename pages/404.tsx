import React from "react";

const NotFoundPage = () => {
    return (
        <div className="bg-gray-50">
            <div className="container mx-auto">
                <div className="min-h-screen flex justify-center items-center flex-col">
                    <h1 className="text-8xl font-bold text-primary-600">404</h1>
                    <p className="text-gray-500"><span className="font-bold">Ups!</span> pagina no encotrada</p>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
