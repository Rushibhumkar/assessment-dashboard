import React, { useState, useEffect } from "react";
import axios from "axios";

const AssessmentCreation = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get("/api/question-bank");
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching question bank:", error);
    }
  };

  const handleQuestionSelect = (questionId) => {
    setSelectedQuestions((prevSelectedQuestions) =>
      prevSelectedQuestions.includes(questionId)
        ? prevSelectedQuestions.filter((id) => id !== questionId)
        : [...prevSelectedQuestions, questionId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAssessment = {
      title,
      type,
      questions: selectedQuestions,
    };

    try {
      await axios.post("/api/create-assessment", newAssessment);
      alert("Assessment created successfully!");
      // Reset form fields
      setTitle("");
      setType("");
      setSelectedQuestions([]);
    } catch (error) {
      console.error("Error creating assessment:", error);
    }
  };

  return (
    <div>
      <h1>Create New Assessment</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Type:</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="">Select Type</option>
            <option value="Quiz">Quiz</option>
            <option value="Assignment">Assignment</option>
            <option value="Exam">Exam</option>
          </select>
        </div>

        <div>
          <h3>Select Questions:</h3>
          <ul>
            {questions.map((question) => (
              <li key={question.id}>
                <input
                  type="checkbox"
                  checked={selectedQuestions.includes(question.id)}
                  onChange={() => handleQuestionSelect(question.id)}
                />
                {question.text}
              </li>
            ))}
          </ul>
        </div>

        <button type="submit">Create Assessment</button>
      </form>
    </div>
  );
};

export default AssessmentCreation;
