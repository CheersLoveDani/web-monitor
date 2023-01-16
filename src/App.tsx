import "./App.scss"
import Nav from "./structure/Nav"
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'
import MainView from "./structure/routes/MainView"
import Info from "./structure/routes/Info";
import Settings from "./structure/routes/Settings";


function App() {
  return (
    <Router>
      <div className="container">
        <Nav />
        <Routes>
          <Route path="/" element={<MainView />} />
          <Route path="/info" element={<Info />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
