import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuestionPage from "./components/question";
import './App.css';

function App() {
  return (

    <>
    <BrowserRouter>
      <Routes>
          {/* <Route index element={<Home />} /> */}
          <Route path="/question" element={<QuestionPage />} />

      </Routes>
    </BrowserRouter>
    </>

  );
}

export default App;
