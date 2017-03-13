import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import BodyContainer from './BodyContainer'

const App = () => (
  <Router>
    <MainLayout>
      <Switch>
        <Route exact path="/" component={BodyContainer} />
        <Route path="/:ownerUsername" component={BodyContainer} />
      </Switch>
    </MainLayout>
  </Router>
)

export default App
