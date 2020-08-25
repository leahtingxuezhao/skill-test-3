import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";

class Nav extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    console.log("nav bar username", this.props.user.username);
    if (this.props.location.pathname === "/") {
      return <div></div>;
    } else {
      return (
        <div className="nav-bar">
          <img
            src={`https://robohash.org/${this.props.user.username}`}
            alt="pic"
            id="profilePic"
          ></img>
          <h3>{`Hello! ${this.props.user.username}`}</h3>
          <div
            className="link"
            onClick={() => this.props.history.push("/dashboard")}
          >
            Home
          </div>
          <div className="link" onClick={() => this.props.history.push("/new")}>
            Form
          </div>
          <button
            onClick={() =>
              axios
                .post("/auth/logout")
                .then(() => this.props.history.push("/"))
            }
            className="logout"
          >
            Logout
          </button>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return { user: state.userReducer.user };
}
export default connect(mapStateToProps)(withRouter(Nav));
