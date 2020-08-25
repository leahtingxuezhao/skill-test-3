import React, { Component } from "react";
import { connect } from "react-redux";
import { getPost } from "../ducks/postReducer";
import axios from "axios";

class SinglePost extends Component {
  constructor() {
    super();
    this.state = { post: { user: "", title: "", image: "", content: "" } };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    if (id) {
      axios
        .get(`/api/get_post/${id}`)
        .then((res) => {
          this.setState({
            post: res.data,
          });
          console.log("res.data :>> ", res.data);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  }

  render() {
    const { user, title, image, content } = this.state.post;
    console.log("user :>> ", user);
    console.log("title :>> ", title);
    console.log("image :>> ", image);
    console.log("content :>> ", content);
    console.log("this.props in single post :", this.props);
    return (
      <div className="singlePostBox">
        <div>{title}</div>
        <div>
          <div>by user {user}</div>
          <img
            src={`https://robohash.org/${user}`}
            alt="pic"
            className="postImage"
          ></img>
          <div>{content}</div>
        </div>
      </div>
    );
  }
}

export default SinglePost;
