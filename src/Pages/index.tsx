import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Chat from "./Chat";

export default function () {

    return (
        <BrowserRouter>
            <Routes>
                <Route index Component={Home} />
                <Route path={"chat"} Component={Chat} />
            </Routes>
        </BrowserRouter>
    )
}