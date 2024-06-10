import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/index';
import { AuthorPage } from './pages/author/authorPage';
import { UserProfilePage } from './pages/userProfile/userProfile';
import { UserCollectionsPage } from './pages/userCollections/userCollections';
import { LoginPage } from './pages/auth/login';import { GalleryPage } from './pages/gallery/GalleryPage';
;

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/author/:authorName'>
          <Route index element={<AuthorPage/>}/>
          <Route path='gallery' element={<GalleryPage/>}/>
        </Route>
        <Route path='/user/:userId'>
          <Route index element={<UserProfilePage/>}/>
          <Route path='collections' element={<UserCollectionsPage/>}/>
        </Route>
        <Route path='/login' element={<LoginPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
