import React from 'react';
import SignUpForm from './components/signUp';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import SignIn from './components/signIn';
import Dashboard from './components/dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignIn />} />
          <Route path='/signup' element={<SignUpForm />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
