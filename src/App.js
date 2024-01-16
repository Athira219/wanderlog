
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Footer from './components/Footer';
import Auth from './components/Auth';
import Dashboard from './pages/Dashboard';
import { useContext } from 'react';
import { isAuthContext } from './context/ContextWanderlog';


function App() {
  const { authWanderlog, setAuthWanderlog } = useContext(isAuthContext)
  return (

    <div className="App">
      {/* <Header /> */}
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/Register' element={<Auth register />} />
        <Route path='/dashboard' element={authWanderlog ? <Dashboard /> : <Home />} />

      </Routes>
      <Footer />


    </div>
  );
}

export default App;
