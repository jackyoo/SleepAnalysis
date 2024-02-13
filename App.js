import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SessionScreen from "./src/view/SessionScreen";
import { Provider } from "react-redux";
import { store } from "./src/data/store";

export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="SleepAnalysis-Dad"
            component={SessionScreen}
            initialParams={{
              entityName: "Dad",
              userId: "2228b530e055401f81ba37b51ff6f81d",
            }}
          />
          <Tab.Screen
            name="SleepAnalysis-Mom"
            component={SessionScreen}
            initialParams={{
              entityName: "Mom",
              userId: "d6c1355e38194139b8d0c870baf86365",
            }}
          />
          <Tab.Screen
            name="SleepAnalysis-Me"
            component={SessionScreen}
            initialParams={{
              entityName: "Me",
              userId: "f9bf229fd19e4c799e8c19a962d73449",
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
