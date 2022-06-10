import {
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Stack,
    Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { editUserNote } from "../redux/actions";
import { AppDispatch } from "../redux/store";
import { Note } from "../types/Note";

type FormData = {
    title: string;
    description: string;
};
function EditNote({
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
    const { register, setValue, handleSubmit, reset } = useForm<FormData>();
    const [errors, setErrors] = useState({
        title: { error: false, msg: "" },
        description: { error: false, msg: "" },
    });
    const dispatch = useDispatch<AppDispatch>();

    const onSubmit = handleSubmit((data) => {
        if (
            data.title.length > 2 &&
            data.title.length < 16 &&
            data.description.length > 7 &&
            data.description.length < 201
        ) {
            dispatch(
                editUserNote(note.id, userId, data.title, data.description)
            );
            onClose();
        }
    });

    async function handleChange(
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) {
        if (e.target.name === "title") {
            if (e.target.value.length < 3 || e.target.value.length > 15) {
                await setErrors({
                    ...errors,
                    title: {
                        error: true,
                        msg: "Title must be between 3 and 15 characters",
                    },
                });
            } else
                await setErrors({
                    ...errors,
                    title: { error: false, msg: "" },
                });
        } else if (e.target.name === "description") {
            if (e.target.value.length < 8 || e.target.value.length > 200) {
                await setErrors({
                    ...errors,
                    description: {
                        error: true,
                        msg: "Description must be between 8 and 200 characters",
                    },
                });
            } else
                await setErrors({
                    ...errors,
                    description: { error: false, msg: "" },
                });
        }
    }

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={() => {
                    onClose();
                    setErrors({
                        title: { error: true, msg: "" },
                        description: { error: true, msg: "" },
                    });
                    reset();
                }}
            >
                <ModalOverlay />
                <ModalContent fontFamily={"raleway"}>
                    <ModalHeader>Edit Note</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={onSubmit}>
                            <FormControl>
                                <FormLabel htmlFor="title" fontWeight={"bold"}>
                                    Note Title
                                </FormLabel>
                                <Input
                                    autoFocus
                                    {...register("title", { required: true })}
                                    borderColor={"blackAlpha.400"}
                                    id="title"
                                    type="text"
                                    maxLength={15}
                                    minLength={3}
                                    isRequired
                                    onChange={(e) => handleChange(e)}
                                    defaultValue={note.title}
                                />
                                {errors.title.error ? (
                                    <FormHelperText color={"red"}>
                                        {errors.title.msg}
                                    </FormHelperText>
                                ) : (
                                    <FormHelperText>
                                        This will be the note title
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl mt={"1rem"}>
                                <FormLabel
                                    htmlFor="description"
                                    fontWeight={"bold"}
                                >
                                    Note Description
                                </FormLabel>
                                <Textarea
                                    borderColor={"blackAlpha.400"}
                                    id="description"
                                    isRequired
                                    {...register("description", {
                                        required: true,
                                    })}
                                    maxLength={200}
                                    minLength={8}
                                    onChange={(e) => handleChange(e)}
                                    defaultValue={note.description}
                                />
                                {errors.description.error ? (
                                    <FormHelperText color={"red"}>
                                        {errors.description.msg}
                                    </FormHelperText>
                                ) : (
                                    <FormHelperText>
                                        This will be the note title
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <Stack
                                flexDir={"row"}
                                w={"100%"}
                                justifyContent={"flex-end"}
                                mt={"2rem"}
                                mb={"1rem"}
                            >
                                <Button
                                    colorScheme="red"
                                    variant={"outline"}
                                    mr={3}
                                    onClick={onClose}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type={"submit"}
                                    colorScheme={"green"}
                                    m={"0 !important"}
                                    disabled={
                                        errors.title.error ||
                                        errors.description.error
                                    }
                                >
                                    Save
                                </Button>
                            </Stack>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default EditNote;
