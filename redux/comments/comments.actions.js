import clientAxios from "../../config/axios";
import Swal from "sweetalert2";
import { setCreateNewComment, setCreateNewCommentError, setCreateNewCommentSuccess, setGetCommentsByProperty, setGetCommentsByPropertyError, setGetCommentsByPropertySuccess } from ".";


export const getCommentsByPropertyAction =  (propertyId) => async dispatch => {
    dispatch(setGetCommentsByProperty());
    try {
        const response = await clientAxios.get(`/comments/${propertyId}`);
        dispatch(setGetCommentsByPropertySuccess(response.data));
    } catch (error) {
        console.log(error);
        dispatch(setGetCommentsByPropertyError(error.response.data.msg));
    }
}

export const createNewCommentAction = (comment) => async (dispatch) => {
    dispatch(setCreateNewComment());
    try {
        await clientAxios.post(`/comments`, comment);
        Swal.fire({
            icon: "success",
            title: "Comentario registrado",
            text: "Se ha registrado el comentario correctamente",
        });
        dispatch(setCreateNewCommentSuccess());
        dispatch(getCommentsByPropertyAction(comment.propertyId));
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Hubo un error",
            text: error.response.data.msg,
        });
        dispatch(setCreateNewCommentError());
        console.log(error);
    }
};
