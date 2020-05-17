import Board from "./Board";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Play() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const { id } = useParams();
  useEffect(() => {
    if (socket === null) {
      const newSocket = new WebSocket("ws://localhost:9000/game");
      newSocket.onopen = () => {
        newSocket.send(
          JSON.stringify({
            type: "matchmaking",
          })
        );
        newSocket.onmessage = (message) => {
          console.log(message);
        };
      };
      setSocket(newSocket);
    } else if (socket !== null) {
      socket.close();
      setSocket(null);
    }
    return () => {
      if (socket !== null) {
        socket.close();
      }
    };
  }, [socket]);

  return (
    <>
      <h1 className="title">Your game {id}</h1>
      <Board rows={19} columns={19} coords={true} />
    </>
  );
}

export default Play;
