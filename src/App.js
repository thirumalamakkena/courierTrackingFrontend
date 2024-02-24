
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import Controller from './components/Controller';
import Login from './components/Login';


const  App = () =>   (
  <Switch>
    <Route exact path="/" component={Controller} />
    <Route exact path="/login" component={Login} />
  </Switch>
  );


export default App;
