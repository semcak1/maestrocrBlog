import React from "react";
import { Text, StyleSheet } from "react-native";
import BlogCard from '../components/BlogCard'

const BlogListScreen = ({navigation}) => {
  return (
    <>
 
      <BlogCard navigation={navigation}/>
    </>
  );
};

const styles = StyleSheet.create({});

export default BlogListScreen;
