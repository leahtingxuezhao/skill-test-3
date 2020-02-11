import React, { Component } from "react";

class Post extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    console.log("this.props.postInfo", this.props.postInfo);
    return (
      <div className="postBox">
        <div className="titleLetter">{this.props.postInfo.title}</div>
        <div>
          <div>by user {this.props.postInfo.user}</div>
          <img
            src={`https://robohash.org/${this.props.postInfo.user}`}
            alt="pic"
            className="postProfilePic"
          ></img>
        </div>
      </div>
    );
  }
}

export default Post;
