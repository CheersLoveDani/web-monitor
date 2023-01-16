import "./App.scss"
import Nav from "./structure/Nav"
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'
import MainView from "./structure/routes/MainView"


function App() {
  return (
    <Router>
      <div className="container">
        <Nav />
        <Routes>
          <Route path="/" element={<MainView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
