import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./Records.css";
import { Link } from 'react-router-dom';
function Records() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:4000/record/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:4000/record/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
      alert("User deleted successfully.");
    } catch (error) {
      console.log(error);
      alert("Failed to delete user.");
    }
  };

  return (
    <div className='main-div'>
      {users.map((user) => (
        <div key={user._id} className="card-container">
          <img className="round" src={`http://localhost:4000/record/getfile/${user.profileImage}`} alt="user" />
          <h3>{user.name}</h3>
          <h6>{user.email}</h6>
          <h6>{user.gender}</h6>
          <h6>{user.number}</h6>
          <h6>{user.category}</h6>

          <div className="skills">
            <h6>Technologies</h6>
            <ul>
              {user.tech.map((t, index) => (
                <li key={index}>{t}</li>
              ))}
            </ul>
          </div>

          <div className="buttons">
            <Link to={'/'+user._id} className="update-button">Update</Link>
            <button
              className="delete-button"
              onClick={() => handleDelete(user._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Records;
