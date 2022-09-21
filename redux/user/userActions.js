import clientAxios from "config/axios";
import {
    setCreateUser,
    setCreateUserError,
    setCreateUserSucces,
    setDeleteUser,
    setDeleteUserError,
    setDeleteUserSucces,
    setGetUser,
    setGetUserError,
    setGetUsers,
    setGetUsersError,
    setGetUsersSucces,
    setGetUserSucces,
    setReadUser,
    setUpdateUser,
    setUpdateUserError,
    setUpdateUserSucces,
} from ".";
import Swal from "sweetalert2";
import tokenAuth from "config/tokenAuth";

export const createUserAction = (user) => async (dispatch) => {
    dispatch(setCreateUser());
    try {
        await clientAxios.post("/users", user);
        dispatch(setCreateUserSucces());
        Swal.fire({
            title: "Usuario creado",
            text: "El usuario se ha creado con exito",
            icon: "success",
            confirmButtonText: "Ok",
        });
    } catch (error) {
        console.log(error);
        dispatch(setCreateUserError());
        Swal.fire({
            title: "Hubo un error",
            text: error.response.data.msg,
            icon: "error",
            confirmButtonText: "Ok",
        });
    }
};

export const getAllUsersAction = () => async (dispatch) => {
    dispatch(setGetUsers());
    try {
        tokenAuth()
        const response = await clientAxios.get("/users");
        dispatch(setGetUsersSucces(response.data));
    } catch (error) {
        console.log(error.response.data.msg);
        dispatch(setGetUsersError(error.response.data.msg));
    }
};

export const getUserAction = (id) => async (dispatch) => {
    dispatch(setGetUser());
    try {
        tokenAuth()
        const response = await clientAxios.get(`/users/getuser/${id}`);
        dispatch(setGetUserSucces(response.data));
    } catch (error) {
        console.log(error.response.data.msg);
        dispatch(setGetUserError(error.response.data.msg));
    }
}

export const updateUserAction = (user) => async (dispatch) => {
    dispatch(setUpdateUser());
    try {
        tokenAuth()
        const response = await clientAxios.put(`/users/${user.idUser}`, user);
        dispatch(setUpdateUserSucces(response.data));
        Swal.fire({
            title: "Usuario actualizado",
            text: "El usuario se ha actualizado con exito",
            icon: "success",
            confirmButtonText: "Ok",
        });
    } catch (error) {
        console.log(error.response.data.msg);
        dispatch(setUpdateUserError(error.response.data.msg));
        Swal.fire({
            title: "Hubo un error",
            text: error.response.data.msg,
            icon: "error",
            confirmButtonText: "Ok",
        });
    }
}

//DELETE USER (change state)
export const deleteUserAction = (id) => async (dispatch) => {
    dispatch(setDeleteUser());
    try {
        tokenAuth()
        const response = await clientAxios.put(`/users/delete/${id}`);
        dispatch(setDeleteUserSucces(response.data));
        Swal.fire({
            title: "Usuario eliminado",
            text: "El usuario se ha eliminado con exito",
            icon: "success",
            confirmButtonText: "Ok",
        });
    } catch (error) {
        console.log(error.response.data.msg);
        dispatch(setDeleteUserError(error.response.data.msg));
        Swal.fire({
            title: "Hubo un error",
            text: error.response.data.msg,
            icon: "error",
            confirmButtonText: "Ok",
        });
    }
}

export const readUserAction = (user) => async (dispatch) => {
    dispatch(setReadUser(user));
}
