import React,{useState} from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import './App.css';
import {Provider} from 'react-redux';
import AddUser from './components/AddUser'
import UserList from './components/UsersList'
import store from './store'
import NavBar from './components/NavBar'

function App() {
  const [state,setState]=useState({})
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavBar/>
        <div className="main">
          <Route path="/" exact component={UserList} />
          <Route path="/adduser" exact component={AddUser}/>
          
        </div>
      
      </BrowserRouter>

    </Provider>
  );
}

export default App;
