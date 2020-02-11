import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { getAllPosts } from "../ducks/reducer";
import Post from "./Post";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      search: "",
      myPost: true,
      user: { id: "", username: "", image: "" }
    };
  }

  componentDidMount() {
    axios
      .get("/api/get_posts")
      .then(res => {
        const action = getAllPosts(res.data);
        this.props.dispatch(action);
        console.log("res", res);
      })
      .catch(err => {
        console.log("err", err);
      });
  }

  handleChange = ({ name, value }) => this.setState({ [name]: value });
  resetFun = () => {
    this.setState({
      search: ""
    });
  };

  checkItem(e) {
    this.setState({ myPost: e.target.checked });
  }

  renderPosts = () => {
    console.log("render posts", this.props.posts);
    return this.props.posts.map(element => <Post postInfo={element} />);
  };

  render() {
    console.log("search value", this.state.search);
    return (
      <div id="dashboard">
        <div className="searchBox">
          <input
            name="search"
            placeholder="Search by Title"
            onChange={e => this.handleChange(e.target)}
            value={this.state.search}
          ></input>
          <button onClick={() => this.resetFun()}>Reset</button>
        </div>
        {this.renderPosts()}
      </div>
    );
  }
}
Dashboard.mapStateToProps = state => {
  console.log("state :", state);
  return {
    posts: state.reducer.posts
  };
};
export default connect(Dashboard.mapStateToProps)(Dashboard);
