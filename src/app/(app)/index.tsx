import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useAuth } from '../../contexts/auth';
import DrawerContent from '../../components/DrawerContent';
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';

const Index = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { signOut } = useAuth();
  const { openDrawer } = navigation;

  return (
    <DrawerContent>
      <StatusBar barStyle='dark-content' />
      <SafeAreaView style={styles.container} >
        <View style={styles.searchBar}>
          <TouchableOpacity onPress={openDrawer}>
            <Icon name="menu" size={20} color="#666" />
          </TouchableOpacity>
          <Text style={styles.searchTextPlaceHolder}>Search Here</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text
            onPress={() => {
              // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
              signOut();
            }}>
            Sign Out
          </Text>
        </View>
      </SafeAreaView>
    </DrawerContent>
  );
}

export default Index;

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