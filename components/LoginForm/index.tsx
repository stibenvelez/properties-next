import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../../shared/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./schema";
import { useMutation, useQuery } from "@apollo/client";
import { LOGIN } from "../../graphql/queries/users";
import SpinnerButton from "../../shared/SpinnerButton/SpinnerButton";
import { useRouter } from "next/router";
import clientAxios from "config/axios";
import { signIn } from "next-auth/react";

interface LoginForm {
    email: string;
    password: string;
}

const LoginForm = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>({ resolver: yupResolver(schema) });
    /*
    const [mutateUser, { loading, error }] = useMutation(LOGIN, {
        errorPolicy: "all",
    });
    */
    const loginFetch = async (user: any) => {
        setLoading(true);
        //await clientAxios.post("/auth/login", user);

        setLoading(false);
        router.push("/");
    };
    const onSubmit = async (data: any) => {
        try {
            setLoading(true);
            await signIn("credentials", { ...data, redirect: false });
            setLoading(false);
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-gray-800">Email</label>
                        <Input
                            type="email"
                            autoComplete="email"
                            placeholder="name@email.com"
                            {...register("email")}
                        />
                        {errors.email && <span>{errors.email?.message}</span>}
                    </div>
                    <div className="space-y-1">
                        <label className="text-gray-800">Contraseña</label>
                        <Input
                            type="password"
                            placeholder="Ingrese su contraseña"
                            autoComplete="password"
                            {...register("password")}
                        />
                        {errors.password && (
                            <span>{errors.password?.message}</span>
                        )}
                    </div>
                    <div>
                        {/* {error && (
                            <p className="text-sm text-red-500">
                                {error.message}{" "}
                            </p>
                        )} */}
                    </div>

                    <div>
                        <button className="flex items-center justify-center w-full gap-2 px-4 py-2 font-bold text-white bg-primary-600 rounded-xl hover:bg-indigo-700">
                            {loading && <SpinnerButton />}
                            <span>Iniciar</span>
                        </button>
                    </div>
                    <div className="flex justify-end">
                        <Link href="/create-account">
                            <a className="font-semibold text-indigo-600">
                                Crear cuenta
                            </a>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
