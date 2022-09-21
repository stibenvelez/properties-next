import { useState } from "react";
import LocationInput from "./LocationInput";
import { FocusedInputShape } from "react-dates";
import moment from "moment";
import { FC } from "react";
import NeighborhoodInput from "./NeighborhoodInput";
import PropertyTypeSelect from "./PropertyTypeSelect";
import { useDispatch } from "react-redux";
import { setFilters } from "../../redux/properties";
import { useRouter } from "next/router";

export interface DateRage {
    startDate: moment.Moment | null;
    endDate: moment.Moment | null;
}

export interface StaySearchFormProps {
    haveDefaultValue?: boolean;
    stateForm?: string;
}

const STATE_FORM: any = {
    Venta: "venta",
    Arriendo: "arriendo",
};

const StaySearchForm: FC<StaySearchFormProps> = ({
    stateForm = "Venta",
}) => {
    const dispatch = useDispatch();
     const router = useRouter();
    const [searchValues, setSearchValues] = useState({
        city: "",
        neighborhood: "",
        propertyType: "",
        rangePrices: [0, 0],
    });

    const [dateFocused, setDateFocused] = useState<FocusedInputShape | null>(
        null
    );
    const [errors, setErrors] = useState([]);

    const validateSearchForm = async (values: any) => {
        const errors: any = [];
        if (values.city === "") {
            errors.push("Ingresar una ciudad")
        }
        if (values.propertyType === "") {
            errors.push("Ingresar un tipo de inmueble")
        }
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return errors;
        }
        setErrors(errors);
        return errors;
    };

    const handleSearch = async () => {

        const result = await validateSearchForm(searchValues);        
        if (result.length > 0) return false;
        dispatch(setFilters(searchValues));
        router.push(
            `/properties/${STATE_FORM[stateForm]}?city=${searchValues.city}&propertyType=${searchValues.propertyType}`
        );
        /*
        */
    };

    const handleChange = (item: any) => {
        setSearchValues({
            ...searchValues,
            [item.name]: item.value,
        });
    };

    const renderForm = () => {
        return (
            <>
                <form className="relative flex flex-col justify-between w-full p-2 mt-8 bg-white divide-y shadow-xl md:flex-row rounded-3xl lg:rounded-full dark:shadow-2xl dark:bg-neutral-800 divide-neutral-200 dark:divide-neutral-700 md:divide-y-0 ">
                    <LocationInput
                        defaultValue={searchValues?.city || ""}
                        onChange={(value: string) =>
                            handleChange({ name: "city", value: value })
                        }
                        onInputDone={() => setDateFocused("startDate")}
                    />

                    <NeighborhoodInput
                        defaultValue={searchValues.neighborhood}
                        onChange={(e) =>
                            handleChange({ name: "neighborhood", value: e })
                        }
                        onInputDone={() => setDateFocused("startDate")}
                    />
                    <PropertyTypeSelect
                        onChange={(e) =>
                            handleChange({
                                name: "propertyType",
                                value: e.target.value,
                            })
                        }
                        value={searchValues.propertyType}
                    />
                    {/* BUTTON SUBMIT OF FORM */}
                    <div className="flex items-center justify-center px-4 py-4 lg:py-0">
                        <button
                            type="button"
                            className="flex items-center justify-center w-full bg-indigo-600 rounded-full h-14 md:h-16 md:w-16 hover:bg-primary-700 text-neutral-50 focus:outline-none"
                            onClick={handleSearch}
                        >
                            <span className="mr-3 md:hidden">Buscar</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </button>
                    </div>
                </form>
                <div className="py-2">
                    {errors &&
                        errors.map((error: string, index: number) => (
                            <p key={index} className="text-sm text-red-500">
                                {error}
                            </p>
                        ))}
                </div>
            </>
        );
    };

    return renderForm();
};

export default StaySearchForm;
