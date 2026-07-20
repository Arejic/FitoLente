import { BrowserRouter, Routes, Route } from "react-router-dom";

import Inicio from "./pages/Inicio";
import MenuU from "./pages/Menu";
import Diagnostico from "./pages/Diagnostico";
import Resultado from "./pages/Resultado";
import Carga from "./pages/Carga";
import Prehistorial from "./pages/Prehistorial.jsx";


function App(){

  return (

    <BrowserRouter>

      <Routes>

        <Route 
          path="/" 
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
          path="/diagnostico" 
          element={<Diagnostico />}
        />

         <Route 
          path="/prehistorial" 
          element={<Prehistorial />}
        />
        

      </Routes>

    </BrowserRouter>

  );

}

export default App;