const cors = require('cors');
const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
require('dotenv').config();
const { Parser } = require('json2csv');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const path = require('path');
const { CRM, Campaign } = require('./models');
const { sendEmail } = require('./emailService'); // Import the email service

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors()); // Enable CORS for all origins (modify as needed)
app.use(express.json());

// Existing CRM Data Route
app.get('/api/crm-data', async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    const crmData = response.data.map(item => ({
      ...item,
      fullName: `${item.name} (${item.username})`
    }));

    await CRM.insertMany(crmData);
    res.json(crmData);

    // Email condition
    if (crmData.length > 2) {
      console.log('Sending email notification...');
      await sendEmail(
        'jahnavisai1234@gmail.com',
        'CRM Data Alert',
        'More than 2 CRM records fetched.'
      );
      console.log('Email notification sent.');
    }
  } catch (error) {
    console.error('Error fetching CRM data:', error.message);
    res.status(500).json({ message: 'Failed to fetch CRM data', error });
  }
});

// Test Email Route
app.get('/api/test-email', async (req, res) => {
  try {
    await sendEmail('jahnavisai1234@gmail.com', 'Test Email', 'This is a test email.');
    res.send('Test email sent.');
  } catch (error) {
    console.error('Error sending test email:', error.message);
    res.status(500).json({ message: 'Failed to send test email.' });
  }
});

// Existing Campaign Data Route
app.get('/api/campaign-data', async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const campaignData = response.data.map(item => ({
      ...item,
      shortTitle: item.title.slice(0, 15) + '...'
    }));

    await Campaign.insertMany(campaignData);
    res.json(campaignData);
  } catch (error) {
    console.error('Error fetching Campaign data:', error.message);
    res.status(500).json({ message: 'Failed to fetch Campaign data', error });
  }
});

// Route to Generate CSV Report
app.get('/api/report/csv', async (req, res) => {
  try {
    const data = await CRM.find();
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(data);

    fs.writeFileSync('crm_report.csv', csv);
    res.download('crm_report.csv');
  } catch (error) {
    console.error('Error generating CSV report:', error);
    res.status(500).json({ message: 'Failed to generate CSV report' });
  }
});

// Route to Generate PDF Report
app.get('/api/report/pdf', async (req, res) => {
  try {
    const data = await CRM.find();
    const pdfPath = path.join(__dirname, 'crm_report.pdf');

    const doc = new PDFDocument();
    const writeStream = fs.createWriteStream(pdfPath);

    doc.pipe(writeStream);

    data.forEach(item => {
      doc.text(`Name: ${item.name}, Email: ${item.email}`);
    });

    doc.end();

    writeStream.on('finish', () => {
      res.download(pdfPath, 'crm_report.pdf', (err) => {
        if (err) {
          console.error('Error downloading PDF:', err);
        }
        fs.unlink(pdfPath, (err) => {
          if (err) {
            console.error('Error deleting PDF file:', err);
          }
        });
      });
    });

    writeStream.on('error', (err) => {
      console.error('Error writing PDF:', err);
      res.status(500).json({ message: 'Failed to generate PDF report' });
    });
  } catch (error) {
    console.error('Error generating PDF report:', error);
    res.status(500).json({ message: 'Failed to generate PDF report' });
  }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'frontend-ezy/build')));

// Catch-all handler for React routing (needs to be the last route)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend-ezy/build/index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
