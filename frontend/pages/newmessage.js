import { useEffect } from "react";
import { initializeEcho } from "../utils/echo";

const NewMessage = () => {
  useEffect(() => {
    const echo = initializeEcho();

    echo.channel("messages")
      .listen("NewMessageEvent", (data) => {
        console.log("Nova notificação recebida:", data);
      });

    return () => {
      echo.disconnect();
    };
  }, []);

  return <div>Ouça notificações em tempo real aqui!</div>;
};

export default NewMessage;
