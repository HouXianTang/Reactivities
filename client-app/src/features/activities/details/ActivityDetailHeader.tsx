import { observer } from 'mobx-react-lite';
import React, { Fragment } from 'react'
import { Button, Header, Item, Segment, Image, Label } from 'semantic-ui-react'
import { Activity } from "../../../app/models/activity";
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useStore } from '../../../app/stores/store';

const activityImageStyle = {
    filter: 'brightness(30%)'
};

const activityImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    activity: Activity
}

export default observer(function ActivityDetailHeader({ activity }: Props) {
    const { activityStore: { updateAttendence, loading, cancelActivityToggle } } = useStore();
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{ padding: '0' }}>
                {activity.isCancelled &&
                    <Label style={{ position: 'absolute', zIndex: 1000, left: -14, top: 20 }}
                        ribbon color='red' content='Cancelled' />
                }
                <Image src={`/assets/categoryImages/${activity.category}.jpg`} fluid style={activityImageStyle} />
                <Segment style={activityImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={activity.title}
                                    style={{ color: 'white' }}
                                />
                                <p>{format(activity.date!, 'dd MMM yyyy')}</p>
                                <p>
                                    Hosted by <Link to={`/profile/${activity.host?.username}`}><strong>{activity.host?.displayName}</strong></Link>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                {activity.isHost ? (
                    <Fragment>
                        <Button color={activity.isCancelled ? 'green' : 'red'} floated='left' basic
                            content={activity.isCancelled ? 'Re-activate Activity' : 'Cancel Activity'}
                            onClick={cancelActivityToggle}
                            loading={loading}
                        />
                        <Button as={Link} to={`/manage/${activity.id}`} disabled={activity.isCancelled} color='orange' floated='right'>
                            Manage Event
                        </Button>
                    </Fragment>

                ) : activity.isGoing ? (
                    <Button loading={loading} onClick={updateAttendence}>Cancel attendance</Button>
                ) : (
                    <Button disabled={activity.isCancelled} loading={loading} onClick={updateAttendence} 
                        color='teal'>Join Activity</Button>
                )}
            </Segment>
        </Segment.Group>
    )
})
