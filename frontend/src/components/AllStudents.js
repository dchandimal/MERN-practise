import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AllStudents() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch all students when the component mounts
    function getStudents() {
      axios
        .get("http://localhost:8070/student/")
        .then((res) => {
          setStudents(res.data); // Set the fetched students data to state
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getStudents();
  }, []);

  const deleteStudent = (id) => {
    // Delete a student and remove it from the state
    axios
      .delete(`http://localhost:8070/student/delete/${id}`)
      .then(() => {
        alert("Student Deleted");
        setStudents(students.filter((student) => student._id !== id)); // Filter out the deleted student
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="container mt-5">
      <h1>All Students</h1>
      <button
        className="btn btn-primary mb-3"
        onClick={() => (window.location.href = "/add")}
      >
        Add Student
      </button>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.gender}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => {
                    // Navigate to the update page with the student ID
                    window.location.href = `/update/${student._id}`;
                  }}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteStudent(student._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
