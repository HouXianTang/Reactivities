import { useState, useEffect, Fragment } from 'react'
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities')
      .then(response => {
        setActivities(response.data)
      });
  }, []);

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "5rem" }}>
        <ActivityDashboard activities={activities} />
      </Container>
    </Fragment>
  )
}

export default App
