import './index.scss';
import 'react-toastify/dist/ReactToastify.css';

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import { ThemeProvider } from '@mui/material/styles';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';

import { ScreenLoadingOrganism } from './components/LoadingScreen/ScreenLoadingOrganism';
import customTheme from './theme/customTheme';
import AppRoutes from './routes/Routes';

const queryClient = new QueryClient();

const rootContainer = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(rootContainer).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<ScreenLoadingOrganism isOpen={true} />}>
        <ThemeProvider theme={customTheme}>
          <AppRoutes />
          <ToastContainer position='bottom-right' theme='colored' />
          {/* <ReactQueryDevtools /> */}
        </ThemeProvider>
      </Suspense>
    </QueryClientProvider>
  </React.StrictMode>,
);
