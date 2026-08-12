/*
 * Proyecto: FitoLente
 * Autores:
 * Josue Arturo Juarez Rangel
 * Areli Jimenez Contreras
 * Juan Manuel Valerio Astorga
 *
 * Universidad Tecnológica de Tula-Tepeji
 */
import html2pdf from "html2pdf.js";

export function generarPDF(reporteRef){

    const opciones = {

        margin: 10,

        filename: "Reporte_FitoLente.pdf",

        image: {
            type: "jpeg",
            quality: 1
        },

        html2canvas: {
            scale: 3,
            useCORS: true,
            backgroundColor: "#ffffff"
        },

        jsPDF: {
            unit: "mm",
            format: "a4",
            orientation: "portrait"
        },

        pagebreak: {
            mode: ["css", "legacy", "avoid-all"]
        }

    };

    html2pdf()

        .set(opciones)

        .from(reporteRef.current)

        .save();

}