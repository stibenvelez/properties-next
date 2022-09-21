import clientAxios from "./axios";

const tokenAuth = () => {
    const token = localStorage.getItem("token");

    if (!token) {
        delete clientAxios.defaults.headers.common["Authorization"];
        return;
    }

    clientAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export default tokenAuth;
