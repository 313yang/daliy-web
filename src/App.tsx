import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Topbar from "./components/Topbar";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Main from "./pages/Main";
import { getToken } from "./utils/token";

function App() {
  return (
    <Router>
      <Topbar />
      <Routes>
        <Route path="/" element={getToken() ? <Home /> : <Main />} />
        <Route path="/auth/:type" element={<Auth />} />
        {getToken() && <Route path="/home" element={<Home />} />}
        <Route path="/*" element={<Navigate replace to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
