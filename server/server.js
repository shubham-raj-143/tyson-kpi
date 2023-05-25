const express = require('express');
const nodemailer = require('nodemailer');
const fs = require('fs');
const pdfkit = require('pdfkit');
const exceljs = require('exceljs');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Generate PDF and Excel files from static table data and send them as attachments via email
app.post('/generate-and-send', async (req, res) => {
  const { recipientEmail, fileFormat } = req.body;

  try {
    // Read table data from JSON file
    const tableDataPath = path.join(__dirname, './table.json');
    const rawData = fs.readFileSync(tableDataPath);
    const tableData = JSON.parse(rawData);

    const tempDir = path.join(__dirname, 'temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    let attachmentPath, attachmentType;
    if (fileFormat === 'pdf') {
      // Generate PDF
      attachmentPath = path.join(tempDir, 'table.pdf');
      const pdfDoc = new pdfkit();
      pdfDoc.text('SAP Landscape Table\n\n');
      // pdfDoc.font('Helvetica-Bold');
      // pdfDoc.text('SAP Product', { continued: true, underline: true });
      // pdfDoc.text('\tSAP System ID', { continued: true, underline: true });
      // pdfDoc.text('\tSystem Description', { continued: true, underline: true });
      // pdfDoc.text('\tType', { continued: true, underline: true });
      // pdfDoc.text('\tEnvironment', {continued: true,  underline: true });
      // pdfDoc.text('\tDoes it run on a Hana database', { continued: true, underline: true });
      // pdfDoc.text('\tHANA', { underline: true });
      // pdfDoc.moveDown(0.5);

      // pdfDoc.font('Helvetica');
      tableData.forEach((row, index) => {
        pdfDoc.text(`${row.sap_prod}\t${row.sap_sys_id}\t${row.sys_desc}\t${row.Type}\t${row.Environment}\t${row.run_hana}\t${row.HANA}\n`);
        // pdfDoc.text(`${row.sap_prod}`, { continued: true });
        // pdfDoc.text('\t');
        // pdfDoc.text(`${row.sap_sys_id}`, { continued: true });
        // pdfDoc.text('\t');
        // pdfDoc.text(`${row.sys_desc}`, { continued: true });
        // pdfDoc.text('\t');
        // pdfDoc.text(`${row.Type}`, { continued: true });
        // pdfDoc.text('\t');
        // pdfDoc.text(`${row.Environment}`, { continued: true });
        // pdfDoc.text('\t');
        // pdfDoc.text(`${row.run_hana}`, { continued: true });
        // pdfDoc.text('\t');
        // pdfDoc.text(`${row.HANA}`);
        // Draw horizontal gridline
        // pdfDoc.moveTo(0, pdfDoc.y + 10)
        //   .lineTo(pdfDoc.page.width, pdfDoc.y + 10)
        //   .stroke();

        // // Move down to the next line
        // if (index !== tableData.length - 1) {
        //   pdfDoc.moveDown();
        // }
      });
      pdfDoc.pipe(fs.createWriteStream(attachmentPath));
      pdfDoc.end();
      attachmentType = 'application/pdf';
    } else if (fileFormat === 'excel') {
      // Generate Excel
      attachmentPath = path.join(tempDir, 'table.xlsx');
      const workbook = new exceljs.Workbook();
      const worksheet = workbook.addWorksheet('Sheet 1');
      worksheet.columns = [
        { header: 'SAP Product', key: 'sap_prod', width: 20 },
        { header: 'SAP System ID', key: 'sap_sys_id', width: 10 },
        { header: 'System Description', key: 'sys_desc', width: 30 },
        { header: 'Type', key: 'Type', width: 30 },
        { header: 'Environment', key: 'Environment', width: 30 },
        { header: 'Does it run on a Hana database', key: 'run_hana', width: 30 },
        { header: 'HANA', key: 'HANA', width: 30 },
      ];
      tableData.forEach((row) => {
        worksheet.addRow(row);
      });
      await workbook.xlsx.writeFile(attachmentPath);
      attachmentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    } else {
      throw new Error('Invalid file format');
    }

    // Send email with generated file as attachment
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: 'spsr7109@gmail.com',
        pass: 'ozlenukwwdvfqucn',
      },
    });

    const mailOptions = {
      from: 'spsr7109@gmail.com',
      to: recipientEmail,
      subject: 'Table Data',
      text: 'Please find the attached file with table data.',
      attachments: [
        {
          filename: `table.${fileFormat}`,
          path: attachmentPath,
          contentType: attachmentType,
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    // Delete temporary file
    fs.unlinkSync(attachmentPath);

    res.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

