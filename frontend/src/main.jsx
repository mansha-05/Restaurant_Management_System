import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store'

// Syncfusion base styles (REQUIRED)
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-buttons/styles/material.css';
import '@syncfusion/ej2-calendars/styles/material.css';
import '@syncfusion/ej2-dropdowns/styles/material.css';
import '@syncfusion/ej2-inputs/styles/material.css';
import '@syncfusion/ej2-navigations/styles/material.css';
import '@syncfusion/ej2-popups/styles/material.css';
import '@syncfusion/ej2-splitbuttons/styles/material.css';

// Grid styles (MOST IMPORTANT)
import '@syncfusion/ej2-react-grids/styles/material.css';
import '@syncfusion/ej2-base/styles/material.css';
import { registerLicense } from "@syncfusion/ej2-base";

registerLicense("Ngo9BigBOggjGyl/VkR+XU9Ff1RBQmJWfFN0Q3NYdVp4flFOcDwsT3RfQFtjSH1Td0ZmXn1YeXxQQWtfUw==");

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
)
