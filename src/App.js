import { Route, Routes } from 'react-router-dom';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import './App.css';
import Projects from './Components/Projects';
import Auth from './Pages/Auth';
import DashBoard from './Pages/DashBoard';





function App() {
  return (
   <>
      <div className="App">
        <Routes>
          <Route path='/' element={ <Home></Home>}></Route>
          <Route path='/projects' element={<Projects/>}></Route>
          <Route path='/login' element={<Auth></Auth>}></Route>
          <Route path='/register' element={<Auth register></Auth>}></Route>
          <Route path='/dash-board' element={<><DashBoard></DashBoard></>}></Route>
        </Routes>
       
      </div>
      <Footer></Footer>
   </>
  );
}

export default App;
