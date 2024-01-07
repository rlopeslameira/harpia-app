import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import DrawerSceneWrapper from '../../components/DrawerContent';

const Dashboard = ({ navigation }) => {
  const { openDrawer } = navigation;
  return (
    <DrawerSceneWrapper>
      <SafeAreaView style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.searchBar}>
            <TouchableOpacity onPress={openDrawer}>
              <Icon name="menu" size={20} color="#666" />
            </TouchableOpacity>
            <Text style={styles.searchTextPlaceHolder}>Search Here</Text>
          </View>

        </View>
      </SafeAreaView>
    </DrawerSceneWrapper>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', flex: 1 },
  wrapper: { padding: 16 },
  searchBar: {
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    marginBottom: 12,
  },
  searchTextPlaceHolder: {
    color: '#666',
    marginLeft: 8,
  },
});