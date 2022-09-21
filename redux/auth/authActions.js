
import { getCookie, getCookies } from "cookies-next";
import {
    setAuth,
    setAuthError,
    setAuthSuccess,
    setLogin,
    setLoginError,
    setLoginSuccess,
    setNotAuth,
    setSignOut,
    setSignOutError,
    setSignOutSucces,
} from ".";

export const authAction = () => {
    return async (dispatch) => {
        dispatch(setAuth());
        try {
            const config = {
                headers: {
                    "Content-Type   ": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            dispatch(setAuthSuccess(result.data));
        } catch (error) {
            dispatch(setAuthError());
        }
    };
};

export const loginAction = (user) => async (dispatch) => {
    dispatch(setLogin());
    try {
        dispatch(setLoginSuccess(data));
    } catch (error) {
        dispatch(setLoginError(error.response.data.msg));
    }
};

export const forgetPasswordAction = (email) => async (dispatch) => {
    try {
       await clientAxios.post("/users/forget-password", { email });
    } catch (error) {
        console.log(error);
    }
};

export const singOutAction = () => {
    return async (dispatch) => {
        dispatch(setSignOut());
        try {
            localStorage.removeItem("token");
            dispatch(setSignOutSucces());
        } catch (error) {
            dispatch(setSignOutError());
        }
    };
};
