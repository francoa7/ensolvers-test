import {
    Button,
    CircularProgress,
    IconButton,
    Stack,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import {
    JSXElementConstructor,
    ReactElement,
    ReactFragment,
    ReactPortal,
    useEffect,
    useState,
} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { getUserFromDB, getUserNotes, postUser } from "../redux/actions";
import { AppDispatch, RootState } from "../redux/store";
import { MdOutlineNoteAdd } from "react-icons/md";
import AddNote from "./AddNote";
import Note from "./Note";
import { User } from "../types/User";
import { Note as typeNote } from "../types/Note";
import { MdOutlineArchive } from "react-icons/md";
import Landing from "./Landing";

function Home() {
    const { logout, user, isAuthenticated, isLoading } = useAuth0();
    const [archivedMode, setArchivedMode] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const userFromDb = useSelector<RootState, User>(
        (state) => state.currentUser
    );
    const userNotes = useSelector<RootState, Array<typeNote>>(
        (state) => state.currentUserNotes
    );
    const {
        isOpen: isAddNoteOpen,
        onOpen: onAddNoteOpen,
        onClose: onAddNoteClose,
    } = useDisclosure();

    useEffect(() => {
        !isLoading &&
            user?.email &&
            dispatch(getUserFromDB(user?.email)).then((res) => {
                if (res.payload.msg)
                    user.nickname &&
                        user.email &&
                        dispatch(postUser(user.nickname, user.email)).then(
                            (res) => dispatch(getUserNotes(res.payload))
                        );
                else dispatch(getUserNotes(res.payload));
            });
    }, [isLoading]);

    return (
        <Stack h={"100vh"} p={"3rem 6rem"}>
            {isAuthenticated && user ? (
                <>
                    <Stack
                        flexDirection={"row"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                    >
                        <Text textTransform={"uppercase"} letterSpacing={"2px"}>
                            {user?.nickname}
                        </Text>
                        {archivedMode ? (
                            <Text
                                mt={"0 !important"}
                                textTransform={"uppercase"}
                                color={"blackAlpha.700"}
                            >
                                Archived Notes
                            </Text>
                        ) : (
                            <Text
                                mt={"0 !important"}
                                textTransform={"uppercase"}
                                color={"blackAlpha.700"}
                            >
                                All Notes
                            </Text>
                        )}
                        <Stack flexDir={"row"}>
                            <IconButton
                                fontSize={"1.5rem"}
                                colorScheme={"green"}
                                variant={"ghost"}
                                borderRadius={"full"}
                                icon={<MdOutlineNoteAdd />}
                                aria-label="addnote"
                                onClick={onAddNoteOpen}
                            />
                            <AddNote
                                isOpen={isAddNoteOpen}
                                onClose={onAddNoteClose}
                                userId={userFromDb.id}
                            />

                            <IconButton
                                borderRadius={"full"}
                                fontSize={"1.5rem"}
                                colorScheme={"yellow"}
                                variant={"ghost"}
                                icon={<MdOutlineArchive />}
                                aria-label="togglearchived"
                                onClick={() => setArchivedMode(!archivedMode)}
                                mt={"0 !important"}
                            />
                            <Button
                                mt={"0 !important"}
                                w={"fit-content"}
                                onClick={() =>
                                    logout({ returnTo: window.location.origin })
                                }
                            >
                                Logout
                            </Button>
                        </Stack>
                    </Stack>
                    <Stack
                        flexDir={"row"}
                        w={"100%"}
                        justifyContent={"flex-start"}
                        alignItems={"flex-start"}
                        columnGap={"1rem"}
                        h={"100%"}
                        wrap={"wrap"}
                        rowGap={"1rem"}
                    >
                        {userNotes instanceof Array && userNotes.length ? (
                            <>
                                {userNotes.map((note) => {
                                    console.log(note.archived);
                                    if (archivedMode) {
                                        if (note.archived)
                                            return (
                                                <Note
                                                    key={note.id}
                                                    userId={userFromDb.id}
                                                    note={note}
                                                />
                                            );
                                    } else if (!note.archived)
                                        return (
                                            <Note
                                                key={note.id}
                                                userId={userFromDb.id}
                                                note={note}
                                            />
                                        );
                                })}
                            </>
                        ) : (
                            <Text>Nonotes</Text>
                        )}
                    </Stack>
                </>
            ) : (
                <Landing />
                //     <Stack
                //         w={"100%"}
                //         h={"100%"}
                //         alignItems={"center"}
                //         justifyContent={"center"}
                //     >
                //         <CircularProgress
                //             size={"10vw"}
                //             isIndeterminate
                //             color="green.300"
                //         />
                //     </Stack>
            )}
        </Stack>
    );
}

export default Home;
