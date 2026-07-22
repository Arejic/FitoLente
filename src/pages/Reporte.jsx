import { useLocation } from "react-router-dom";

function Reporte(){

    const location = useLocation();

    const { imagen, resultado } = location.state;

}