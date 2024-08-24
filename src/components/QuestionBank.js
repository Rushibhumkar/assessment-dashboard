import React, { useState, useEffect } from "react";
import axios from "axios";

const QuestionBank = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [questionToEdit, setQuestionToEdit] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get("/api/questions");
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const addQuestion = async () => {
    if (newQuestion.trim()) {
      try {
        const response = await axios.post("/api/questions", {
          text: newQuestion,
        });
        setQuestions([...questions, response.data]);
        setNewQuestion("");
      } catch (error) {
        console.error("Error adding question:", error);
      }
    }
  };

  const deleteQuestion = async (id) => {
    try {
      await axios.delete(`/api/questions/${id}`);
      setQuestions(questions.filter((question) => question.id !== id));
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const editQuestion = (question) => {
    setEditMode(true);
    setQuestionToEdit(question);
    setEditText(question.text);
  };

  const updateQuestion = async () => {
    if (editText.trim()) {
      try {
        const response = await axios.put(
          `/api/questions/${questionToEdit.id}`,
          { text: editText }
        );
        setQuestions(
          questions.map((q) => (q.id === questionToEdit.id ? response.data : q))
        );
        setEditMode(false);
        setQuestionToEdit(null);
        setEditText("");
      } catch (error) {
        console.error("Error updating question:", error);
      }
    }
  };

  return (
    <div>
      <h1>Manage Question Bank</h1>

      {/* Add New Question */}
      <div className="add-question">
        <input
          type="text"
          placeholder="Enter new question"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />
        <button onClick={addQuestion}>Add Question</button>
      </div>

      {/* Edit Existing Question */}
      {editMode && (
        <div className="edit-question">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button onClick={updateQuestion}>Update Question</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      )}

      {/* List of Questions */}
      <ul className="question-list">
        {questions.map((question) => (
          <li key={question.id}>
            <span>{question.text}</span>
            <button onClick={() => editQuestion(question)}>Edit</button>
            <button onClick={() => deleteQuestion(question.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionBank;
