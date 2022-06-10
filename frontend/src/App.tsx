import "./App.css";
import { Stack } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Landing from "./components/Landing";
import Home from "./components/Home";

function App() {
    return (
        <Stack fontFamily={"raleway"} fontWeight={"bold"}>
            <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="/home" element={<Home />} /> */}
            </Routes>
        </Stack>
    );
}

export default App;
