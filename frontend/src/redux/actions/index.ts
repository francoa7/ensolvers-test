import axios from "axios";
import {
    ARCHIVE_NOTE,
    DELETE_NOTE,
    EDIT_NOTE,
    GET_USER_FROMDB,
    GET_USER_NOTES,
    POST_USER,
    POST_USER_NOTE,
} from "./action-types";

export function getUserFromDB(email: string) {
    return function (dispatch: (arg0: { type: string; payload: any }) => any) {
        return axios.get(`/users/${email}`).then((res) =>
            dispatch({
                type: GET_USER_FROMDB,
                payload: res.data,
            })
        );
    };
}

export function getUserNotes(user: any) {
    return function (dispatch: (arg0: { type: string; payload: any }) => any) {
        return axios
            .get(`/notes/usernotes/${user.id}`)
            .then((res) =>
                dispatch({
                    type: GET_USER_NOTES,
                    payload: res.data,
                })
            );
    };
}

export function postUserNote(
    userId: string,
    title: string,
    description: string
) {
    return function (dispatch: (arg0: { type: string; payload: any }) => any) {
        return axios
            .post(`/notes`, {
                userId,
                title,
                description,
            })
            .then((res) => {
                console.log(res);
                return dispatch({
                    type: POST_USER_NOTE,
                    payload: res.data,
                });
            });
    };
}

export function deleteNote(noteId: string, userId: string) {
    return function (dispatch: (arg0: { type: string; payload: any }) => any) {
        return axios
            .delete(`/notes/${noteId}`, {
                data: { userId },
            })
            .then((res) => {
                return dispatch({
                    type: DELETE_NOTE,
                    payload: res.data.deleted,
                });
            });
    };
}

export function editUserNote(
    noteId: string,
    userId: string,
    title: string,
    description: string
) {
    return function (dispatch: (arg0: { type: string; payload: any }) => any) {
        return axios
            .put(`/notes/${noteId}`, {
                userId,
                title,
                description,
            })
            .then((res) => {
                return dispatch({
                    type: EDIT_NOTE,
                    payload: res.data,
                });
            });
    };
}

export function postUser(username: string | undefined, email: string) {
    return function (dispatch: (arg0: { type: string; payload: any }) => any) {
        return axios
            .post(`/users`, {
                username,
                email,
            })
            .then((res) => {
                return dispatch({
                    type: POST_USER,
                    payload: res.data.createdUser,
                });
            });
    };
}

export function archiveNote(noteId: string, userId: string) {
    return function (dispatch: (arg0: { type: string; payload: any }) => any) {
        return axios
            .put(`/notes/${noteId}`, {
                type: "archive",
                userId,
            })
            .then((res) => {
                console.log(res);
                return dispatch({
                    type: ARCHIVE_NOTE,
                    payload: res.data,
                });
            });
    };
}
