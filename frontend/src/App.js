import "./App.css";
import { Routes, Route } from "react-router-dom";
import CustomChatBot from "../src/components/chatBot/index";
import LoginComponent from "./components/login/index";
import SignupComponent from "./components/signup/index";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/signup" element={<SignupComponent />} />
        <Route path="/recipe-chatbot" element={<CustomChatBot />} />
      </Routes>
    </div>
  );
}

export default App;
