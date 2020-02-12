import React, { Component } from "react";
import axios from "axios";

class SinglePost extends Component {
  constructor() {
    super();
    this.state = { user: "", title: "", image: "", content: "" };
  }
  getPost = () => {
    const id =
      this.props.location && this.props.location.pathname.split("/")[2];
    return axios.get(`/api/get_post/${id}`);
  };
  componentDidMount() {
    const id =
      this.props.location && this.props.location.pathname.split("/")[2];
    if (id) {
      this.getPost().then(res => {
        const { data } = res;
        console.log("data :", data);
        this.setState({
          user: data.user,
          title: data.title,
          image: data.image,
          content: data.content
        });
      });
    }
  }

  render() {
    console.log("this.props in single post :", this.props);
    return (
      <div className="singlePostBox">
        <div>{this.state.title}</div>
        <div>
          <div>by user {this.state.user}</div>
          <img src={this.state.image} alt="pic" className="postImage"></img>
        </div>
      </div>
    );
  }
}

export default SinglePost;
