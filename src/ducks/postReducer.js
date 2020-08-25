const initialState = {
  post: [],
};

const GET_ALL_POSTS = "GET_ALL_POSTS";
const GET_POSTS = "GET_POSTS";

export const getMyPost = (myPost) => {
  return {
    type: GET_POSTS,
    payload: myPost,
  };
};

export const getPosts = (posts) => {
  return {
    type: GET_ALL_POSTS,
    payload: posts,
  };
};

export default function postReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return { ...state, post: payload };
    case GET_ALL_POSTS:
      return { ...state, post: payload };
    default:
      return state;
  }
}
