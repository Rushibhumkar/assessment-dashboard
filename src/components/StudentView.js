import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentView = () => {
  const [assessments, setAssessments] = useState([]);

  useEffect(() => {
    fetchStudentAssessments();
  }, []);

  const fetchStudentAssessments = async () => {
    try {
      const response = await axios.get("/api/student-assessments");
      setAssessments(response.data);
    } catch (error) {
      console.error("Error fetching student assessments:", error);
    }
  };

  return (
    <div className="student-view">
      <h1>Your Assessments</h1>
      <ul>
        {assessments.map((assessment) => (
          <li key={assessment.id}>
            <h3>{assessment.title}</h3>
            <p>{assessment.description}</p>
            <button
              onClick={() =>
                (window.location.href = `/take-assessment/${assessment.id}`)
              }
            >
              Take Assessment
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentView;
