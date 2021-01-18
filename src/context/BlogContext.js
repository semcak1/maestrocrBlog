import React, { useContext, createContext } from "react";
import { FlatList } from "react-native-gesture-handler";
import createDataContext from "./createDataContext";

const initialState = {
  blogList: [],
  isThereNewData: true,
  isLoading: true,
};

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case "get_blogposts":
      action.payload.data.forEach((el) => {
        let answer = state.blogList.map((b) => b.postId).indexOf(el.postId);

        if (answer === -1) {
          state.blogList.push(el);
        }
      });
      return {
        ...state,

        blogList: [...state.blogList],
        isThereNewData: action.payload.isThereNewData,
        isLoading: false,
      };
    default:
      return state;
  }
};

const getBlogPosts = (dispatch) => {
  return async (page) => {
    const response = await fetch(
      `https://www.lenasoftware.com/api/v1/en/maestro/1?page=${page}&count=3`
    );
    const json = await response.json();
    const data = json.result;
    const isThereNewData = data.length === 0 ? false : true;

    dispatch({
      type: "get_blogposts",
      payload: { data, isThereNewData },
    });
  };
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { getBlogPosts },
  initialState
);
