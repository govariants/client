import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

function Home() {
  const [searching, setSearching] = useState(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [gameReady, setGameReady] = useState<{
    game_id: string;
    auth_token: string;
  } | null>(null);
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined = undefined;
    if (searching && socket === null) {
      const newSocket = new WebSocket("ws://localhost:9000/matchmaking");
      newSocket.onopen = () => {
        timeoutId = setInterval(
          () => newSocket.send(JSON.stringify({ type: "ping" })),
          10000
        );
        newSocket.send(
          JSON.stringify({
            type: "searching",
          })
        );
        newSocket.onmessage = (message) => {
          const payload = JSON.parse(message.data);
          if (payload.type === "game_created") {
            setGameReady({
              game_id: payload.game_id,
              auth_token: payload.auth_token,
            });
          }
        };
      };
      setSocket(newSocket);
    } else if (!searching && socket !== null) {
      if (timeoutId !== undefined) {
        clearInterval(timeoutId);
      }
      socket.close();
      setSocket(null);
    }
    return () => {
      if (timeoutId !== undefined) {
        clearInterval(timeoutId);
      }
      if (socket !== null) {
        socket.close();
      }
    };
  }, [searching, socket]);

  function toggleSearch() {
    setSearching(!searching);
  }

  if (gameReady !== null) {
    return (
      <Redirect
        push
        to={{
          pathname: `/play/${gameReady.game_id}`,
          state: { auth_token: gameReady.auth_token },
        }}
      />
    );
  }

  return (
    <>
      <h1 className="title">Welcome!</h1>
      <p>Use the matchmaking and play a random opponent :)</p>
      <Button block={true} variant="primary" size="lg" onClick={toggleSearch}>
        {searching ? (
          <>
            <Spinner animation="grow" size="sm" variant="light" /> Searching for
            a game
          </>
        ) : (
          "Find a game"
        )}
      </Button>
    </>
  );
}

export default Home;
