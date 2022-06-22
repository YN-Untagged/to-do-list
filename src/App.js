import './css/App.css';
import Login from './components/login';
import Register from './components/register';
import Home from './components/home';
import storageHelpers from './components/localStorageExports';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  if(localStorage.getItem('users') === null){
    const password = storageHelpers.hashPassword("pass123");
    const users =[{ name: 'Dummy', surname: 'User', email: 'dummy@mail.com', password: password, src: 'images/profile.jpg',  tasks: []}];
    storageHelpers.storeUsers(users);
  }
  
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>}/>
        </Routes>
    </Router>
  );
}

export default App;
