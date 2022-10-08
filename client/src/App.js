import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import { Switch, Route } from 'react-router-dom'
import Home from './components/Home/Home';
import Form from './components/Form/Form';
import DogDetail from './components/DogDetail/DogDetail';
import Search from './components/Search/Search';
// import RandomBreed from './components/RandomBreed/RandomBreed';
import NotFound from './components/NotFound/NotFound';
import ListBreeds from './components/ListBreeds/ListBreeds';
// import Footer from './components/Footer/Footer';

function App() {

  return (
    <div className="App">
      <Switch>
        <Route path='/' component={LandingPage} exact></Route>
        <Route path='/search' component={Search} exact></Route>
        <Route path='/home' component={Home} exact></Route>
        <Route path='/createBreed' component={Form} exact></Route>
        {/* <Route path='/randomBreed' component={RandomBreed} exact></Route> */}
        <Route path='/breeds/:id' component={DogDetail}></Route>
        <Route path='/listBreeds/:temperament' component={ListBreeds}></Route>
        <Route path='*' component={NotFound}></Route>
      </Switch>
      {/* <Footer></Footer> */}
    </div>
  );
}

export default App;
