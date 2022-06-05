import { Route, Routes } from "react-router-dom";
import Sign from "./components/Sign";
import Login from "./components/Login";
import "./App.css";
import Index from "./components";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Index />}></Route>
        <Route path="/sign" element={<Sign />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
