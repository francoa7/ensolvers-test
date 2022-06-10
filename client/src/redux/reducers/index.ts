import { Note } from "../../types/Note";
import { User } from "../../types/User";
import {
    ARCHIVE_NOTE,
    DELETE_NOTE,
    EDIT_NOTE,
    GET_USER_FROMDB,
    GET_USER_NOTES,
    POST_USER,
    POST_USER_NOTE,
} from "../actions/action-types";

const currentUser: User = {
    id: "",
    username: "",
    email: "",
    password: "",
    createdAt: "",
    updatedAt: "",
};

const currentUserNotes: Array<Note> = [];

const initialState = {
    currentUser,
    currentUserNotes,
};

export default function reducer(
    state = initialState,
    { type, payload }: { type: string; payload: any }
) {
    switch (type) {
        case GET_USER_FROMDB:
            return {
                ...state,
                currentUser: payload,
            };
        case GET_USER_NOTES:
            return {
                ...state,
                currentUserNotes: payload,
            };
        case POST_USER_NOTE:
            return {
                ...state,
                currentUserNotes: state.currentUserNotes.concat(payload),
            };
        case DELETE_NOTE:
            return {
                ...state,
                currentUserNotes: state.currentUserNotes.filter(
                    (note) => note.id !== payload.id
                ),
            };
        case EDIT_NOTE:
            return {
                ...state,
                currentUserNotes: state.currentUserNotes.map((note) => {
                    if (note.id === payload.id) {
                        note = {
                            ...note,
                            title: payload.title,
                            description: payload.description,
                        };
                    }
                    return note;
                }),
            };
        case POST_USER:
            return { ...state, currentUser: payload };

        case ARCHIVE_NOTE:
            return {
                ...state,
                currentUserNotes: state.currentUserNotes.map((note) => {
                    if (note.id === payload.id) {
                        note = {
                            ...note,
                            archived: payload.archived,
                        };
                    }
                    return note;
                }),
            };
        default:
            return state;
    }
}
