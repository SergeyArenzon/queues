// src/components/AddMessage.jsx
import  { useState } from 'react';

function AddMessage() {
  const [queueName, setQueueName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/${queueName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      if (response.ok) {
        alert('Message added to the queue');
        setQueueName('');
        setMessage('');
      } else {
        alert('Failed to add message');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Add Message</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Queue Name"
          value={queueName}
          onChange={(e) => setQueueName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit">Add Message</button>
      </form>
    </div>
  );
}

export default AddMessage;
