import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuestionPage from "./components/question";
import Entry from "./components/entryPage";
import Sucess from "./components/sucess";
import './App.css';

function App() {
  return (

    <>
    <BrowserRouter>
      <Routes>
          <Route index element={<Entry />} />
          <Route path="/question" element={<QuestionPage />} />
          <Route path="/sucess" element={<Sucess/>} />
      </Routes>
    </BrowserRouter>
    </>

  );
}

export default App;
