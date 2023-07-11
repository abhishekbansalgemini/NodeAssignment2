import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Records.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import CreateNavbar from "../Navbar/CreateNavbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Records() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/record/users")
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
      setUsers(users.filter((user) => user._id !== userId));
      toast("User deleted successfully.");
    } catch (error) {
      console.log(error);
      toast("Failed to delete user.");
    }
  };

  return (
    <>
      <CreateNavbar></CreateNavbar>
      {users.length === 0 && (
        <div className="no-user">
          <div className="message">No users found!</div>
        </div>
      )}
      <div className="main-div">
        {users.map((user) => (
          <div key={user._id} className="card-container">
            <img
              className="round"
              src={`http://localhost:4000/record/getfile/${user.profileImage}`}
              alt="user"
            />
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
              <Link to={"/" + user._id} className="update-button">
                <FontAwesomeIcon icon={faPencilAlt} />
              </Link>
              <button
                className="delete-button"
                onClick={() => handleDelete(user._id)}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer></ToastContainer>
    </>
  );
}

export default Records;
