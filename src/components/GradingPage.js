import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const GradingPage = () => {
  const { assessmentId } = useParams();
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await axios.get(`/api/grade-assessment/${assessmentId}`);
      setSubmissions(response.data);
    } catch (error) {
      console.error("Error fetching submissions:", error);
    }
  };

  const handleGrade = async (submissionId, grade) => {
    try {
      await axios.post(`/api/grade-submission/${submissionId}`, { grade });
      alert("Grade submitted successfully!");
    } catch (error) {
      console.error("Error submitting grade:", error);
    }
  };

  return (
    <div className="grading-page">
      <h1>Grade Submissions</h1>
      <ul>
        {submissions.map((submission) => (
          <li key={submission.id}>
            <h3>Student: {submission.studentName}</h3>
            <p>Answers: {submission.answers}</p>
            <input
              type="text"
              placeholder="Enter Grade"
              onBlur={(e) => handleGrade(submission.id, e.target.value)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GradingPage;
