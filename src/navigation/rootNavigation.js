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
        <Stack.Screen
          name="BlogList"
          component={BlogListScreen}
          options={{
            headerTintColor: "#fff",
            title: "Blog List",
            headerStyle: {
              backgroundColor: "#f4511e",
            },
          }}
        />
        <Stack.Screen
          name="BlogDetail"
          component={BlogDetailScreen}
          options={{
            title: "Blog Detail",
            headerTintColor: "#fff",
            headerStyle: {
              backgroundColor: "#f4511e",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
