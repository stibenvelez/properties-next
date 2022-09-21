import clientAxios from "../../config/axios";
import { setCities, setCitiesError, setCitiesSuccess } from ".";

export const fetchAllCitiesAction = () => async (dispatch) => {
    dispatch(setCities());
    try {
        const response = await clientAxios("/cities");
        dispatch(setCitiesSuccess(response.data));
    } catch (error) {
        console.log(error);
        dispatch(setCitiesError());
    }
};

export const fetchAllCitieswhitPropetiesAction =
    (categoryProperty) => async (dispatch) => {
        dispatch(setCities());
        try {
            const response = await clientAxios("/cities/whitpropeties", {
                params: {offer: categoryProperty},
            });
            dispatch(setCitiesSuccess(response.data));
        } catch (error) {
            console.log(error);
            dispatch(setCitiesError());
        }
    };
