import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import List from "./screens/PLP/List";
import ProductDetail from "./screens/PDP/ProductDetail";
import HomeScreen from "./components/HomeScreen";
import { FontAwesome } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
              return <FontAwesome name="home" size={24} color="black" />;
            } else if (route.name === "List") {
              iconName = focused ? "shop" : "person-outline";
              return (
                <FontAwesome name="shopping-cart" size={24} color="black" />
              );
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="List" component={List} />
        <Tab.Screen name="ProductDetail" component={ProductDetail} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
