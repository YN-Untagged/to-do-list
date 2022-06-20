import './App.css';
import Login from './components/login';
import Register from './components/register';
import Home from './components/home';
import storageHelpers from './components/localStorageExports';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import bcrypt from 'bcryptjs/dist/bcrypt';


function App() {
  if(localStorage.getItem('users') === null){
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync("pass123", salt);
    const users =[{ name: 'Dummy', surname: 'User', email: 'dummy@mail.com', password: hash, src: 'images/profile.jpg',  tasks: []}];
    storageHelpers.storeUsers(users);
  }
  
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" component={<Register/>}/>
        </Routes>
    </Router>
  );
}

export default App;
