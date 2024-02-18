
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './shared/components/Layout';
import { LoginPage } from './pages/Login/LoginPage';
import { RequireNoAuth } from './context/Auth/RequireNoAuth';
import { AlbumPage } from './pages/Album/AlbumPage';
import { AuthorPage } from './pages/Author/AuthorPage';
import { UserCollections } from './pages/UserCollections/UserCollections';


function App() {
  return (
      <div className="App">
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route path="/authors" element={<AuthorPage/>}/>
            <Route path="/author" element={<AlbumPage/>}/>
            <Route path="/user/collections">
              <Route index element={<UserCollections/>}/>
              <Route path="albums" element={<AlbumPage favorites/>}/>
            </Route>
            <Route path="/login" element={<RequireNoAuth><LoginPage/></RequireNoAuth>}/>
          </Route>
        </Routes>
      </div>
  );
}

export default App;
