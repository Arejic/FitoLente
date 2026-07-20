import * as tf from "@tensorflow/tfjs";

let modelo = null;
let clases = [];

/* ============================
   CARGAR MODELO
============================ */

export async function cargarModelo() {

  if(modelo !== null){
    return modelo;
  }

  console.log("Cargando modelo...");

  try {

    modelo = await tf.loadGraphModel(
      "/modelo_web/model.json"
    );

    console.log("Modelo cargado correctamente");

    console.log(
      "Entradas:",
      modelo.inputs
    );

    console.log(
      "Salidas:",
      modelo.outputs
    );


    return modelo;


  } catch(error){

    console.error(
      "Error cargando modelo:",
      error
    );

    throw error;

  }

}

/* ============================
   CARGAR CLASES
============================ */

export async function cargarClases() {

  if (clases.length > 0) {
    return clases;
  }

  const respuesta = await fetch("/class_names.json");

  clases = await respuesta.json();

  console.log("Clases:", clases);

  return clases;
}

/* ============================
   ANALIZAR IMAGEN
============================ */

export async function analizarImagen(imgHTML) {

  const modelo = await cargarModelo();

  const clases = await cargarClases();

  let tensor = tf.browser
    .fromPixels(imgHTML)
    .resizeBilinear([224, 224])
    .toFloat()
    .div(255.0)
    .expandDims();

  // GraphModel
  let salida = await modelo.executeAsync(tensor);

  // Algunos modelos regresan un arreglo
  if (Array.isArray(salida)) {
    salida = salida[0];
  }

  const datos = await salida.data();

  let indice = 0;

  let mayor = datos[0];

  for (let i = 1; i < datos.length; i++) {

    if (datos[i] > mayor) {

      mayor = datos[i];

      indice = i;

    }

  }

  tf.dispose(tensor);
  tf.dispose(salida);

  return {

    clase: clases[indice],

    confianza: (mayor * 100).toFixed(2),

    indice,

    probabilidades: [...datos]

  };

}