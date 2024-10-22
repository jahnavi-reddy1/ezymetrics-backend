# EzyMetrics

EzyMetrics is a personal finance management application designed to help users manage their CRM and campaign data efficiently. This application allows users to fetch, download, and visualize CRM and campaign data seamlessly.

## Features

- Fetch and manage CRM data
- Fetch and manage campaign data
- Download CRM data in CSV and PDF formats
- Email notifications for data alerts
- Responsive design for efficient user interaction

## Technologies Used

- **Frontend:** React.js, HTML, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Others:** Axios, JSON2CSV, PDFKit, CORS

## Installation

To run the application locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ezyMetrics.git
   ```
2. Navigate to the project directory:
   ```bash
   cd ezyMetrics
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Set up your environment variables in a `.env` file:
   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=3000
   ```
5. Run the application:
   ```bash
   npm start
   ```

## Usage

- Navigate to `http://localhost:3000` in your browser.
- Use the provided buttons to fetch CRM and campaign data.
- Download reports in CSV and PDF formats as needed.

## API Endpoints

- **GET** `/api/crm-data` - Fetches CRM data.
- **GET** `/api/campaign-data` - Fetches campaign data.
- **GET** `/api/report/csv` - Downloads CRM data in CSV format.
- **GET** `/api/report/pdf` - Downloads CRM data in PDF format.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue if you have suggestions for improvements.


### Notes:
- Replace placeholders like `your_pass` and `your-email@gmail.com` with your actual email and password.
