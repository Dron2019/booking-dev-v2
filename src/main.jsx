import React from 'react'
import ReactDOM from 'react-dom/client';
import { HashRouter  } from 'react-router-dom';
import App from './App.jsx';
import './index.scss';
import { isDev } from './api/api.js';
import DevMenu from './components/development/DevMenu.jsx';
import { FlatContextProvider } from './contexts/FlatContext/FlatContextProvider.jsx';
import { DiscountProvider } from './contexts/DiscountContext/DiscountContext.jsx';
import { LocalHistoryProvider } from './contexts/LocalHistory/LocalHistoryContext.jsx';
import CustomThemeProvider from './contexts/CustomThemeProvider/CustomThemeProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(

    <CustomThemeProvider>
      <HashRouter basename="/">
        <LocalHistoryProvider>
          <FlatContextProvider>
            <DiscountProvider>
              <App />
              {isDev && <DevMenu />}
            </DiscountProvider>
          </FlatContextProvider>
        </LocalHistoryProvider>
      </HashRouter>
    </CustomThemeProvider>,
)
