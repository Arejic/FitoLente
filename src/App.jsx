/*
 * Proyecto: FitoLente
 * Autores:
 * Josue Arturo Juarez Rangel
 * Areli Jimenez Contreras
 * Juan Manuel Valerio Astorga
 *
 * Universidad Tecnológica de Tula-Tepeji
 */
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Inicio from "./pages/Inicio";
import MenuU from "./pages/Menu";
import Diagnostico from "./pages/Diagnostico";
import Carga from "./pages/Carga";
import Prehistorial from "./pages/Prehistorial.jsx";
import Reporte from "./pages/Reporte";
import Registro from "./pages/Registro";
import Log from "./pages/Login";

import RutaProtegida from "./components/RutaProtegida";


function App(){

  return (

    <BrowserRouter>

      <Routes>


        {/* RUTAS PUBLICAS */}

        <Route 
          path="/" 
          element={<Log/>}
        />


        <Route
          path="/registro"
          element={<Registro />}
        />


        {/* RUTAS PRIVADAS */}

        <Route element={<RutaProtegida/>}>


          <Route 
            path="/Inicio" 
            element={<Inicio />}
          />


          <Route 
            path="/menu" 
            element={<MenuU />}
          />


          <Route 
            path="/diagnostico" 
            element={<Diagnostico />}
          />


          <Route 
            path="/carga" 
            element={<Carga />}
          />


          <Route 
            path="/prehistorial" 
            element={<Prehistorial />}
          />


          <Route 
            path="/reporte" 
            element={<Reporte />}
          />


        </Route>


      </Routes>


    </BrowserRouter>

  );

}

export default App;