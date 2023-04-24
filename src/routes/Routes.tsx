import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Layout = lazy(() => import('../Layout'));

const SystemHome = lazy(() => import('../pages/SystemHome/SystemHome'));
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
const LogoutPage = lazy(() => import('../pages/LogoutPage/LogoutPage'));

const ChampionshipHome = lazy(() => import('../pages/ChampionshipHome/ChampionshipHome'));
const DocumentsPage = lazy(() => import('../pages/DocumentsPage/DocumentsPage'));
const ResultsPage = lazy(() => import('../pages/ResultsPage/ResultsPage'));

const AudienceListPage = lazy(() => import('../pages/AudienceListPage/AudienceListPage'));

const NotFound = lazy(() => import('../pages/NotFound/NotFound'));

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SystemHome />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/logout' element={<LogoutPage />} />
        <Route path='/:championshipCode' element={<Layout />}>
          <Route path='/:championshipCode' element={<ChampionshipHome />} />
          <Route path='/:championshipCode/documents' element={<DocumentsPage />} />
          <Route path='/:championshipCode/results' element={<ResultsPage />} />
          <Route path='/:championshipCode/requests'>
            <Route path='/:championshipCode/requests/audience' element={<AudienceListPage />} />
            <Route path='/:championshipCode/requests/resultreview' element={<></>} />
            <Route path='/:championshipCode/requests/equipmentchange' element={<></>} />
          </Route>
          <Route path='/:championshipCode/announcments' element={<></>} />
          <Route path='/:championshipCode/rule42' element={<></>} />
          <Route path='/:championshipCode/declarations' element={<></>} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
