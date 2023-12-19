import { Fragment, useEffect, useState } from "react";
import { Button, Container, Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ActivityFilters from "./ActivityFilter";
import { PagingParams } from "../../../app/models/pagination";

export default observer(function ActivityDashboard() {

    const { activityStore } = useStore();
    const { loadActivities, activityRegistry, setPagingParams, pagination } = activityStore;
    const [loadingNext, setLoadingNext] = useState(false);

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1));
        loadActivities().then(() => setLoadingNext(false));
    }

    useEffect(() => {
        if (activityRegistry.size === 0) {
            loadActivities();
        }
    }, [loadActivities, activityRegistry.size]);

    if (activityStore.loadingInitial && !loadingNext) return <LoadingComponent content='Loading activities...' />

    return (
        <Grid>
            <Grid.Column width='10'>
                {pagination?.totalItems === 0 ?
                    <Container textAlign="center" style={{ "margin": "30%", "font-size":"18px"}}
                    >No Ongoing Activity At The Moment</Container> :
                    <Fragment>
                        <ActivityList />
                        <Button
                            style={{ hidden: "hidden" }}
                            fluid
                            content='More...'
                            positive
                            onClick={handleGetNext}
                            loading={loadingNext}
                            disabled={pagination?.totalPages === pagination?.currentPage
                                || pagination?.totalItems === 0}
                        />
                    </Fragment>
                }
            </Grid.Column>
            <Grid.Column width='6'>
                <ActivityFilters />
            </Grid.Column>
        </Grid>
    );
})