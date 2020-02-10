import React, { Component } from "react";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      search: "",
      myPost: true,
      user: { id: "", username: "", img: "" }
    };
  }

  componentDidMount() {
    const { getPosts } = this.props;
    getPosts();
  }

  handleChange = ({ name, value }) => this.setState({ [name]: value });

  checkItem(e) {
    this.setState({ myPost: e.target.checked });
  }

  render() {
    return <div id="dashboard">Dashboard</div>;
  }
}

export default Dashboard;
