import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Layout from "./components/Layout/Layout";

import Counter from "./containers/Counter/Counter";
import ToDoList from './containers/ToDoList/ToDoList';

const App = () => (
  <Layout>
    <Switch>
      <Route path="/" exact component={Counter} />
      <Route path="/todo" exact component={ToDoList} />
      <Route render={() => <h1>Not found</h1>} />
    </Switch>
  </Layout>
);

export default App;
