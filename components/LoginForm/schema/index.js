import * as yup from "yup";

const schema = yup
    .object({
        email: yup
            .string()
            .email("Ingrese un email valido")
            .max(255)
            .required("Ingrese un email"),
        password: yup.string().required("Ingrese la contraseña"),
    })
    .required();


export default schema;