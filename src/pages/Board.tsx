import { Card, Row, Col, Container } from "react-bootstrap";
import { Player } from "../interfaces/Player";
import { hasWon } from "../services/game";

const Board: React.FC<{ pickedNumbers: number[], players: Player[] }> = ({ pickedNumbers, players }) => {
  return (
    <Container fluid>
      <Row>
        {players.map((player) => (
          <Col className="m-2" key={`player-${player.id}`}>
            <p>{player.name}</p>
            <Card className="m-2" style={{width: '25rem'}}>
              <Card.Header>
                <Row>
                  {player.card.map((_column, i) => {
                    const letter = "BINGO".charAt(i);
                    return (
                      <Col key={`header-${letter}`}>
                        <strong>{letter}</strong>
                      </Col>
                    );
                  })}
                </Row>
              </Card.Header>
              <Card.Body>
                <Row>
                  {player.card.map((column, i) => (
                    <Col key={`row-n-${i + 1}`}>
                      {column.map((num, j) => (
                        <Row key={`col-n-${j + 1}`}>
                          <Col className={`${pickedNumbers.includes(num) ? 'bg-warning fw-bold' : ''}`}>{num}</Col>
                        </Row>
                      ))}
                    </Col>
                  ))}
                </Row>
              </Card.Body>
              <Card.Footer>
              {
                hasWon(pickedNumbers, player.card) && <p>BINGO!!!</p>
              }
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Board;
