import React, { useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const history = useHistory();

  function handleShowResult() {
    setShow(true);
  }

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
    <div className="app">

      <Header 
        name={name}
        loggedIn={loggedIn}
        signOut={handleSignOut}
        signIn={handleSignIn}
      />

        <Switch>

        <Route path='/saved-news'>
          <SavedNews
            name={name}
            show={show}
          />
        </Route>

        <Route path='/'>
          <Main
            show={show}
            showResult={handleShowResult}
          />
        </Route>

        </Switch>

        <Footer />

    </div>
  );
}

export default App;
