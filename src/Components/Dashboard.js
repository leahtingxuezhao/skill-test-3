import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { getUser } from "../ducks/reducer";
import { getAllPosts } from "../ducks/reducer";
import { getPosts } from "../ducks/reducer";
import Post from "./Post";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      myPost: true,
      id: 0,
      post: []
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

    axios
      .get("/auth/user")
      .then(res => {
        const action1 = getUser(res.data);
        this.props.dispatch(action1);
        console.log("Hello hello hello hello hello res.data :", res.data);
        this.setState({ id: res.data.id });
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
    const { id, search, myPost } = this.state;
    console.log("search value", search);
    console.log("this.state.myPost :", myPost);
    console.log("this.state.user.id :", id);
    return (
      <div id="dashboard">
        <div className="searchBox">
          <input
            name="search"
            placeholder="Search by Title"
            onChange={e => this.handleChange(e.target)}
            value={this.state.search}
          ></input>
          <button
            onClick={e => {
              if (id) {
                getPosts(search, myPost, id);
              }
            }}
          >
            Search
          </button>
          <button onClick={() => this.resetFun()}>Reset</button>
          <div>My Post</div>
          <input
            type="checkbox"
            onChange={e => this.checkItem(e)}
            checked={this.state.myPost}
          />
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
