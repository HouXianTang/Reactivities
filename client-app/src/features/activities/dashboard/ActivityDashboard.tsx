import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: String) => void;
    cancelSelectActivity: () => void;
    editActivity: (id: String) => void;
    closeEditActivity: () => void;
    isEditMode: boolean;
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
}

export default function ActivityDashboard({activities, selectedActivity,
      selectActivity, cancelSelectActivity, editActivity, closeEditActivity,
      isEditMode, createOrEdit, deleteActivity}: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities} selectActivity={selectActivity} deleteActivity={deleteActivity}/>
            </Grid.Column>
            <Grid.Column width='6'>
                { selectedActivity && !isEditMode &&
                <ActivityDetails 
                activity={selectedActivity} 
                cancelSelectActivity={cancelSelectActivity} 
                editActivity={editActivity} 
                /> }
                { isEditMode && <ActivityForm 
                closeEditActivity={closeEditActivity}
                activity={selectedActivity} 
                createOrEdit={createOrEdit}
                /> }
            </Grid.Column>
        </Grid>
    );
}