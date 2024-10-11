import AddStudent from "./components/AddStudent";
import AllStudents from "./components/AllStudents";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Header />

        <Routes>
          <Route path="/add" element={<AddStudent />} />
          <Route path="/" element={<AllStudents />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
