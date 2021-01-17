import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import BlogListScreen from "./src/screens/BlogListScreen";
import RootNavigator from "./src/navigation/rootNavigation";
import { Provider as BlogProvider } from "./src/context/BlogContext";

export default function App() {
  return (
    <BlogProvider>
      <RootNavigator />
    </BlogProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
