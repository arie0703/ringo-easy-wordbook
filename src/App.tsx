import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { QuizPage } from "./pages/QuizPage";
import { FillInPage } from "./pages/FillInPage";
import { WordListPage } from "./pages/WordListPage";
import { StatsPage } from "./pages/StatsPage";
import { BottomNav } from "./components/BottomNav";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 pb-16 sm:pb-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/fillin" element={<FillInPage />} />
          <Route path="/words" element={<WordListPage />} />
          <Route path="/stats" element={<StatsPage />} />
        </Routes>
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}

export default App;
