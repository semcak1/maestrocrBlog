import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BlogDetailScreen from "../screens/BlogDetailScreen";
import BlogListScreen from "../screens/BlogListScreen";

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BlogList">
        <Stack.Screen name="BlogList" component={BlogListScreen}  options={{ title: 'Blog List' }}/>
        <Stack.Screen name="BlogDetail" component={BlogDetailScreen}  options={{ title: 'Blog Detail' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};




export default RootNavigator;
