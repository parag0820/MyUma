import React from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import {StripeProvider} from '@stripe/stripe-react-native';

export default function App() {
  return (
    <StripeProvider publishableKey="pk_test_51JmhdgCUtCWmOpTBpubnizWr0GuzlfRoMR13WR02Hmh4Jg9NsFRRKadnCFRnknFWIzgC1klaCDqdqbKRB7rEVoLJ00RslTCVyz">
      <RootNavigator />
    </StripeProvider>
  );
}
