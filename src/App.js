import React from 'react';
import './App.css';
import Posts from './pages/Posts';
import PostForm from './pages/PostForm';
import AppBar from './components/AppBar';

import { connect } from 'react-redux';

import { POSTS, POST_FORM } from './configureStore';

const routesMap = {
  [POST_FORM]: PostForm,
  [POSTS]: Posts
}

const App = (props) => {

  console.log(props.route);
  const Component = routesMap[props.route];

  return (
    <div>
      <AppBar />
      <Component />
    </div>

  );
}

const mapStateToProps = (state) => {
  return {
    route: state.location.type
  }
}

export default connect(mapStateToProps)(App);
