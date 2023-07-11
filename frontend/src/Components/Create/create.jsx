import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Create.css";
import { Navigate, useParams } from "react-router-dom";

const CreateComponent = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [category, setCategory] = useState("General");
  const [tech, setTech] = useState([]);
  const [message, setMessage] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("http://localhost:4000/record/users/" + id).then((response) => {
      const { data } = response;
      setName(data.name);
      setGender(data.gender);
      setEmail(data.email);
      setNumber(data.number);
      setCategory(data.category);
      // setTech(data.tech);
    });
  }, [id]);

  const handleTechChange = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setTech((prevTech) => [...prevTech, value]);
    } else {
      setTech((prevTech) => prevTech.filter((tech) => tech !== value));
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setProfileImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !gender || !email || !number || !category || !profileImage) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("gender", gender);
      formData.append("email", email);
      formData.append("number", number);
      formData.append("category", category);
      formData.append("tech", JSON.stringify(tech));
      console.log(profileImage);
      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      if (id) {
        await axios.put("http://localhost:4000/record/" + id, formData);
        alert("User updated successfully");
      } else {
        await axios.post("http://localhost:4000/record/newuser", formData);
        alert("User created successfully");
      }
      setRedirect(true);
    } catch (error) {
      console.log(error);
      alert("Failed to create user");
    }
  };
  if (redirect) {
    return <Navigate to="/record"></Navigate>;
  }
  const handlePreview = (e) => {
    e.preventDefault();
    if (!name || !gender || !email || !number || !category) {
      alert("Please fill the details first");
      return;
    }

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <form>
            <h1>Sign Up</h1>

            <strong>
              <label htmlFor="name">Name:</label>
            </strong>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <strong>
              <label htmlFor="gender">Gender:</label>
            </strong>
            <input
              type="radio"
              id="male"
              value="male"
              name="gender"
              checked={gender === "male"}
              onChange={(e) => setGender(e.target.value)}
              required
            />
            <label htmlFor="male" className="light">
              Male
            </label>
            <br />

            <input
              type="radio"
              id="female"
              value="female"
              name="gender"
              checked={gender === "female"}
              onChange={(e) => setGender(e.target.value)}
              required
            />
            <label htmlFor="female" className="light">
              Female
            </label>
            <br />

            <strong>
              <label htmlFor="email">Email:</label>
            </strong>
            <input
              type="email"
              id="mail"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <strong>
              <label htmlFor="number">Number:</label>
            </strong>
            <input
              type="number"
              id="number"
              name="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
            />

            <strong>
              <label htmlFor="category">Category:</label>
            </strong>
            <select
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="General">General</option>
              <option value="OBC">OBC</option>
              <option value="SC/ST">SC/ST</option>
            </select>

            <strong>
              <label>Technologies:</label>
            </strong>
            <input
              type="checkbox"
              id="c"
              value="C"
              name="c"
              checked={tech.includes("C")}
              onChange={handleTechChange}
            />
            <label className="light" htmlFor="c">
              C
            </label>
            <br />

            <input
              type="checkbox"
              id="c++"
              value="C++"
              name="c++"
              checked={tech.includes("C++")}
              onChange={handleTechChange}
            />
            <label className="light" htmlFor="c++">
              C++
            </label>
            <br />

            <input
              type="checkbox"
              id="java"
              value="Java"
              name="java"
              checked={tech.includes("Java")}
              onChange={handleTechChange}
            />
            <label className="light" htmlFor="java">
              JAVA
            </label>
            <br />

            <input
              type="checkbox"
              name="python"
              id="python"
              checked={tech.includes("Python")}
              onChange={handleTechChange}
              value="Python"
            />
            <label htmlFor="python" className="light">
              PYTHON
            </label>
            <br />

            <input
              type="checkbox"
              name="javascript"
              id="javascript"
              checked={tech.includes("Javascript")}
              onChange={handleTechChange}
              value="Javascript"
            />
            <label htmlFor="javascript" className="light">
              JAVASCRIPT
            </label>
            <br />

            <strong>
              <label htmlFor="profile">Profile Picture:</label>
            </strong>
            <input
              type="file"
              name="profile"
              id="profile"
              accept="image/jpeg, image/png"
              onChange={handleFileChange}
            />
            {profileImage && (
              <img
                src={URL.createObjectURL(profileImage)}
                alt="Profile"
                className="profile-image"
              />
            )}
            <p>
              <small className="text-danger">{message}</small>
            </p>

            <button className="check" type="submit" onClick={handlePreview}>
              Preview
            </button>
          </form>
        </div>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="modal-title">Preview</h2>
            <div className="modal-details">
              <p>
                <strong>Name:</strong> {name}
              </p>
              <p>
                <strong>Gender:</strong> {gender}
              </p>
              <p>
                <strong>Email:</strong> {email}
              </p>
              <p>
                <strong>Number:</strong> {number}
              </p>
              <p>
                <strong>Category:</strong> {category}
              </p>
              <p>
                <strong>Technologies:</strong>{" "}
                {tech.map((t) => (
                  <span>{t} </span>
                ))}
              </p>
              <p>
                <strong>Profile Picture:</strong> <br />{" "}
                <img
                  src={profileImage ? URL.createObjectURL(profileImage) : ""}
                  alt="Profile"
                  className="profile-image"
                />
              </p>
              {/* Display other fields */}
            </div>
            <div className="modal-buttons">
              <button
                className="modal-button cancel-button"
                onClick={closeModal}
              >
                Close
              </button>
              <button
                className="modal-button cancel-button"
                onClick={handleSubmit}
              >
                Confirm
              </button>
              {/* Add other buttons if needed */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateComponent;
