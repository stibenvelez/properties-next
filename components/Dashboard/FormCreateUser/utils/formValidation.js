export const validateForm = async (newUser) => {
    let errors = {};
    if (newUser.firstName === "") errors.firstName = "El nombre es requerido";
    if (newUser.lastName === "") errors.lastname = "El apellido es requerido";
    if (newUser.email === "") errors.email = "El email es requerido";
    if (newUser.password === "") errors.password = "La contraseña es requerida";
    if (newUser.passwordConfirm === "")
        errors.passwordConfirm =
            "La confirmación de la contraseña es requerida";
    if (newUser.password !== newUser.passwordConfirm)
        errors.passwordConfirm = "Las contraseñas no coinciden";
    if (newUser.idRole !== newUser.idRole)
        errors.idRole = "El rol es requerido";
    return errors;
};
