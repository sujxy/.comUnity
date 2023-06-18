import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  pageType: "home",
  user: null,
  token: null,
  allPosts: [],
  chats: [],
  currentChat: null,
  allComunitys: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setMode: function (state) {
      if (state.mode === "light") {
        state.mode = "dark";
      } else {
        state.mode = "light";
      }
    },
    setLogin: function (state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: function (state) {
      state.user = null;
      state.token = null;
      state.currentComunity = null;
    },
    setFriends: function (state, action) {
      if (state.user) {
        state.user.buddies = action.payload.buddies;
      } else {
        console.error("user friends does not exists");
      }
    },
    setUserComunity: function (state, action) {
      if (state.user) {
        state.user.communities = action.payload.communities;
      } else {
        console.error("user does not exists");
      }
    },

    setComunitys: function (state, action) {
      state.allComunitys = action.payload.comunitys;
    },
    setPosts: function (state, action) {
      state.allPosts = action.payload.posts;
    },
    setPost: function (state, action) {
      const updatedPosts = state.allPosts.map((post) => {
        if (post._id === action.payload.post._id) {
          return action.payload.post;
        } else {
          return post;
        }
      });
      state.allPosts = updatedPosts;
    },
    setPageType: (state, action) => {
      state.pageType = action.payload.pageType;
    },
    setChats: (state, action) => {
      state.chats = action.payload.chats;
    },
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload.currentChat;
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  setPosts,
  setPost,
  setUserComunity,
  setPageType,
  setComunitys,
  setChats,
  setCurrentChat,
} = authSlice.actions;
export default authSlice.reducer;
