import './App.css';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link,
} from 'react-router-dom';
import Home from './Home';
import Details from './Details';
import Search from './Search';

function App() {
    return (
      <Router>
          <nav>
              <Link to="/">Home</Link>
          </nav>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/details/:id/:name" element={<Details />} />
              <Route path="/search" element={<Search />} />
          </Routes>
      </Router>
    );
}

export default App;
