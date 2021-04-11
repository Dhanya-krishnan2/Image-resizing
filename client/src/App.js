import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AddImage from './components/AddImage';
import All from './components/All';
import ChangeUserName from './components/ChangeUserName';
import Home from './components/Home';

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/addImage' component={AddImage} />
          <Route exact path='/changeUsername' component={ChangeUserName} />
          <Route exact path='/all' component={All} />
          <Route exact path='/:id' component={ChangeUserName} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
