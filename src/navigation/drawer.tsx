import React from 'react';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Alunos from '../app/(app)/alunos';
import Periodos from '../app/(app)/periodos';
import {Platform} from 'react-native';
import CustomDrawer from '../components/CustomDrawer';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const drawerIcon = ({focused, size}, name) => {
    return (
      <Icon
        name={name}
        size={size}
        color={focused ? Colors.active : Colors.inactive}
      />
    );
  };
  return (
    <Drawer.Navigator
        drawerContent={CustomDrawer}
        screenOptions={{
            headerShown: false,
            drawerActiveBackgroundColor: Colors.transparent,
            drawerInactiveBackgroundColor: Colors.transparent,
            drawerActiveTintColor: Colors.active,
            drawerInactiveTintColor: Colors.inactive,
            drawerHideStatusBarOnOpen: Platform.OS === 'ios' ? true : false,
            overlayColor: Colors.transparent,
            drawerStyle: {
            backgroundColor: Colors.bg,
            width: '60%',
            },
            sceneContainerStyle: {
            backgroundColor: Colors.bg,
            },
            drawerType: 'slide',
        }}>
        <Drawer.Screen
            name="Alunos"
            component={Alunos}
            options={{
            drawerIcon: options => drawerIcon(options, 'home-outline'),
            }}
        />
        <Drawer.Screen
            name="Periodos"
            component={Periodos}
            options={{
            drawerIcon: options => drawerIcon(options, 'heart-outline'),
            }}
        />
     
    </Drawer.Navigator>
    );
};

export default DrawerNavigator;

const Colors = {
  bg: '#009688',
  active: '#fff',
  inactive: '#eee',
  transparent: 'transparent',
};