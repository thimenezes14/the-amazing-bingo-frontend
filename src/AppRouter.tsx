import { Route, Routes, BrowserRouter } from "react-router-dom";
import Menu from "./pages/Menu";
import Game from "./pages/Game";


const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/game/" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;