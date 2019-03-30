import React from 'react';
import {createAppContainer, createStackNavigator, createSwitchNavigator} from 'react-navigation';
import {Login} from "../screens/Login";
import {Dashboard} from "../screens/Dashboard";


export const AuthenticatedStack = createStackNavigator({
    Dashboard
}, {
    initialRouteName: 'Dashboard'
})

export const UnauthenticatedStack = createStackNavigator({
    Login
}, {
    initialRouteName: 'Login'
})


export default createAppContainer(createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    // Main: MainTabNavigator,
    UnauthenticatedStack,
    AuthenticatedStack,
}, {
    initialRouteName: 'UnauthenticatedStack'
}));
