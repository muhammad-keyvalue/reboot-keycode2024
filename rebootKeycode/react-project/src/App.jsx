import HomePage from "./HomePage";
import LoginInPage from "./LoginInPage";
import LoginPage from "./LoginPage";
import ResultPage from "./ResultPage";
import UploadPage from "./UploadPage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UploadUser from "./UploadUser";
import Pricing from "./Pricing";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/uploadUser" element={<UploadUser />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/loginIn" element={<LoginInPage />} />
      </Routes>
    </Router>
  )
}

export default App
