

const validateFormContactme = async (values) => {
    const errors = {};
    if (!values.firstName && values.firstName === "") {
        errors.firstName = "Ingrese un primer nombre";
    }
    if (!values.lastName && values.lastName === "") {
        errors.lastName = "Ingrese un apellido";
    }
    if (!values.email && values.email === "0") {
        errors.email = "Ingrese un email";
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
        errors.email = "Ingrese un email válido";
    }

    return errors;
};
    
export default validateFormContactme;