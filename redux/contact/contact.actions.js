import clientAxios from "../../config/axios";
import tokenAuth from "../../config/tokenAuth";
import Swal from "sweetalert2";
import {
    resetIsSent,
    setContactMe,
    setContactMeError,
    setContactMeSucces,
    setCreateContactManagement,
    setCreateContactManagementError,
    setCreateContactManagementSuccess,
    setDiscardContact,
    setDiscardContactError,
    setDiscardContactSuccess,
    setGetToContact,
    setGetToContactError,
    setGetToContactList,
    setGetToContactListError,
    setGetToContactListSuccess,
    setGetToContactSuccess,
    setResetError,
} from ".";
export const resetError = () => (dispatch) => {
    dispatch(setResetError());
};
export const contactMeAction = (contact) => async (dispatch) => {
    dispatch(setContactMe());
    try {
        tokenAuth()
        const response = await clientAxios.post(`/contact/contactme`, contact);
        dispatch(setContactMeSucces(response.data));
        Swal.fire({
            title: "¡Registro exitoso!",
            text: "Los datos se han registrado con exito",
            icon: "success",
        });
        setTimeout(() => {
            dispatch(resetIsSent());
        }, 1000);
    } catch (error) {
        console.log(error);
        dispatch(setContactMeError());
    }
};

export const getAllToContactAction = () => async (dispatch) => {
    dispatch(setGetToContactList());
    try {
        tokenAuth()
        const response = await clientAxios.get(`/contact/to-contact`);
        dispatch(setGetToContactListSuccess(response.data));
    } catch (error) {
        console.log(error);
        dispatch(setGetToContactListError());
    }
};

export const getToContactAction = (id) => async (dispatch) => {
    dispatch(setGetToContact());
    try {
        tokenAuth()
        const response = await clientAxios.get(`/contact/to-contact/${id}`);
        dispatch(setGetToContactSuccess(response.data));
    } catch (error) {
        console.log(error);
        dispatch(setGetToContactError(error.response.data.msg));
    }
};

export const createContactManagementAction = (contact) => async (dispatch) => {
    dispatch(setCreateContactManagement());
    try {
        tokenAuth()
        const response = await clientAxios.post(
            `/contact/contact-management`,
            contact

        );
        dispatch(setCreateContactManagementSuccess(response.data));
        Swal.fire({
            title: "¡Registro exitoso!",
            text: "Los datos se han registrado con exito",
            icon: "success",
        });
        dispatch(getToContactAction(contact.id));
    } catch (error) {
        console.log(error);
        dispatch(setCreateContactManagementError(error.response.data.msg));
    }
};

export const discartContactAction = (id) => async (dispatch) => {
    dispatch(setDiscardContact());
    try {
        tokenAuth()
        await clientAxios.post(
            `/contact/discard/${id}`,
            {}
        );
        dispatch(setGetToContactListSuccess());
        Swal.fire({
            title: "Se descarto el contacto",
            text: "El contacto se ha descartado con exito",
            icon: "success",
        });
        dispatch(setDiscardContactSuccess());
    } catch (error) {
        console.log(error);
        dispatch(setDiscardContactError(error.response.data.msg));
        setTimeout(() => {
            dispatch(setResetError());
        }, 1000);
    }
};
