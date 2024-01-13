import { Route, Routes } from 'react-router-dom';
import { Layout } from './shared/components/Layout';
import { Author } from './pages/Author/Author';
import { LoginPage } from './pages/Login/LoginPage';


function App() {
  return (
      <div className="App">
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route path="/author" element={<Author/>}/>
            <Route path="/login" element={<LoginPage/>}/>
          </Route>
        </Routes>
      </div>
  );
}

export default App;
