const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());

const corsOptions = {
    origin: '*',  // Allow all origins (same as using app.use(cors()) without options)
    methods: ['GET', 'POST'],  // Allow specific HTTP methods
    allowedHeaders: ['Content-Type'],  // Allow specific headers
    credentials: true,  // Allow cookies or other credentials
  };
  
  app.use(cors(corsOptions));

// Other middleware and routes here



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
app.get('/api/:queue_name', async (req, res) => {
  const { queue_name } = req.params;
  const timeout = parseInt(req.query.timeout) || 10000;

  if (!queues[queue_name] || queues[queue_name].length === 0) {
    // Wait for the timeout or until a message is available
    
    const message = await waitForMessage(queue_name, timeout);
    if (message) {
      return res.status(200).json(message);
    } else {
      return res.sendStatus(204);
    }
  }

  const message = queues[queue_name].shift();
  res.status(200).json(message);
});

// Helper function to wait for a message with a timeout
const waitForMessage = (queue_name, timeout) => {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      if (queues[queue_name] && queues[queue_name].length > 0) {
        clearInterval(interval);
        resolve(queues[queue_name].shift());
      }
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      resolve(null);
    }, timeout);
  });
};

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
