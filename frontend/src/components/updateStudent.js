import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function UpdateStudent() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const { id } = useParams(); // Get student ID from URL

  useEffect(() => {
    // Fetch the current student details
    axios
      .get(`http://localhost:8070/student/get/${id}`)
      .then((res) => {
        const student = res.data.student;
        setName(student.name);
        setAge(student.age);
        setGender(student.gender);
      })
      .catch((err) => {
        alert(err);
      });
  }, [id]);

  function updateData(e) {
    e.preventDefault();

    const updatedStudent = {
      name,
      age,
      gender,
    };

    axios
      .put(`http://localhost:8070/student/update/${id}`, updatedStudent)
      .then(() => {
        alert("Student Updated");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="container mt-5">
      <form onSubmit={updateData}>
        <div className="form-group mb-3">
          <label htmlFor="name">Student Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="age">Student Age:</label>
          <input
            type="text"
            className="form-control"
            id="age"
            value={age}
            onChange={(e) => {
              setAge(e.target.value);
            }}
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="gender">Student Gender:</label>
          <input
            type="text"
            className="form-control"
            id="gender"
            value={gender}
            onChange={(e) => {
              setGender(e.target.value);
            }}
          />
        </div>

        <button type="submit" className="btn btn-success mt-3">
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdateStudent;
