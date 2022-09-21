import React, { FC, useState } from "react";
import ButtonCircle from "../../shared/Button/ButtonCircle";
import rightImg from "/PR_Monochromatic.svg";
import NcImage from "../../public/images/NcImage";
import Badge from "../../shared/Badge";
import Input from "../../shared/Input";
import clientAxios from "../../config/axios";
import Swal from "sweetalert2";
import SpinnerButton from "../../shared/SpinnerButton/SpinnerButton";

export interface SectionSubscribe2Props {
    className?: string;
}

const INITIAL_STATE_EMAIL = {
    email: "",
    value: "",
};
const SectionSubscribe2: FC<SectionSubscribe2Props> = ({ className = "" }) => {
    const [email, setEmail] = useState<{ [key: string]: string }>(
        INITIAL_STATE_EMAIL
    );
  const [error, setError] = useState<string | undefined | false>(false);
  const [loading, setLoading] = useState<boolean>(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail({
            email: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

      try {
          setLoading(true);
            await clientAxios.post("/suscriptions", email);
            setError(false);
            Swal.fire(
                "Te has suscrito!",
                "Tu suscipcion se ha procesado con exito. Ahora disfrutaras de las mejores actualizaciones",
                "success"
            );
        setEmail(INITIAL_STATE_EMAIL);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
            setError(error.response.data);
        }
    };

    return (
        <div
            className={`nc-SectionSubscribe2 relative flex flex-col lg:flex-row lg:items-center ${className}`}
            data-nc-id="SectionSubscribe2"
        >
            <div className="flex-shrink-0 mb-10 lg:mb-0 lg:mr-10 lg:w-2/5">
                <h2 className="text-4xl font-semibold">
                    Recibe actualizaciones 🎉
                </h2>
                <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
                    Puedes estar tranquilo, nostros te enviaremos las ultimas
                    actualziaciones y notificaciones del inmueble que estas
                    buscando.
                </span>
                <form
                    className="relative max-w-sm mt-10"
                    onSubmit={handleSubmit}
                >
                    <Input
                        required
                        aria-required
                        placeholder="Ingresa tu Email"
                        type="email"
                        autoComplete="email"
                        name="email"
                        onChange={handleChange}
                        value={email.email}
                    />
                    <ButtonCircle
                        type="submit"
                        className="absolute transform -translate-y-1/2 top-1/2 right-1"
                    >
                        {loading ? (
                            <SpinnerButton />
                        ) : (
                            <i className="text-xl las la-arrow-right"></i>
                        )}
                    </ButtonCircle>
                </form>
                <p className="text-red-500 text-xs py-2">{error}</p>
            </div>
            <div className="flex-grow">
                <NcImage src={"/images/PR_Monochromatic.svg"} />
            </div>
        </div>
    );
};

export default SectionSubscribe2;
