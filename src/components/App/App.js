import React, { useState } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function App() {

  const { pathname } = useLocation();
  const app = `${pathname === '/' ? `App` : `App App_white-background`}`;
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const history = useHistory();

  function handleSignOut() {
    setLoggedIn(false);
    setName('');
    history.push('/');
  }

  function handleSignIn() {
    setLoggedIn(true);
    setName('Виталий');
  }
  
  return (
    <div className={app}>

      <Header 
        name={name}
        loggedIn={loggedIn}
        signOut={handleSignOut}
        signIn={handleSignIn}
      />

        <Switch>

        <Route path='/saved-news'>
          <SavedNews />
        </Route>

        <Route path='/'>
          <Main />
        </Route>

        </Switch>

        <Footer />

    </div>
  );
}

export default App;
