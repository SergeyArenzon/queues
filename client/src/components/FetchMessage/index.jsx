// src/components/FetchMessage.jsx
import  { useState } from 'react';

function FetchMessage() {
  const [queueName, setQueueName] = useState('');
  const [timeout, setTimeoutValue] = useState(10000); // Default 10 seconds
  const [message, setMessage] = useState(null);

  const handleFetch = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/${queueName}?timeout=${timeout}`);
      if (response.ok) {
        const data = await response.json();
        setMessage(data);
      } else if (response.status === 204) {
        alert('No message in the queue');
      } else {
        alert('Failed to fetch message');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Fetch Message</h2>
      <input
        type="text"
        placeholder="Queue Name"
        value={queueName}
        onChange={(e) => setQueueName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Timeout (ms)"
        value={timeout}
        onChange={(e) => setTimeoutValue(e.target.value)}
        required
      />
      <button onClick={handleFetch}>Fetch Message</button>
      {message && <div><strong>Message:</strong> {JSON.stringify(message)}</div>}
    </div>
  );
}

export default FetchMessage;
