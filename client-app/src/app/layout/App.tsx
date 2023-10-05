import { useState, useEffect, Fragment } from 'react'
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid'; 
import { act } from 'react-dom/test-utils';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities')
      .then(response => {
        setActivities(response.data)
      });
  }, []);

  function handleSelectActivity(id: String) {
    setSelectedActivity(activities.find(x => x.id === id))
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: String) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity) {
    activity.id ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
    : setActivities([...activities, {...activity, id: uuid()}]); // Check if the activity exist, if yes, update othervise add it
    setEditMode(false);
    setSelectedActivity(activity); // Show the newly added/updated activity
  }

  function handleDeleteActivity(id: string) {
    setActivities([...activities.filter(x => x.id !== id)]);
  }

  return (
    <Fragment>
      <NavBar openForm={handleFormOpen}/>
      <Container style={{ marginTop: "5rem" }}>
        <ActivityDashboard 
        activities={activities}
        selectedActivity={selectedActivity}
        selectActivity={handleSelectActivity}
        cancelSelectActivity={handleCancelSelectActivity}
        editActivity={handleFormOpen}
        closeEditActivity={handleFormClose}
        isEditMode={editMode}
        createOrEdit={handleCreateOrEditActivity}
        deleteActivity={handleDeleteActivity}
         />
      </Container>
    </Fragment>
  )
}

export default App
