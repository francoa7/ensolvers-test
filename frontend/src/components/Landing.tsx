import { Button, Link, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Landing() {
    const { loginWithRedirect } = useAuth0();
    return (
        <Stack
            alignItems={"center"}
            justifyContent={"center"}
            h={"100vh"}
            p={"5rem"}
            mt={"0 !important"}
        >
            <Text fontSize={"1.5rem"}>Start creating your notes!</Text>
            <Button
                borderRadius={"full"}
                p={"1.5rem 1.5rem"}
                mt={"2rem !important"}
                w={"fit-content"}
                colorScheme={"green"}
                variant={"outline"}
                border={"2px"}
                onClick={() => loginWithRedirect()}
                fontSize={"2rem"}
            >
                Login
            </Button>
        </Stack>
    );
}

export default Landing;
