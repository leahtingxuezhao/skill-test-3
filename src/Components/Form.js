import React, { Component } from "react";
import axios from "axios";

class Form extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      img: "",
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
    axios.post("/api/addpost", { title, image, content }).then(() => {
      this.props.history.push("/dashboard");
    });
  };

  render() {
    const { title, image, content } = this.state;
    return (
      <div className="add-form-container">
        <p>New Post</p>
        <div className="add-box"></div>
      </div>
    );
  }
}

export default Form;
