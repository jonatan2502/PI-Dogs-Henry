import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import { Switch, Route } from 'react-router-dom'
import Home from './components/Home/Home';
import Form from './components/Form/Form';
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/' component={LandingPage} exact></Route>
        <Route path='/home' component={Home} exact></Route>
        <Route path='/createBreed' component={Form} exact></Route>
        <Route path='/' component={NavBar}></Route>
      </Switch>
    </div>
  );
}

export default App;
