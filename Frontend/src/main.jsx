import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import SocketProvider from './context/SocketContext.jsx';

import ContextApi from './context/userContext.jsx';
import CaptainContext from './context/captainContext.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <SocketProvider>
            <CaptainContext>
                <ContextApi>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </ContextApi>
            </CaptainContext>
        </SocketProvider>
    </StrictMode>
);