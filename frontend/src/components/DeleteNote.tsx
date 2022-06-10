import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteNote } from "../redux/actions";
import { AppDispatch } from "../redux/store";
import { Note } from "../types/Note";

function DeleteNote({
    isOpen,
    onClose,
    userId,
    note,
}: {
    isOpen: boolean;
    onClose: () => void;
    userId: string;
    note: Note;
}) {
    const dispatch = useDispatch<AppDispatch>();

    function callDeleteNote() {
        dispatch(deleteNote(note.id, userId));
    }

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={() => {
                    onClose();
                }}
            >
                <ModalOverlay />
                <ModalContent fontFamily={"raleway"}>
                    <ModalHeader>Delete Note</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Are you sure you want to delete this note?</Text>
                        <Stack
                            flexDir={"row"}
                            w={"100%"}
                            justifyContent={"flex-end"}
                            mt={"2rem"}
                            mb={"1rem"}
                        >
                            <Button
                                colorScheme="green"
                                variant={"outline"}
                                mr={3}
                                onClick={onClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                type={"submit"}
                                colorScheme={"red"}
                                m={"0 !important"}
                                onClick={callDeleteNote}
                            >
                                Delete
                            </Button>
                        </Stack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default DeleteNote;
