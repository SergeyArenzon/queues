// src/App.jsx
import React, { useEffect, useState } from 'react';
import './App.css';  // Custom styling
import Queue from './Queue';
import Message from './Message';

function App() {
  const [queues, setQueues] = useState([]);
  const [selectedQueue, setSelectedQueue] = useState('');
  const [message, setMessage] = useState(null);

  // Fetch queues from the API
  useEffect(() => {
    const fetchQueues = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/queues');
        const queuesData = await response.json();
        setQueues(queuesData);
      } catch (error) {
        console.error('Error fetching queues:', error);
      }
    };

    fetchQueues();
  }, []);

  const handleFetchMessage = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/${selectedQueue}`);
      if (response.ok) {
        const messageData = await response.json();
        setMessage(messageData);

        // Update the queue count directly
        setQueues((prevQueues) => 
          prevQueues.map((queue) => 
            queue.name === selectedQueue ? { ...queue, messageCount: queue.messageCount - 1 } : queue
          )
        );
      } else {
        setMessage('No message available');
      }
    } catch (error) {
      console.error('Error fetching message:', error);
    }
  };

  
  return (
    <div className="container">
      <header className="header">
        <h1>Queue Management</h1>
      </header>
      <main>
        <section className="queue-list">
          <h2>Available Queues</h2>
          <ul>
            {queues.map((queue) => <Queue key={queue.name} queue={queue} onClick={(name) => setSelectedQueue(name)}/>)}
          </ul>
        </section>
        {selectedQueue && (
          <section className="selected-queue">
            <h2>Selected Queue: {selectedQueue}</h2>
            <button className='btn' onClick={handleFetchMessage}>Go</button>
            {message && <Message message={message}/>}
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
