import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/index/home';
import { AuthorPage } from './pages/author/authorPage';
import { UserProfilePage } from './pages/userProfile/userProfile';
import { UserCollectionsPage } from './pages/userCollections/userCollections';
import { LoginPage } from './pages/auth/login';
import { GalleryPage } from './pages/gallery/GalleryPage';
import { Layout } from './pages/layout/Layout';
import { RequireAuth } from './context/RequireAuth';
import { RequireNoAuth } from './context/RequireNoAuth';
import { PresentationPage } from './pages/presentation/presentation';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<HomePage/>}/>
        </Route>
        <Route path='/author/:authorName' element={<Layout/>}>
          <Route index element={<AuthorPage/>}/>
          <Route path='gallery' element={<GalleryPage/>}/>
        </Route>
        <Route path='/user' element={<Layout/>}>
          <Route index element={<UserProfilePage/>}/>
          <Route path='collections'>
            <Route index  element={<UserCollectionsPage/>}/>
            <Route path='presentation' element={<PresentationPage/>}/>
          </Route>
        </Route>
        <Route path='/login' element={<RequireNoAuth redirect='/'><LoginPage/></RequireNoAuth>}/>
        <Route path='/user' element={<RequireAuth redirect='/login'><Layout/></RequireAuth>}>
          <Route path='collections' element={<UserCollectionsPage/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
