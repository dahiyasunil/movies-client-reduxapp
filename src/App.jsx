import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MovieView from "./components/movie/MovieView";
import MovieForm from "./components/movie/MovieForm";

function App() {
  return (
    <>
      <Router>
        <Header />
        <div className="container py-4">
          <Routes>
            <Route path="/" element={<MovieView />} />
            <Route path="/manage/:operation" element={<MovieForm />} />
            <Route path="/manage/:operation" element={<MovieForm />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
