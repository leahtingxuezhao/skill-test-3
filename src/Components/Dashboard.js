import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { getUser } from "../ducks/userReducer";
import { getMyPost, getPosts } from "../ducks/postReducer";
import Post from "./Post";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      search: "",
      myPost: false,
    };
  }

  componentDidMount() {
    axios
      .get("/api/get_posts")
      .then((res) => {
        this.props.getPosts(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });

    axios
      .get("/auth/user")
      .then((res) => {
        this.props.getUser(res.data);
        this.setState({ id: res.data.id });
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  handleChange = ({ name, value }) => this.setState({ [name]: value });
  resetFun = () => {
    this.setState({
      search: "",
    });
  };

  checkItem(e) {
    this.setState({ myPost: !this.state.myPost });
  }

  clickFunc(e) {
    this.setState({ search: this.state.text });
  }

  filterFunc = (array) => {
    let newArr = [];
    if (this.state.myPost) {
      for (let i = 0; i < array.length; i++) {
        if (
          Number(array[i].user_id) === this.props.id &&
          array[i].title.includes(this.state.search)
        ) {
          console.log("this one passed test");
          newArr.push(array[i]);
        }
      }
    } else {
      for (let i = 0; i < array.length; i++) {
        if (array[i].title.includes(this.state.search)) {
          newArr.push(array[i]);
        }
      }
    }
    console.log(
      "newArrnewArrnewArrnewArrnewArrnewArrnewArrnewArrnewArr :>> ",
      newArr
    );
    return newArr;
  };

  render() {
    const { search, myPost, text } = this.state;
    const { id } = this.props;
    console.log("search", search);
    console.log("this.state.myPost :", myPost);
    console.log("this.state.displayPosts :>> ", this.state.displayPosts);
    console.log("this.props.posts :>> ", this.props.posts);
    const displayPosts = this.filterFunc(this.props.posts);
    console.log("displayPosts :>> ", displayPosts);

    return (
      <div className="dashboard">
        <div className="searchBox">
          <input
            name="text"
            placeholder="Search by Title"
            onChange={(e) => this.handleChange(e.target)}
            value={this.state.text}
          ></input>
          <button
            onClick={(e) => {
              this.clickFunc(e);
            }}
          >
            Search
          </button>
          <button onClick={() => this.resetFun()}>Reset</button>
          <div>My Post</div>
          <input
            type="checkbox"
            onChange={(e) => this.checkItem(e)}
            checked={this.state.myPost}
          />
        </div>
        <div>
          {displayPosts.map((element) => (
            <Post postInfo={element}></Post>
          ))}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  console.log("state :", state);
  return {
    posts: state.postReducer.post,
    id: state.userReducer.user.id,
  };
}
export default connect(mapStateToProps, {
  getUser,
  getMyPost,
  getPosts,
})(Dashboard);
