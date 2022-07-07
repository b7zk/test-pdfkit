const fs = require("fs");

const filePDF = require("./examplePDF");

const registros = require("./registros.json");

for (const registro of registros) {
  const doc = new filePDF({
    layout: "landscape",
  });

  // Pipe the PDF into a patient file
  doc.pipe(fs.createWriteStream(`clients/registro-${registro.folio}.pdf`));

  // Add the header - https://pspdfkit.com/blog/2019/generate-invoices-pdfkit-node/
  doc
    .image("./assets/logo.png", 50, 45, { width: 50 })
    .fillColor("#444444")
    .fontSize(20)
    .text("Registro de mediciones ZKG EA888", 110, 57)
    .fontSize(10)
    .text("Lorem ipsum xxxxxxxxxx ", 200, 65, { align: "right" })
    .text(
      "Lorem ipsum dolor sit amet consectetur adipisicing elit..",
      200,
      80,
      { align: "right" }
    )
    .text("XXXXXXXXXXXXXXX", 100, 95, { align: "left" })
    .text(
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe.........",
      100,
      110,
      { align: "left" }
    )
    .moveDown();

  // Create the table - https://www.andronio.me/2017/09/02/pdfkit-tables/
  const table = {
    headers: [
      "SEMANA",
      "FOLIO",
      "FECHA",
      "TURNO",
      "OPERACION",
      "MAQUINA",
      "HUSILLO",
      "EQUIPO CMM-MAHR-MFK",
      "METROLOGO",
      "ESTATUS",
      "MOTIVO",
      "OBSERVACIONES",
      "FOLIO CORRECION",
    ],
    rows: [
      [
        registro.semana,
        registro.folio,
        registro.fecha,
        registro.turno,
        registro.operacion,
        registro.maquina,
        registro.husillo,
        registro.equipo,
        registro.metrolog,
        registro.estatus,
        registro.motivo,
        registro.observaciones,
        registro.correccion,
      ],
    ],
  };

  // Draw the table
  doc.moveDown().table(table, 10, 125, { width: 590 });

  // Finalize the PDF and end the stream
  doc.end();
}
