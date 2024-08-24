import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ReviewPage = () => {
  const { assessmentId } = useParams();
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    fetchStudentAnswers();
  }, []);

  const fetchStudentAnswers = async () => {
    try {
      const response = await axios.get(
        `/api/review-assessment/${assessmentId}`
      );
      setAnswers(response.data);
    } catch (error) {
      console.error("Error fetching student answers:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`/api/submit-assessment/${assessmentId}`, { answers });
      alert("Assessment submitted successfully!");
    } catch (error) {
      console.error("Error submitting assessment:", error);
    }
  };

  return (
    <div className="review-page">
      <h1>Review Your Answers</h1>
      <ul>
        {answers.map((answer, index) => (
          <li key={index}>
            <p>Question: {answer.question}</p>
            <p>Your Answer: {answer.answer}</p>
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit}>Submit Assessment</button>
    </div>
  );
};

export default ReviewPage;
