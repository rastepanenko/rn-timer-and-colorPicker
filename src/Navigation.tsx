import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Platform, StatusBar, } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Timer from "./Timer";
import { FontAwesome } from "@expo/vector-icons";
import Pallette from "./pallette/Pallette";

const createStack =
    Platform.OS === 'ios' ? createStackNavigator : createNativeStackNavigator
const RootStack = createStack()
const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {
    return (
        <BottomTab.Navigator
            initialRouteName="Timer"
            screenOptions={{
                tabBarActiveTintColor: 'gray',
            }}
        >
            <BottomTab.Screen
                name="Timer"
                component={Timer}
                options={{
                    title: 'Timer',
                    headerShown: true,
                    headerTitleAlign: 'center',
                    tabBarIcon: ({ color }) => <FontAwesome name="clock-o" size={25} color={color} />,
                }}
            />
            <BottomTab.Screen
                name="Pallette"
                component={Pallette}
                options={(navigation) => ({
                    title: 'Pallette',
                    headerShown: true,
                    tabBarIcon: ({ color }) => <FontAwesome name="paint-brush" size={25} color={color} />,
                })}
            />
        </BottomTab.Navigator>
    );
}

export const Navigation = () => {
    return (
        <NavigationContainer>
            <StatusBar hidden />
            <RootStack.Navigator
                screenOptions={({ }) => ({
                    headerShown: true,
                    headerShadowVisible: false,
                    headerBackTitle: ' ',
                    headerTintColor: 'black',
                    headerBackVisible: false,
                    headerTitleStyle: {
                        color: 'black',
                    },
                    headerTitleAlign: 'center',
                })}>
                <RootStack.Screen
                    name="Root"
                    component={BottomTabNavigator}
                    options={{
                        headerShown: false,
                    }}
                />
            </RootStack.Navigator>
        </NavigationContainer>
    )
}
