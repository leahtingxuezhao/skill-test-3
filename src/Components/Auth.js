import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import store from "../ducks/store";
import { getUser, userLoggedOut } from "../ducks/userReducer";
import { getMyPost, getPosts } from "../ducks/postReducer";

const emoji = require("/Users/dt/repos-2/devMountain/skill-check/skill-test-3/src/emoji.png");

class Auth extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  login = () => {
    const { username, password } = this.state;
    axios
      .post("/auth/login", { username, password })
      .then((res) => {
        console.log(res.data);
        this.props.getUser(res.data);
        this.props.history.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  register = (username, password) => {
    axios
      .post("/auth/register", { username, password })
      .then((res) => {
        this.props.getUser(res.data);
        this.props.history.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { username, password } = this.state;

    console.log(username);
    console.log(password);

    return (
      <div className="landing-container">
        <div className="landing-box">
          <img src={emoji} className="emoji"></img>
          <h1>Helo</h1>
          <div id="input-box">
            <div className="login-input">
              <p className="nameAndPassword">
                {"Username:"}
                {` `}
              </p>
              <input
                name="username"
                value={this.state.username}
                onChange={(e) => this.handleChange(e)}
                className="input"
              />
            </div>
            <div className="login-input">
              <p className="nameAndPassword">
                {"Password:"}
                {` `}
              </p>
              <input
                name="password"
                value={this.state.password}
                onChange={(e) => this.handleChange(e)}
                className="input"
              />
            </div>
          </div>
          <button
            onClick={() => this.login(username, password)}
            className="LoginAndReButton"
          >
            Login
          </button>
          <button
            onClick={() => this.register(username, password)}
            className="LoginAndReButton"
          >
            Register
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {
  getUser,
  userLoggedOut,
  getMyPost,
  getPosts,
})(Auth);
