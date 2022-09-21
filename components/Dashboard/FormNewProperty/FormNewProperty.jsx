import { useEffect, useMemo, useState, useRef } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Label from "shared/Label";
import Input from "shared/Input";
import Select from "shared/Select/Select";
import Checkbox from "shared/Checkbox/Checkbox";
import { INITIAL_STATE_NEW_PROPERTY, NEW_PROPERTY_MOCK } from "./utils";
import GoogleMapReact from "google-map-react";
import LocationMarker from "components/AnyReactComponent/LocationMarker";
import { formValidate } from "./utils/FormValidate";
import { CheckIcon, TrashIcon } from "@heroicons/react/solid";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { createPropertyAdapter } from "adapters/property.adapter";
import Textarea from "shared/Textarea/Textarea";
import { useRouter } from "next/router";
import { GET_CITIES, GET_DEPARTAMENTS } from "graphql/queries/cities";
import { gql, useMutation, useQuery } from "@apollo/client";
import { CREATE_PROPERTY } from "graphql/queries/properties";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SpinnerButton from "shared/SpinnerButton/SpinnerButton";

const FormNewProperty = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [newProperty, setNewProperty] = useState(NEW_PROPERTY_MOCK);
    const [errors, setErrors] = useState({});
    const [departaments, setDepartaments] = useState([]);
    const [cities, setCities] = useState([]);
    const inputFilesRef = useRef();

    const { data, loading, error } = useQuery(GET_CITIES);
    const { getCities } = data || [];

    const { data: dataDepartaments, loading: loadingDepartament } =
        useQuery(GET_DEPARTAMENTS);
    const { getDepartaments } = dataDepartaments || [];

    const [mutationProperty, { loading: loadingCreateProperty }] = useMutation(
        CREATE_PROPERTY,
        {
            onCompleted: () => {
                toast.success("Propiedad creada", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            },
        }
    );

    const handleOnChange = (data) => {
        setNewProperty({
            ...newProperty,
            [data.name]: data.value,
        });
    };

    const handleImages = (e) => {
        const { files } = e.target;
        /*
        const imagesAray = [];
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            file.id = Math.random().toString(36);
            imagesAray.push(file);
        }
       
        const limitImages = newProperty.images.concat(imagesAray).slice(0, 6);
        console.log({limitImages});
        */
  
        setNewProperty({
            ...newProperty,
            images: files,
        });
    };

    useEffect(() => {
        //console.log("fetch departament", getDepartaments);
    }, [dataDepartaments]);

    useEffect(() => {
        let filteredCities =
            getCities?.filter(
                (city) => city.idDepartament === newProperty.departament * 1
            ) || [];
        setCities(filteredCities);
    }, [newProperty.departament, getCities]);

    useEffect(() => {
        if (newProperty.images.length === 0) {
            inputFilesRef.current.value = "";
        }
    }, [newProperty.images]);

    const handleDeleteImage = (item) => {
        const newArrayImages = newProperty.images.filter(
            (file) => file.id !== item.id
        );
        setNewProperty({
            ...newProperty,
            images: newArrayImages,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await formValidate(newProperty);
        if (Object.keys(result).length > 0) {
            setErrors(result);
            Swal.fire({
                icon: "error",
                title: "Faltan campos por llenar",
                text: "Verifique que todos los campos obligatorios se encuentren diligenciados",
            });
            return;
        }
        setErrors({});

        mutationProperty({
            context: {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            },
            variables: {
                input: createPropertyAdapter(newProperty),
                file: newProperty.images[0],
            },
        });
        
        //setNewProperty(INITIAL_STATE_NEW_PROPERTY);
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="flex flex-col md:flex-row">
                <div className="flex-grow w-full mt-10 space-y-6 md:mt-0">
                    <h3>Información del inmueble</h3>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <div className="w-full">
                            <Label>
                                Title <span className="text-red-500"> *</span>
                            </Label>
                            <Input
                                className="mt-1.5"
                                value={newProperty.title}
                                name="title"
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            />
                            {errors.title && newProperty.title === "" && (
                                <p className="py-1 text-sm text-red-500">
                                    {errors.title}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
                        <div className="w-full">
                            <Label>
                                Tipo de oferta{" "}
                                <span className="text-red-500"> *</span>
                            </Label>
                            <Select
                                className="mt-1.5"
                                value={newProperty.offer}
                                name="offer"
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            >
                                <option value="">Seleccione una opción</option>
                                <option value="1">Venta</option>
                                <option value="2">Arriendo</option>
                            </Select>
                            {errors.offer && newProperty.offer === "" && (
                                <p className="py-1 text-sm text-red-500">
                                    {errors.offer}
                                </p>
                            )}
                        </div>
                        <div className="w-full">
                            <Label>
                                Tipo de inmueble{" "}
                                <span className="text-red-500"> *</span>
                            </Label>
                            <Select
                                className="mt-1.5"
                                value={newProperty.propertyType}
                                name="propertyType"
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            >
                                <option hidden value="">
                                    {" "}
                                    Seleccione
                                </option>
                                <option value="1">Casa</option>
                                <option value="2">Apartamento</option>
                                <option value="3">Oficina</option>
                                <option value="4">Lote</option>
                            </Select>
                            {errors.propertyType &&
                                newProperty.propertyType === "" && (
                                    <p className="py-1 text-sm text-red-500">
                                        {errors.propertyType}
                                    </p>
                                )}
                        </div>
                        <div className="w-full">
                            <Label>
                                Valor <span className="text-red-500"> *</span>
                            </Label>
                            <Input
                                className="mt-1.5"
                                type="number"
                                placeholder="$ 0"
                                value={newProperty.price}
                                min="0"
                                name="price"
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            />
                            {errors.price &&
                                (newProperty.price === "" ||
                                    newProperty.price === 0) && (
                                    <p className="py-1 text-sm text-red-500">
                                        {errors.price}
                                    </p>
                                )}
                        </div>
                        <div className="w-full">
                            <Label>Descuento</Label>
                            <Input
                                className="mt-1.5"
                                type="number"
                                placeholder="$ 0"
                                value={newProperty.saleOff}
                                name="saleOff"
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                        <div className="w-full">
                            <Label>
                                Departamento{" "}
                                <span className="text-red-500"> *</span>
                            </Label>
                            <Select
                                className="mt-1.5"
                                value={newProperty.departament}
                                name="departament"
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                                loading={loadingDepartament}
                            >
                                <option hidden value="">
                                    Seleccione un departamento
                                </option>
                                {getDepartaments &&
                                    getDepartaments.map((departament) => (
                                        <option
                                            key={departament.idDepartament}
                                            value={departament.idDepartament}
                                        >
                                            {departament.departament}
                                        </option>
                                    ))}
                            </Select>
                            {errors.departament &&
                                newProperty.departament === "" && (
                                    <p className="py-1 text-sm text-red-500">
                                        {errors.departament}
                                    </p>
                                )}
                        </div>
                        <div className="w-full">
                            <Label>
                                Ciudad <span className="text-red-500"> *</span>
                            </Label>
                            <Select
                                className="mt-1.5"
                                value={newProperty.city}
                                name="city"
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                                disabled={
                                    newProperty.departament === ""
                                        ? true
                                        : false
                                }
                            >
                                <option hidden value="">
                                    Seleccione un aciudad
                                </option>
                                {cities &&
                                    cities.map((city) => (
                                        <option
                                            key={city.cityId}
                                            value={city.cityId}
                                        >
                                            {city.city}
                                        </option>
                                    ))}
                            </Select>
                            {errors.city && newProperty.city === "" && (
                                <p className="py-1 text-sm text-red-500">
                                    {errors.city}
                                </p>
                            )}
                        </div>
                        <div className="w-full">
                            <Label>Barrio</Label>
                            <Input
                                className="mt-1.5"
                                placeholder="barrio donde esta ubicado el inmuble"
                                name="neighborhood"
                                value={newProperty.neighborhood}
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <div className="w-full">
                            <Label>Direccion</Label>
                            <Input
                                className="mt-1.5"
                                placeholder="direccion del inmuble"
                                name="address"
                                value={newProperty.address}
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className="w-full">
                            <Label>Edificio</Label>
                            <Input
                                className="mt-1.5"
                                placeholder="direccion del inmuble"
                                name="building"
                                value={newProperty.building}
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
                        <div className="w-full">
                            <Label>
                                Area (m²){" "}
                                <span className="text-red-500"> *</span>
                            </Label>
                            <Input
                                className="mt-1.5"
                                type="number"
                                placeholder="area del inmuble"
                                name="area"
                                min="0"
                                value={newProperty.area}
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            />
                            {errors.area &&
                                (newProperty.area === "" ||
                                    newProperty.area === 0) && (
                                    <p className="py-1 text-sm text-red-500">
                                        {errors.area}
                                    </p>
                                )}
                        </div>
                        <div className="w-full">
                            <Label>estrato</Label>
                            <Select
                                className="mt-1.5"
                                value={newProperty.stratum}
                                name="stratum"
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            >
                                <option hidden value="">
                                    ninguno
                                </option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                            </Select>
                        </div>
                        <div className="w-full">
                            <Label>Antiguedad</Label>
                            <Input
                                className="mt-1.5"
                                type="number"
                                placeholder="antiguedad del inmuble"
                                name="antiquityYears"
                                value={newProperty.antiquityYears}
                                min="0"
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="w-full">
                            <Label>Remodelaciones</Label>
                            <Input
                                className="mt-1.5"
                                type="number"
                                placeholder="remodelaciones del inmuble"
                                name="remodelation"
                                value={newProperty.remodelation}
                                min="0"
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="w-full">
                            <Label>Administración</Label>
                            <Input
                                className="mt-1.5"
                                type="number"
                                placeholder="$ 0000"
                                name="lastAdminprice"
                                value={newProperty.lastAdminprice}
                                min="0"
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 md:grid-cols-2">
                        <div className="w-full">
                            <Label>
                                Habitaciones{" "}
                                <span className="text-red-500"> *</span>
                            </Label>
                            <Input
                                className="mt-1.5"
                                type="number"
                                placeholder="habitaciones del inmuble"
                                name="bedrooms"
                                value={newProperty.bedrooms}
                                min="0"
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            />
                            {errors.bedrooms &&
                                (newProperty.bedrooms === "" ||
                                    newProperty.bedrooms === 0) && (
                                    <p className="py-1 text-sm text-red-500">
                                        {errors.bedrooms}
                                    </p>
                                )}
                        </div>
                        <div className="w-full">
                            <Label>
                                Baños <span className="text-red-500"> *</span>
                            </Label>
                            <Input
                                className="mt-1.5"
                                type="number"
                                name="bathrooms"
                                value={newProperty.bathrooms}
                                min="0"
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            />
                            {errors.bathrooms &&
                                newProperty.bathrooms === "" && (
                                    <p className="py-1 text-sm text-red-500">
                                        {errors.bathrooms}
                                    </p>
                                )}
                        </div>
                        <div className="w-full">
                            <Label>Piso</Label>
                            <Input
                                className="mt-1.5"
                                type="number"
                                name="numFloor"
                                value={newProperty.numFloor}
                                min="0"
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="w-full">
                            <Label>Asensores</Label>
                            <Input
                                className="mt-1.5"
                                type="number"
                                name="numElevators"
                                value={newProperty.numElevators}
                                min="0"
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <div className="w-full">
                            <Label>Garage</Label>
                            <Select
                                className="mt-1.5"
                                value={newProperty.garage}
                                name="garage"
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            >
                                <option value="0">no</option>
                                <option value="1">sí</option>
                            </Select>
                        </div>
                        <div className="w-full">
                            <Label>Parqueadero</Label>
                            <Select
                                className="mt-1.5"
                                value={newProperty.parking}
                                name="parking"
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            >
                                <option value="0">no</option>
                                <option value="1">sí</option>
                            </Select>
                        </div>
                    </div>

                    <h3>Informacion de contacto</h3>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <div className="w-full">
                            <Label>
                                Nombre del contacto{" "}
                                <span className="text-red-500"> *</span>
                            </Label>
                            <Input
                                className="mt-1.5"
                                type="text"
                                placeholder="nombre del contacto"
                                name="contactName"
                                value={newProperty.contactName}
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            />
                            {errors.contactName &&
                                (newProperty.contactName === "" ||
                                    newProperty.contactName === 0) && (
                                    <p className="py-1 text-sm text-red-500">
                                        {errors.contactName}
                                    </p>
                                )}
                        </div>
                        <div className="w-full">
                            <Label>Email</Label>
                            <Input
                                className="mt-1.5"
                                type="contactEmail"
                                placeholder="ejemplo@correo.com"
                                name="contactEmail"
                                value={newProperty.contactEmail}
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <div className="w-full">
                            <Label>
                                Celular <span className="text-red-500"> *</span>
                            </Label>
                            <Input
                                className="mt-1.5"
                                type="text"
                                placeholder="000 000 0000"
                                name="contactCellphone"
                                value={newProperty.contactCellphone}
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            />
                            {errors.contactCellphone &&
                                newProperty.contactCellphone === "" && (
                                    <p className="py-1 text-sm text-red-500">
                                        {errors.contactCellphone}
                                    </p>
                                )}
                        </div>
                        <div className="w-full">
                            <Label htmlFor="contactPhone">telefono fijo</Label>
                            <Input
                                id="contactPhone"
                                className="mt-1.5"
                                type="text"
                                placeholder="60 0 000  0000"
                                name="contactPhone"
                                value={newProperty.contactPhone}
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div>
                        <Label id="stateId">
                            {newProperty.published
                                ? "Publicado"
                                : "Publicar inmuble"}
                        </Label>

                        <Select
                            className="lg:w-1/5"
                            value={newProperty.stateId}
                            name="stateId"
                            onChange={(e) =>
                                handleOnChange({
                                    name: e.target.name,
                                    value: e.target.value,
                                })
                            }
                        >
                            <option value={0}>Sin publicar</option>
                            <option value={1}>Publicado</option>
                            <option value={2}>Desactivado</option>
                        </Select>
                    </div>
                    <div>
                        <Label id="description">Descripción</Label>
                        <Textarea
                            className="mt-1.5"
                            name="description"
                            value={newProperty.description}
                            rows="4"
                            onChange={(e) =>
                                handleOnChange({
                                    name: e.target.name,
                                    value: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div>
                        <h3>Hubicación</h3>
                        <div className="aspect-w-5 aspect-h-5 sm:aspect-h-3">
                            <div className="overflow-hidden rounded-xl">
                                <GoogleMapReact
                                    bootstrapURLKeys={{
                                        key: "AIzaSyDkDFnRyELEsM8J-lfKlKEq0zc0HQZzkaU",
                                    }}
                                    yesIWantToUseGoogleMapApiInternals
                                    defaultZoom={15}
                                    defaultCenter={{
                                        lat: newProperty.latitude,
                                        lng: newProperty.longitude,
                                    }}
                                    onClick={(e) => {
                                        setNewProperty({
                                            ...newProperty,
                                            latitude: e.lat,
                                            longitude: e.lng,
                                        });
                                    }}
                                >
                                    <LocationMarker
                                        draggable={true}
                                        lat={newProperty.latitude}
                                        lng={newProperty.longitude}
                                    />
                                </GoogleMapReact>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3>Imagenes</h3>
                        <p className="text-sm text-gray-400">
                            Aqui puedes subir las imagenes del inmueble. Puedes
                            cargar hasta 6 imagenes
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 py-4 lg:justify-start">
                            {/* {newProperty.images &&
                                newProperty.images.map((file, index) => (
                                    <div
                                        key={index}
                                        className="relative overflow-hidden bg-gray-200 rounded shadow w-44 h-28"
                                    >
                                        <button
                                            onClick={() =>
                                                handleDeleteImage(file)
                                            }
                                            type="button"
                                            className="absolute p-1 rounded-full bottom-1 right-1 text-gray-50 bg-gray-100/70 hover:bg-red-100/80 hover:text-red-400 "
                                        >
                                            <TrashIcon className="w-4 h-4" />
                                        </button>
                                        <img
                                            className="object-contain object-center"
                                            src={URL.createObjectURL(file)}
                                        />
                                    </div>
                                ))} */}
                        </div>
                        <div className="border-gray-200 boder">
                            {newProperty.images &&
                                newProperty.images.length < 6 && (
                                    <label className="block">
                                        <span className="sr-only">
                                            Choose File
                                        </span>
                                        <input
                                            multiple
                                            type="file"
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-700 file:text-white hover:file:bg-slate-600 hover:file:text-white focus:outline-none focus:shadow-outline hover:file:cursor-pointer"
                                            aria-describedby="user_avatar_help"
                                            id="user_avatar"
                                            name="images"
                                            onChange={handleImages}
                                            ref={inputFilesRef}
                                        />
                                    </label>
                                )}
                            <div className="py-2">
                                {/* {newProperty.images &&
                                    newProperty.images.map((file, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center"
                                        >
                                            <CheckIcon className="w-4 h-4 text-green-400" />
                                            <p className="text-sm text-gray-500">
                                                {file.name}
                                            </p>
                                        </div>
                                    ))} */}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                        <ButtonPrimary type="submit">
                            {loadingCreateProperty ? (
                                <div>
                                    <SpinnerButton /> <span>Cargando</span>
                                </div>
                            ) : (
                                "Registrar inmueble"
                            )}
                        </ButtonPrimary>
                        <ButtonSecondary
                            onClick={() => router.back()}
                            type="button"
                            className="text-white bg-gray-400"
                        >
                            Cancelar
                        </ButtonSecondary>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </form>
    );
};

export default FormNewProperty;
