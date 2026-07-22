import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export async function generarPDF(reporteRef){

    const canvas = await html2canvas(reporteRef.current,{
        scale:2
    });

    const img = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p","mm","a4");

    const ancho=190;
    const alto=(canvas.height*ancho)/canvas.width;

    pdf.addImage(img,"PNG",10,10,ancho,alto);

    pdf.save("Reporte_FitoLente.pdf");

}