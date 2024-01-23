import { Route, Routes } from 'react-router-dom';
import { Layout } from './shared/components/Layout';
import { LoginPage } from './pages/Login/LoginPage';
import { RequireNoAuth } from './context/Auth/RequireNoAuth';
import { AlbumPage } from './pages/Album/AlbumPage';


function App() {
  return (
      <div className="App">
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route path="/author" element={<AlbumPage/>}/>
            <Route path="/login" element={<RequireNoAuth><LoginPage/></RequireNoAuth>}/>
          </Route>
        </Routes>
      </div>
  );
}

export default App;
