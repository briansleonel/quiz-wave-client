import Container from "./Container";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";

export default function LayoutMain() {
    return (
        <>
            <Navbar />
            <Container>
                <Outlet />
            </Container>
        </>
    );
}
