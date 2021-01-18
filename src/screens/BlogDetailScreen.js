import React, { useContext, useState } from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
import BlogCard from "../components/BlogCard";
import { Context } from "../context/BlogContext";

const BlogDetailScreen = ({ route }) => {
  const { state } = useContext(Context);
  const blogDetails = route.params;
  const postId = blogDetails.postId;
  const blog = state.blogList.find((blog) => blog.postId === postId);


  return (
    <ScrollView>
      <Text style={styles.titleView}>{blog.title}</Text>
      <Text style={styles.contextView}>{blog.content}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  titleView: {
    fontSize: 30,
    fontWeight: "bold",
  },
  contextView: {
    fontSize: 18,
  },
});

export default BlogDetailScreen;
