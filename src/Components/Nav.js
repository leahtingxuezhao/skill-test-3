import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";

class Nav extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    console.log("this.props from nav :", this.props);
    axios.get("/auth/user").then(res => {
      this.props.dispatch({
        type: "GET_USER",
        payload: res.data
      });
    });
  }

  render() {
    console.log(this.props.user);
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
          <p>{`Hi! ${this.props.user.username}`}</p>
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
  return { user: state.reducer.user };
}
export default connect(mapStateToProps)(withRouter(Nav));
