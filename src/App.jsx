import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Home from "./Home";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" component={Login}/>
          <Route path="/home" component={Home}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App;
