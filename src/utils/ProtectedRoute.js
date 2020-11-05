import React from 'react';
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props  }) => {

  return (

    <Route>
      {
        () => props.loggedIn === true ? <Component {...props} /> : <Redirect to="./" />
      }
    </Route>

    // <Route>
    //   {
    //     () => props.loggedIn === true ? <Component {...props} /> : 
          
    //     <Redirect 
    //       to={{
    //         pathname : '/', 
    //         state : {
    //           from : openLoginPopup()
    //         }
    //       }} 
    //     />

    //   }
    // </Route>
)}

export default ProtectedRoute;