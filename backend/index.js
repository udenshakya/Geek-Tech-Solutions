import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { processOrder } from './orderProcessor.js';

const app = express();
app.use(cors());

const port = 5000;

app.use(bodyParser.json());

// POST endpoint to handle placing orders
app.post('/api/place-order', async (req, res) => {
  try {
    // retrieving the selected items from the request body
    const selectedItems = req.body.selectedItems;
    // process the order using the processOrder function, and sends back the resulting packages as JSON
    const packages = processOrder(selectedItems);
    res.json({ packages });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ error: 'An error occurred while placing the order.' });
  }
});

// For testing
app.get("/", async (req, res) => {
  res.send("hello world!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
