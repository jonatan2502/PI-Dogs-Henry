import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import { Switch, Route } from 'react-router-dom'
import Home from './components/Home/Home';
import Form from './components/Form/Form';
import NavBar from './components/NavBar/NavBar';
import DogDetail from './components/DogDetail/DogDetail';
import Search from './components/Search/Search';
import RandomBreed from './components/RandomBreed/RandomBreed';
import NotFound from './components/NotFound/NotFound';

function App() {

  return (
    <div className="App">
      <Switch>
        <Route path='/' component={LandingPage} exact></Route>
        <Route path='/search' component={Search} exact></Route>
        <Route path='/home' component={Home} exact></Route>
        <Route path='/createBreed' component={Form} exact></Route>
        <Route path='/randomBreed' component={RandomBreed} exact></Route>
        <Route path='/breeds/:id' component={DogDetail}></Route>
        <Route path='*' component={NotFound}></Route>
        {/* <Route path='*' component={NavBar}></Route> */}
      </Switch>
    </div>
  );
}

export default App;
