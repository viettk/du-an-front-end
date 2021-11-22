import logo from './logo.svg';
import './App.css';
import Head from './Layout/Head';
import Home from './component/Home/Home';
import Footer from './Layout/Footer';
import Sidebar from './Layout/Sidebar/Sidebar';
import Bodyfooter from './Layout/Bodyfooter';

function App() {
  return (
    <div>
      <Head/>
      <Home/>
      <Bodyfooter/>
      <Footer/>
    </div>
  );
}

export default App;
