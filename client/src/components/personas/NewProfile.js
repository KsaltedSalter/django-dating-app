import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getPayload } from "../../api/authToken";
import ImageUploadField from "./ImageUploadField";
import Modal from "./Modal";

const NewProfile = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModel] = useState(true);
  const [user, setUser] = useState({
    user: {
      id: "",
      email: "",
      username: ""
    }
  });
  const [formData, setFormData] = useState({
    user: "",
    name: "",
    age: "",
    height: "",
    city: "",
    gender: "",
    sexuality: "",
    occupation: "",
    bio: "",
    profile_pic: ""
  });

  // check and get of user id from token

  // get the user from backend to attach to persona
  const getTheUser = async () => {
    const id = getPayload().sub;
    console.log("the user id is:", id);
    const axios = require("axios");
    let config = {
      method: "get",
      url: `http://localhost:8000/accounts/${id}/`,
      headers: {}
    };

    await axios(config)
      .then((response) => {
        setUser({ user: response.data });
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error("Something not right getting the user", error);
      });
  };

  useEffect(() => {
    getTheUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/personas/", formData);
      console.log(formData);
      navigate("/myprofile/:id");
    } catch (err) {
      console.error("Error creating persona data", err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePicChange = (url) => {
    setFormData({ ...formData, profile_pic: url });
  };
  console.log("handleChange", formData);
  // there is a scrolling bug with the modal
  return (
    <>
      {openModal && <Modal closeModel={setOpenModel} />}
      <form className="">
        <div className="col-autos">
          <label className="">Username:</label>
          <input
            readOnly
            name="user"
            className="form-control-plaintext"
            value={user.user.username}
          />
        </div>
        <br />
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ichigo"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <br />
        <div className="mb-3">
          <label className="form-label">Age:</label>
          <input
            type="text"
            className="form-control"
            placeholder="21"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>
        <br />
        <div className="mb-3">
          <label className="form-label">Height (cm):</label>
          <input
            className="form-control"
            placeholder="152"
            name="height"
            value={formData.height}
            onChange={handleChange}
          />
        </div>
        <br />
        <div className="mb-3">
          <label className="form-label">City:</label>
          <input
            className="form-control"
            placeholder="Konoha"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </div>
        <br />
        <label className="form-label">Gender:</label>
        <select
          className="form-select"
          aria-label="Default select example"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option>Select Gender</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="NONBINARY">Non-Binary</option>
          <option value="OTHER">Other</option>
        </select>
        <br />
        <label className="form-label">Sexuality:</label>
        <select
          className="form-select"
          aria-label="Default select example"
          name="sexuality"
          value={formData.sexuality}
          onChange={handleChange}
        >
          <option>Select Sexuality</option>
          <option value="STRAIGHT">Straight</option>
          <option value="GAY">Gay</option>
          <option value="BISEXUAL">Bisexual</option>
          <option value="ASEXUAL">Asexual</option>
          <option value="PANSEXUAL">Pansexual</option>
          <option value="OTHER">Other</option>
        </select>
        <br />
        <div className="mb-3">
          <label className="form-label">Occupation:</label>
          <input
            className="form-control"
            placeholder="Chef"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
          />
        </div>
        <br />
        <div className="mb-3">
          <label className="form-label">Enter Bio:</label>
          <textarea
            className="form-control"
            placeholder="I love walks in the rain..."
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>
        <br />
        <ImageUploadField
          value={formData.profile_pic}
          name="profile_pic"
          handlePicChange={handlePicChange}
        />
        <br />
        <div className="col-auto">
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary mb-3"
          >
            Create New Profile
          </button>
        </div>
      </form>
    </>
  );
};

export default NewProfile;
