import React from 'react'
import FormCreateAccount from '../../components/FormCreateAccount';
import LoginForm from '../../components/LoginForm';
import Logo from '../../shared/Logo/Logo';

const createAccount = () => {
  return (
      <div className="bg-gray-50">
          <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3  min-h-screen">
              <div className="flex flex-col justify-center items-center container mx-auto space-y-4">
                  <Logo />
                  <h1 className="text-4xl font-bold">Crear una cuenta</h1>
                  <FormCreateAccount/>
              </div>
              <div className="hidden md:block bg-login bg-no-repeat bg-cover bg-center w-full lg:col-span-2 transition-all duration-200 ease-in-out"></div>
          </div>
      </div>
  );
}

export default createAccount