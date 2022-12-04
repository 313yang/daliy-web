import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Topbar from "./components/Topbar";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Main from "./pages/Main";

function App() {
  return (
    <Router>
      <Topbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/auth/:type" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/*" element={<p>Page Not Found</p>} />
      </Routes>
    </Router>
  );
}

export default App;
