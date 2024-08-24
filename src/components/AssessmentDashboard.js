import React, { useState, useEffect } from "react";
import axios from "axios";

const AssessmentDashboard = () => {
  const [assessments, setAssessments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentActivities, setRecentActivities] = useState([]);
  const [analyticsSummary, setAnalyticsSummary] = useState({});

  useEffect(() => {
    fetchAssessments();
    fetchRecentActivities();
    fetchAnalyticsSummary();
  }, []);

  // Fetch the list of assessments
  const fetchAssessments = async () => {
    try {
      const response = await axios.get("/api/assessments");
      setAssessments(response.data);
    } catch (error) {
      console.error("Error fetching assessments:", error);
    }
  };

  // Fetch the recent activities related to assessments
  const fetchRecentActivities = async () => {
    try {
      const response = await axios.get("/api/recent-activities");
      setRecentActivities(response.data);
    } catch (error) {
      console.error("Error fetching recent activities:", error);
    }
  };

  // Fetch analytics summary for the assessments
  const fetchAnalyticsSummary = async () => {
    try {
      const response = await axios.get("/api/analytics-summary");
      setAnalyticsSummary(response.data);
    } catch (error) {
      console.error("Error fetching analytics summary:", error);
    }
  };

  // Handle search input
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter assessments based on search query
  const filteredAssessments = assessments.filter((assessment) =>
    assessment.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="dashboard">
      <h1>Assessment Dashboard</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search Assessments..."
        value={searchQuery}
        onChange={handleSearch}
      />

      {/* Button to create a new assessment */}
      <button onClick={() => (window.location.href = "/create-assessment")}>
        Create New Assessment
      </button>

      {/* Filters and Sorting Options */}
      <div className="filters">
        {/* Add filters and sorting options here */}
        <p>Filter and sort options will go here.</p>
      </div>

      {/* List of Assessments */}
      <div className="assessments-list">
        {filteredAssessments.map((assessment) => (
          <div key={assessment.id} className="assessment-item">
            <h3>{assessment.title}</h3>
            <p>Type: {assessment.type}</p>
            {/* Edit, Manage, and View Analytics Links */}
            <div className="assessment-actions">
              <button
                onClick={() =>
                  (window.location.href = `/edit-assessment/${assessment.id}`)
                }
              >
                Edit
              </button>
              <button
                onClick={() =>
                  (window.location.href = `/manage-assessment/${assessment.id}`)
                }
              >
                Manage
              </button>
              <button
                onClick={() =>
                  (window.location.href = `/view-analytics/${assessment.id}`)
                }
              >
                View Analytics
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activities Section */}
      <div className="recent-activities">
        <h2>Recent Activities</h2>
        <ul>
          {recentActivities.map((activity, index) => (
            <li key={index}>{activity.description}</li>
          ))}
        </ul>
      </div>

      {/* Assessment Analytics Summary */}
      <div className="analytics-summary">
        <h2>Assessment Analytics Summary</h2>
        <p>Total Assessments: {analyticsSummary.totalAssessments}</p>
        <p>Average Score: {analyticsSummary.averageScore}</p>
        <p>Completed Assessments: {analyticsSummary.completedAssessments}</p>
      </div>
    </div>
  );
};

export default AssessmentDashboard;
