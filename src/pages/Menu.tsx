import { useNavigate } from 'react-router-dom';

const Menu = () => {

  const navigate = useNavigate();

  return (
    <>
      <h1>Menu</h1>
      <button onClick={() => navigate("/game")}>Ir para jogo</button>
    </>
  )
}

export default Menu;