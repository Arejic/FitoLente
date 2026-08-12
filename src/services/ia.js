/*
 * Proyecto: FitoLente
 * Autores:
 * Josue Arturo Juarez Rangel
 * Areli Jimenez Contreras
 * Juan Manuel Valerio Astorga
 *
 * Universidad Tecnológica de Tula-Tepeji
 */
import * as tf from "@tensorflow/tfjs";

let modelo = null;
let clases = [];

/* ============================
   CARGAR MODELO
============================ */

export async function cargarModelo() {

  // Si ya está cargado, reutilizarlo
  if (modelo !== null) {
    return modelo;
  }

  try {

    console.log("Cargando modelo...");

    modelo = await tf.loadGraphModel("/modelo_web/model.json");

    console.log("✅ Modelo cargado correctamente");

    console.log("Entradas:", modelo.inputs);
    console.log("Salidas:", modelo.outputs);

    return modelo;

  } catch (error) {

    console.error("❌ Error cargando el modelo:", error);
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

  try {

    const respuesta = await fetch("/class_names.json");

    if (!respuesta.ok) {
      throw new Error("No se pudo cargar class_names.json");
    }

    clases = await respuesta.json();

    console.log("Clases:", clases);

    return clases;

  } catch (error) {

    console.error("Error cargando clases:", error);
    throw error;

  }

}

/* ============================
   ANALIZAR IMAGEN
============================ */

export async function analizarImagen(imgHTML) {

  const modelo = await cargarModelo();
  const clases = await cargarClases();


  let tensor = tf.tidy(() => {

    let t = tf.browser
      .fromPixels(imgHTML)
      .resizeBilinear([224, 224])
      .toFloat();

    t = t.div(127.5).sub(1);

    return t.expandDims();

  });


  try {

    // Inferencia fuera de tidy
    let salida = await modelo.executeAsync(tensor);


    if (Array.isArray(salida)) {
      salida = salida[0];
    }


    const datos = salida.dataSync();


    console.log("Probabilidades:", datos);


    let indice = 0;
    let mayor = datos[0];


    for (let i = 1; i < datos.length; i++) {

      if (datos[i] > mayor) {

        mayor = datos[i];
        indice = i;

      }

    }


    const resultado = {

      clase: clases[indice] ?? "desconocido",

      confianza: Number((mayor * 100).toFixed(2)),

      indice,

      probabilidades: Array.from(datos)

    };


    salida.dispose();


    return resultado;


  } finally {

    // liberar tensor de entrada
    tensor.dispose();

  }

}