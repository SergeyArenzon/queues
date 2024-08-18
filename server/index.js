const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());

const corsOptions = {
  origin: '*',  // Allow all origins
  methods: ['GET', 'POST'],  // Allow specific HTTP methods
  allowedHeaders: ['Content-Type'],  // Allow specific headers
  credentials: true,  // Allow cookies or other credentials
};

app.use(cors(corsOptions));

const queues = {}; // Object to store queues by name

// Route to get a list of all queues with the number of messages in each queue
app.get('/api/queues', (req, res) => {
  const queueData = Object.keys(queues).map((queueName) => ({
    name: queueName,
    messageCount: queues[queueName].length
  }));
  res.json(queueData);  // Return the list of queue names with message count
});

// POST /api/{queue_name} - Add a message to the queue
app.post('/api/:queue_name', (req, res) => {
  const { queue_name } = req.params;
  const message = req.body;

  if (!queues[queue_name]) {
    queues[queue_name] = [];
  }

  queues[queue_name].push(message);
  res.status(201).send({ message: 'Message added to the queue' });
});

// GET /api/{queue_name}?timeout={ms} - Get the next message from the queue
app.get('/api/:queue_name', (req, res) => {
  const { queue_name } = req.params;
  const timeout = parseInt(req.query.timeout) || 10000; // Default timeout to 10 seconds

  if (!queues[queue_name] || queues[queue_name].length === 0) {
    // If no message is available, return 204 No Content
    return res.sendStatus(204);
  }

  const message = queues[queue_name].shift();
  res.status(200).json(message);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
