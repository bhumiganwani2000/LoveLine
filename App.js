import React, { useEffect, useState } from 'react';
import NavigationStack from './app/navigations/NavigationStack';
import { Provider } from 'react-redux';
import { persistor, store } from './app/redux/store/configureStore';
import { ActivityIndicator, LogBox } from 'react-native';
import { PersistGate } from 'redux-persist/es/integration/react';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const App = () => {
  const [loading, setLoading] = useState(true);
  const onBeforeLift = () => {
    if (store) {
      setLoading(false);
    }
  };
  return (
    <Provider store={store}>
      <PersistGate
        loading={<ActivityIndicator />}
        persistor={persistor}
        onBeforeLift={() => { onBeforeLift() }}>
        {loading ? <ActivityIndicator /> : <NavigationStack />}
      </PersistGate>
    </Provider>
  )
};
export default App;