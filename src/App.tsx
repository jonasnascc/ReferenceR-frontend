import React from 'react';
import { NavBar } from './shared/components/NavBar';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './shared/components/Layout';
import { Author } from './pages/Author';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path="/author" element={<Author/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
