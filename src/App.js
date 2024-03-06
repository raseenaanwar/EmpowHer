
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './components/AccountComponents/Home';
import Login from './components/AccountComponents/Login';
import Signup from './components/AccountComponents/Signup';
import VerifyEmail from './components/AccountComponents/VerifyEmail';
import ForgotPassword from './components/AccountComponents/ForgotPassword';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/AccountComponents/Dashboard';
import ResetPassword from './components/AccountComponents/ResetPassword';
function App() {
  return (
    <div className="App">
      <Router>
        <ToastContainer/>
        <Routes>
     
        <Route path="/" exact element={<Home/> }/>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path='/otp/verify' element={<VerifyEmail/>}/>
        <Route path='/forget_password' element={<ForgotPassword/>}/>
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/password-reset-confirm/:uid/:token'element={<ResetPassword/>}/>
        
        </Routes>
    </Router>
    </div>
  );
}

export default App;
