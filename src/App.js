
import './App.css';
import Card from './component/Card';
import Navbar from './component/Navbar';
import Favourite from './component/Favourite';
import {BrowserRouter, Routes,Link,Route} from "react-router-dom"

function App() {
  return (
    <>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' exect element={<Card/>}/>
        <Route path='/favourite' element={<Favourite/>}/>
      </Routes>
     
    
    </BrowserRouter>
    
    </>
  );
}

export default App;
