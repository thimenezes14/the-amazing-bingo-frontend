import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Board from "./Board";
import { Player } from "../interfaces/Player";
import { generatePlayer } from "../services/player";
import { Badge, Button, Col, Form, Row } from "react-bootstrap";
import { generateNumberRange, getIndex } from "../services/numbers";
import playAudio from "../services/tts";

const RegisterPlayerForm: React.FC<{
  playerNumber: number;
  playerName: string;
  onSubmitEvt: React.FormEventHandler<HTMLFormElement>;
  onChangeEvt: React.ChangeEventHandler<HTMLInputElement>;
}> = ({ playerNumber, playerName, onSubmitEvt, onChangeEvt }) => {
  return (
    <>
      <p>Adicione o jogador {playerNumber}:</p>
      <Form onSubmit={onSubmitEvt}>
        <Form.Control
          className="m-4"
          name="name"
          id="name"
          value={playerName}
          onChange={onChangeEvt}
        />
        <Button type="submit" variant="success">
          Adicionar Jogador
        </Button>
      </Form>
    </>
  );
};

const Game = () => {
  const navigate = useNavigate();

  const [players, setPlayers] = useState<Array<Player>>([]);
  const [playerName, setPlayerName] = useState<string>("");

  const [numbersList, setNumbersList] = useState<number[]>([]);
  const [pickedNumbers, setPickedNumbers] = useState<number[]>([]);

  useEffect(() => setNumbersList(generateNumberRange()), []);

  const handlePlayerData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPlayerName(value);
  };

  const addPlayer = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPlayers((players) => {
      const newPlayer = generatePlayer(playerName);
      if (newPlayer !== null) return [...players, newPlayer];
      return players;
    });
    setPlayerName("");
  };

  const handlePickNumber = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const selectedIndex: number = getIndex(pickedNumbers.length);
    const pickedNumber = numbersList[selectedIndex];
    playAudio(`Atenção, o número sorteado é: ${pickedNumber.toString()}`);
    setTimeout(() => {
      setPickedNumbers(pn => {
        if(pn.includes(pickedNumber)) return pn;
        return [...pn, pickedNumber].sort((a, b) => a - b);
      })
      setNumbersList(nl => {
        return nl.filter(n => n !== pickedNumber);
      })
    }, 3500)
  };

  return (
    <>
      <h1>BINGO</h1>
      <Button variant="info" onClick={() => navigate("/")}>
        Voltar
      </Button>
      <br />
      {players.length < 2 && (
        <RegisterPlayerForm
          playerNumber={players.length + 1}
          playerName={playerName}
          onChangeEvt={handlePlayerData}
          onSubmitEvt={addPlayer}
        />
      )}
      {players.length == 2 && (
        <>
          <Board pickedNumbers={pickedNumbers} players={players} />
          <Row>
            {pickedNumbers.map((n) => (
              <Col className="col-auto p-0 m-2" key={`picked-${n}`}>
                <Badge className="bg-success p-2">{n}</Badge>
              </Col>
            ))}
          </Row>
          <Button variant="success" onClick={handlePickNumber}>
            Sortear Número
          </Button>
        </>
      )}
    </>
  );
};

export default Game;
