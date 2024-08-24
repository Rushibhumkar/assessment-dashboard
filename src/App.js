import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AssessmentDashboard from "./components/AssessmentDashboard";
import AssessmentCreation from "./components/AssessmentCreation";
import QuestionBank from "./components/QuestionBank";
import StudentView from "./components/StudentView";
import ReviewPage from "./components/ReviewPage";
import GradingPage from "./components/GradingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AssessmentDashboard />} />
        <Route path="/create-assessment" element={<AssessmentCreation />} />
        <Route path="/question-bank" element={<QuestionBank />} />
        <Route path="/student-view" element={<StudentView />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/grading" element={<GradingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
