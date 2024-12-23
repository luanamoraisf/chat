import { useEffect } from "react";
import { initializeEcho } from "../utils/echo";

const NewMessage = () => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const echo = initializeEcho();

    echo.channel("messages")
      .listen("NewMessage", (data) => {
        console.log("Nova mensagem recebida:", data);
        setMessages((prevMessages)=> [...prevMessages, data]);
      });

    return () => {
      echo.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Mensagens em tempo real:</h1>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{JSON.stringify(msg)}</li>
        ))}
      </ul>
    </div>
  );
};

export default NewMessage;
