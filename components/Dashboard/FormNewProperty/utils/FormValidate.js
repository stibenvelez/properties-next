export const formValidate = async (data) => {
    let errors = {};

    if (!data.reference && data.reference === "") {
        errors.reference = "El campo referencia es obligatorio";
    }
    if (!data.title && data.title === "") {
        errors.title = "El campo titulo es obligatorio";
    }
    if (!data.offer && data.offer === "") {
        errors.offer = "El campo tipo de oferta es obligatorio";
    }
    if (!data.propertyType && data.propertyType === "") {
        errors.propertyType = "El campo tipo de propiedad es obligatorio";
    }
    if (!data.price && data.price === "") {
        errors.price = "El campo precio es obligatorio";
    }
    if (data.price <= 0) {
        errors.price = "El valor desde ser superior a cero";
    }
    if (!data.departament && data.departament === "") {
        errors.departament = "El campo departamento es obligatorio";
    }
    if (!data.city && data.city === "") {
        errors.city = "El campo ciudad es obligatorio";
    }
    if (!data.bedrooms && data.bedrooms === "") {
        errors.bedrooms = "El campo habitaciones es obligatorio";
    }
    if (!data.bathrooms && data.bathrooms === "") {
        errors.bathrooms = "El campo baños es obligatorio";
    }
    if (!data.area && data.area === "") {
        errors.area = "El campo area es obligatorio";
    }
    if (!data.contactName && data.contactName === "") {
        errors.contactName = "El campo nombre es obligatorio";
    }
    if (!data.contactCellphone && data.contactCellphone === "") {
        errors.contactCellphone = "El campo celular es obligatorio";
    }
    if (
        (!data.latitude && data.latitude === "") ||
        (!data.longitude && data.longitude === "")
    ) {
        errors.latitude = "El campo latitud es obligatorio";
        errors.longitude = "El campo latitud es obligatorio";
    }

    return errors;
};
