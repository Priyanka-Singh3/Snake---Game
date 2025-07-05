import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Arena from "./components/Arena";
import SnakeGame from "./components/SnakeGame";

export default function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Arena />} />
        <Route path="/snake" element={<SnakeGame />} />
      </Routes>
    </Router>
  );
}