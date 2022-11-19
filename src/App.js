import {Switch, Route} from 'react-router-dom'

import LoginForm from './components/LoginFrom'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import AllJobsSection from './components/AllJobsSection'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={AllJobsSection} />
  </Switch>
)

export default App
