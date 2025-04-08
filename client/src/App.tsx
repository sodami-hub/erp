import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import RoutesSetup from './routes/RoutesSetup';
import {useStore} from './store';
import {AuthProvider} from './context';

function App() {
  const store = useStore();

  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <RoutesSetup />
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
