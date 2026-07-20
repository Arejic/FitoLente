import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Carga() {

  const navigate = useNavigate();

  const inputFoto = useRef(null);

  const [imagen, setImagen] = useState("/images/logo.png");
  const [archivo, setArchivo] = useState(null);

  // Abrir cámara o galería
  function seleccionarImagen() {

    inputFoto.current.click();

  }

  // Mostrar vista previa
  function cargarImagen(event) {

    const file = event.target.files[0];

    if (!file) return;

    setArchivo(file);

    const url = URL.createObjectURL(file);

    setImagen(url);

  }

  // Enviar imagen a Diagnóstico
  function irDiagnostico() {

    if (!archivo) {

      alert("Seleccione una imagen.");

      return;

    }

    navigate("/diagnostico", {

      state: {

        archivo

      }

    });

  }

  return (

    <div className="mobile-container">

      <header className="header">

        <h1>FitoLente</h1>

      </header>

      <main className="content">

        <div
          className="image-rounded-container"
          onClick={seleccionarImagen}
        >

          <img
            src={imagen}
            alt="Vista previa"
          />

        </div>

        <input

          ref={inputFoto}

          type="file"

          accept="image/*"

          capture="environment"

          style={{ display: "none" }}

          onChange={cargarImagen}

        />

        <div className="button-row">

          <button
            className="btn"
            onClick={() => navigate("/menu")}
          >
            Regresar
          </button>

          <button
            className="btn"
            onClick={irDiagnostico}
          >
            Diagnosticar
          </button>

        </div>

      </main>

      <div className="footer-bar"></div>

    </div>

  );

}

export default Carga;