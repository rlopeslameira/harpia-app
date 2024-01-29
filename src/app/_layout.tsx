import { Slot } from 'expo-router';
import { AuthProvider, useAuth } from '../contexts/auth';
import { View } from 'react-native';
import Util from '../services/util';

export default function Root() {
  return (
    <AuthProvider>
        <Slot />
    </AuthProvider>
  );
}