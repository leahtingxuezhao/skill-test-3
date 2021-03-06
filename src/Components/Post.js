import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Post extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    console.log("this.props.postInfo", this.props.postInfo.id);

    return (
      <div
        className="postBox"
        onClick={() =>
          this.props.history.push({
            pathname: `/singlePost/${this.props.postInfo.id}`,
            state: { id: this.props.postInfo.id },
          })
        }
      >
        <div className="titleLetter">{this.props.postInfo.title}</div>
        <div className="profilePicture">
          <img
            src={`https://robohash.org/${this.props.postInfo.user}`}
            alt="pic"
            className="postProfilePic"
          ></img>
          <p>by user {this.props.postInfo.user}</p>
        </div>
      </div>
    );
  }
}

export default withRouter(Post);
