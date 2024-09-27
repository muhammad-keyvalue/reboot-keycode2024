import HomePage from "./HomePage";
import ResultPage from "./ResultPage";
import UploadPage from "./UploadPage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/" element={<HomePage />}/>
      </Routes>
    </Router>
  )
}

export default App
