import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';
import App from './App';

ReactDOM.createRoot(document.querySelector("#root")).render(
  
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
);