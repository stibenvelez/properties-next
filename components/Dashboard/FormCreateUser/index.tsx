import SpinnerButton from "shared/SpinnerButton/SpinnerButton";
import { ChangeEvent, ChangeEventHandler, FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Card from "shared/Card";
import Input from "shared/Input";
import Select from "shared/Select/Select";
import { validateForm } from "./utils/formValidation";
import { gql, useMutation, useQuery } from "@apollo/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Role } from "models";

interface User {
    firstName: string;
    lastName: string;
    idRole: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

const CREATE_USER = gql`
    mutation CreateUser($input: InputUser) {
        createUser(input: $input) {
            firstName
            lastName
            email
            idRole
            password
        }
    }
`;

const GET_ROLES = gql`
    query GetRoles {
        getRoles {
            idRole
            role
            state
        }
    }
`;
const userEmpty = {
    firstName: "",
    lastName: "",
    idRole: "",
    email: "",
    password: "",
    passwordConfirm: "",
};

const MOCK_USER = {
    firstName: "Carolina",
    lastName: "Henao",
    idRole: "3",
    email: "carolina97.henao@gmail.com",
    password: "1234",
    passwordConfirm: "1234",
};


const FormCreateUser = () => {
    const [user, setUser] = useState(MOCK_USER);
    const [errors, setErrors] = useState <Partial<User>>({});
    const { data } = useQuery(GET_ROLES);
    const { getRoles: roles } = data || []

    const [userMutation, {loading }] = useMutation(CREATE_USER, {
        onCompleted: () => {
            toast.success("Usuario Creado!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setUser(userEmpty);
        },
        onError: (error) => {
            toast.error(error.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        },
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const Errors = await validateForm(user);
        if (Object.keys(Errors).length > 0) {
            setErrors(Errors);
            return;
        }
        const formatUser = {
            ...user,
            idRole: parseInt(user.idRole),
        };
        userMutation({ variables: { input: formatUser } });
    };

    return (
        <Card className="max-w-4xl mx-auto p-8">
            <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
                <div className="flex gap-4">
                    <label className="block  w-1/2">
                        <span className="text-neutral-800 dark:text-neutral-200">
                            Primer nombre
                        </span>
                        <Input
                            type="text"
                            placeholder="Ingrese un primer nombre"
                            className="mt-1"
                            name="firstName"
                            value={user.firstName}
                            onChange={handleChange}
                        />
                        {errors.firstName && (
                            <p className="text-sm text-red-500">
                                {errors.firstName}
                            </p>
                        )}
                    </label>
                    <label className="block w-1/2">
                        <span className="text-neutral-800 dark:text-neutral-200">
                            Primer apellido
                        </span>
                        <Input
                            type="text"
                            placeholder="Ingrese un apellido"
                            className="mt-1"
                            name="lastName"
                            value={user.lastName}
                            onChange={handleChange}
                        />
                        {errors.lastName && user.lastName === "" && (
                            <p className="text-sm text-red-500">
                                {errors.lastName}
                            </p>
                        )}
                    </label>
                </div>
                <label className="block">
                    <span className="text-neutral-800 dark:text-neutral-200">
                        Email
                    </span>
                    <Input
                        type="email"
                        placeholder="example@example.com"
                        className="mt-1"
                        name="email"
                        autoComplete="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && user.email === "" && (
                        <p className="text-sm text-red-500"> {errors.email}</p>
                    )}
                </label>
                <label className="block">
                    <span className="text-neutral-800 dark:text-neutral-200">
                        Rol
                    </span>
                    <Select
                        name="idRole"
                        value={user.idRole}
                        onChange={handleChange}
                    >
                        <option value="">Seleccione</option>
                        {roles &&
                            roles.map((role: Role, index:number) => (
                                <option
                                    className="capitalize"
                                    key={index}
                                    value={role.idRole}
                                >
                                    {role.role}
                                </option>
                            ))}
                    </Select>
                    {errors.idRole && user.idRole === "" && (
                        <p className="text-sm text-red-500"> {errors.idRole}</p>
                    )}
                </label>
                <label className="block">
                    <span className="flex items-center justify-between text-neutral-800 dark:text-neutral-200">
                        contraseña
                    </span>
                    <Input
                        type="password"
                        className="mt-1"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                    />
                    {errors.password && user.password === "" && (
                        <p className="text-sm text-red-500">
                            {errors.password}
                        </p>
                    )}
                </label>
                <label className="block">
                    <span className="flex items-center justify-between text-neutral-800 dark:text-neutral-200">
                        confirmar contraseña
                    </span>
                    <Input
                        type="password"
                        className="mt-1"
                        name="passwordConfirm"
                        value={user.passwordConfirm}
                        onChange={handleChange}
                    />
                    {errors.passwordConfirm &&
                        user.passwordConfirm !== user.password && (
                            <p className="text-sm text-red-500">
                                {errors.passwordConfirm}
                            </p>
                        )}
                </label>
                <ButtonPrimary className="flex gap-2" type="submit">
                    {loading ? (
                        <>
                            <SpinnerButton /> Agregando
                        </>
                    ) : (
                        "Agregar usuario"
                    )}
                </ButtonPrimary>
                <ToastContainer />
            </form>
        </Card>
    );
};

export default FormCreateUser;
