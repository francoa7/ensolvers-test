import { IconButton, Stack, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import {
    MdOutlineModeEditOutline,
    MdDeleteOutline,
    MdOutlineArchive,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { archiveNote, deleteNote } from "../redux/actions";
import { AppDispatch, RootState } from "../redux/store";
import { User } from "../types/User";
import DeleteNote from "./DeleteNote";
import EditNote from "./EditNote";

function Note({ note, userId }: { note: any; userId: string }) {
    const dispatch = useDispatch<AppDispatch>();
    const userFromDb = useSelector<RootState, User>(
        (state) => state.currentUser
    );

    function callArchiveNote() {
        dispatch(archiveNote(note.id, userFromDb.id));
    }

    const {
        isOpen: isEditNoteOpen,
        onOpen: onEditNoteOpen,
        onClose: onEditNoteClose,
    } = useDisclosure();

    const {
        isOpen: isDeleteNoteOpen,
        onOpen: onDeleteNoteOpen,
        onClose: onDeleteNoteClose,
    } = useDisclosure();

    return (
        <Stack
            flexGrow={1}
            boxShadow={"md"}
            p={"2rem 2rem 1rem 2rem"}
            bg={note.archived ? "yellow.400" : "yellow.200"}
            borderRadius={"md"}
            mt={"0 !important"}
            w={"250px"}
            maxW={"300px"}
            h={"fit-content"}
        >
            <Text textTransform={"uppercase"}>{note.title}</Text>
            <Text fontWeight={200}>{note.description}</Text>
            <Stack
                mt={"2rem !important"}
                flexDir={"row"}
                w={"100%"}
                justifyContent={"center"}
                columnGap={"1rem"}
            >
                <IconButton
                    colorScheme={"blue"}
                    _hover={{ bg: "#F0E784" }}
                    variant={"ghost"}
                    fontSize={"1.5rem"}
                    icon={<MdOutlineModeEditOutline />}
                    aria-label="editnote"
                    borderRadius={"full"}
                    onClick={onEditNoteOpen}
                />
                <IconButton
                    colorScheme={"blackAlpha"}
                    variant={"ghost"}
                    fontSize={"1.5rem"}
                    icon={<MdOutlineArchive />}
                    mt={"0 !important"}
                    aria-label="editnote"
                    borderRadius={"full"}
                    onClick={callArchiveNote}
                />
                <IconButton
                    _hover={{ bg: "#F0E784" }}
                    colorScheme={"red"}
                    variant={"ghost"}
                    fontSize={"1.5rem"}
                    icon={<MdDeleteOutline />}
                    aria-label="deletenote"
                    mt={"0 !important"}
                    borderRadius={"full"}
                    onClick={onDeleteNoteOpen}
                />
            </Stack>
            <EditNote
                isOpen={isEditNoteOpen}
                onClose={onEditNoteClose}
                userId={userId}
                note={note}
            />
            <DeleteNote
                isOpen={isDeleteNoteOpen}
                onClose={onDeleteNoteClose}
                userId={userId}
                note={note}
            />
        </Stack>
    );
}

export default Note;
