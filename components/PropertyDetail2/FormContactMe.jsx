import SpinnerButton from "../../components/SpinnerButton";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import ButtonSecondary from "../../shared/Button/ButtonSecondary";
import Input from "../../shared/Input";
import Textarea from "../../shared/Textarea/Textarea";
import { contactMeAction } from "../../redux/contact/contact.actions";
import validateFormContactme from "./utils/validateFormContactme";

const FormContactMe = ({ property, setIsOpen }) => {
    const dispatch = useDispatch();
    const INITIAL_STATE_CONTACT = {
        firstName: "",
        lastName: "",
        email: "",
        message: `Saludos, estoy interesado en el apartamento con referencia ${property.reference}`,
    };
    const [contact, setContact] = useState(INITIAL_STATE_CONTACT);
    const [errors, setErrors] = useState({});

    const { isContactSent, loading } = useSelector(({ contact }) => contact);

    const handleChange = (e) => {
        setContact({
            ...contact,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        contact.idProperty = property.idProperty;
        const validate = await validateFormContactme(contact);

        if (Object.keys(validate).length > 0) {
            setErrors(validate);
            return;
        }

        dispatch(contactMeAction(contact));
    };

    useEffect(() => {
        if (isContactSent) {
            setContact(INITIAL_STATE_CONTACT);
            setIsOpen(false);
        }
    }, [isContactSent]);

    return (
        <div className="lg:p-2 w-full p-2">
            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <di className="grid lg:grid-cols-2 gap-2 ">
                        <div className="w-full">
                            <label
                                className="dark:text-white"
                                htmlFor="firtName"
                            >
                                Primer Nombre
                            </label>
                            <Input
                            className="dark:text-white"
                                name="firstName"
                                id="firstName"
                                type="text"
                                placeholder="Primer Nombre"
                                value={contact.firstName}
                                onChange={handleChange}
                            />
                            {errors.firstName && contact.firstName === "" && (
                                <p className="text-red-500 text-sm">
                                    {errors.firstName}
                                </p>
                            )}
                        </div>
                        <div className="w-full">
                            <label
                                className="dark:text-white"
                                htmlFor="lastName"
                            >
                                Primer apellido
                            </label>
                            <Input
                            className="dark:text-white"
                                name="lastName"
                                id="lastName"
                                type="text"
                                placeholder="Primer apellido"
                                value={contact.lastName}
                                onChange={handleChange}
                            />
                            {errors.lastName && contact.lastName === "" && (
                                <p className="text-red-500 text-sm">
                                    {errors.lastName}
                                </p>
                            )}
                        </div>
                    </di>
                    <di className="flex gap-2">
                        <div className="w-full">
                            <label className="dark:text-white" htmlFor="email">
                                Email
                            </label>
                            <Input
                            className="dark:text-white"
                                type={"email"}
                                name="email"
                                id="email"
                                placeholder="Email"
                                value={contact.email}
                                onChange={handleChange}
                            />
                            {errors.email && contact.email === "" && (
                                <p className="text-red-500 text-sm">
                                    {errors.email}
                                </p>
                            )}
                        </div>
                    </di>
                    <div>
                        <label className="dark:text-white" htmlFor="message">
                            Mensaje
                        </label>
                        <Textarea
                            className="dark:text-white"
                            name="message"
                            id="message"
                            placeholder={`Saludos, estoy interesado en el apartamento con referencia ${property.reference}. Quiero recibir más información, ¡gracias!`}
                            value={contact.message}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex justify-center items-center gap-2">
                        <ButtonPrimary>
                            {loading ? (
                                <div className="flex gap-2 items-center">
                                    <SpinnerButton /> "Enviando
                                </div>
                            ) : (
                                "Contáctame"
                            )}
                        </ButtonPrimary>
                        <ButtonSecondary
                            type="button"
                            onClick={() => setIsOpen(false)}
                        >
                            Cancelar
                        </ButtonSecondary>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default FormContactMe;
