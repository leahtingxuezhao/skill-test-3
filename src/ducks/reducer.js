import axios from "axios";

const initialState = {
  user: {
    id: 0,
    username: ""
  },
  posts: []
};

const GET_USER = "GET_USER";
const GET_ALL_POSTS = "GET_ALL_POSTS";
const GET_POSTS = "GET_POSTS";

export const getUser = user => {
  return {
    type: GET_USER,
    payload: user
  };
};

export const getAllPosts = allPosts => {
  return {
    type: GET_ALL_POSTS,
    payload: allPosts
  };
};
export const getPosts = Posts => {
  return {
    type: GET_POSTS,
    payload: Posts
  };
};
export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USER:
      return Object.assign({ ...state }, { user: payload });
    case GET_ALL_POSTS:
      return Object.assign({ ...state }, { posts: payload });
    case GET_POSTS:
      return Object.assign({ ...state }, { posts: payload });
    default:
      return state;
  }
}
