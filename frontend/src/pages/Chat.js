import React, {useEffect, useRef, useState } from 'react';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputMsg, setInputMsg] = useState('');
  const socketRef = useRef(null);
  const [messageToUser, setMessageToUser] = useState("")
  const token = localStorage.getItem('access_token');
  const username = localStorage.getItem('username');
  

  useEffect(() => {
    if (!token || !username) {
      window.location.href = '/login'
      
      return;
    } //if user is not logged in they are redirected to login page

    // Connect WebSocket with token in query string
    const apiUrl = process.env.REACT_APP_WS_URL;
    const ws = new WebSocket(`${apiUrl}/chat/?token=${token}`);
    socketRef.current = ws;

    ws.onopen = () => {
      setMessageToUser("Connected")
    }

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      setMessages((prev) => [...prev, data]);
     
    };

    ws.onclose = () => {
      setMessageToUser("Disconnected")
    }

    return () => {
      ws.close();
    };
  }, [token, username]);

  const sendMessage = () => {
    if (inputMsg && socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({
        message: inputMsg,
        username: username,
      }));
      setInputMsg('');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Live Chat: {username}</h2>
      <p>Status: {messageToUser}</p>

      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div key={index} style={styles.message}>
            <p>{msg.username}: {msg.message}  </p>
          </div>
        ))}
      </div>
<br></br>
      <div style={styles.inputRow}>
        <input
          type="text"
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          placeholder="Message"
          style={styles.input}
        />
        <button onClick={sendMessage} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Send</button>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '2rem', fontFamily: 'Arial' },
  chatBox: {
    border: '1px solid',
   
    height: '300px',
    overflowY: 'scroll',
    marginBottom: '1px',
    background: '#F5F5F5       ',
  },
  message: { marginBottom: '1px' },
  inputRow: { display: 'flex' },
  input: { flex: 1, padding: '2px' },

};

export default ChatPage;
