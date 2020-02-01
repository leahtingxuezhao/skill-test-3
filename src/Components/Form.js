import React, { Component } from "react";
import axios from "axios";
const uploadPic =
  "https://blog.hubspot.com/hubfs/types-of-image-files-extensions.jpg";

class Form extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      image: "",
      content: ""
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  submit = (title, image, content) => {
    axios.post("/api/addPost", { title, image, content }).then(() => {
      this.props.history.push("/dashboard");
    });
  };

  render() {
    const { title, image, content } = this.state;
    console.log(title);
    console.log(image);
    console.log(content);
    return (
      <div className="add-form-container">
        <p id="newPost">NEW POST</p>
        <img src={uploadPic} alt="uploadPic" className="uploadPic"></img>
        <div>
          <div className="add-box"></div>
          <p className="title">Title:</p>
          <input
            className="formInput"
            name="title"
            value={title}
            onChange={e => this.handleChange(e)}
          ></input>
          <p>Image URL:</p>
          <input
            className="formInput"
            name="image"
            value={image}
            onChange={e => this.handleChange(e)}
          ></input>
          <p>Content:</p>
          <input
            className="formInput"
            name="content"
            value={content}
            onChange={e => this.handleChange(e)}
          ></input>
        </div>
        <button
          id="postButton"
          onClick={() => this.submit(title, image, content)}
        >
          Post
        </button>
      </div>
    );
  }
}

export default Form;
