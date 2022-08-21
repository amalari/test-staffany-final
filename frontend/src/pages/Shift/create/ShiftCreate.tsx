import React from 'react'
import {
    CircularProgress,
    Grid,
    Card,
    CardContent,
    Button,
    CardActions,
} from "@material-ui/core";
import { set } from "date-fns";
import { Link as RouterLink } from "react-router-dom";
import ShiftForm from '../../../features/shift/ShiftForm'
import { useShiftCreate } from './ShiftCreate.hook'
import { useStyles } from './ShiftCreate.style'
import Alert from '../../../features/alert/Alert';

const initValues = {
  name: "",
  date: new Date(),
  startTime: set(new Date(), { hours: 0, minutes: 0, seconds: 0 }),
  endTime: new Date(),
};

const ShiftCreate = () => {
    const classes = useStyles()
    const {
        isLoading,
        onSubmit,
        onSaveClick
    } = useShiftCreate()

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Card className={classes.root}>
                    <CardContent>
                        <Button
                            className={classes.backBtn}
                            variant="contained"
                            component={RouterLink}
                            to="/shift"
                            disabled={isLoading}
                        >
                            Back
                        </Button>
                    </CardContent>
                    <CardContent>
                        <Alert />
                        <ShiftForm
                            initValues={initValues}
                            isLoading={isLoading}
                            onSubmit={onSubmit}
                        />
                    </CardContent>
                    <CardActions>
                        {isLoading ? (
                            <CircularProgress className={classes.right} />
                            ) : (
                            <Button
                                onClick={onSaveClick}
                                variant="contained"
                                color="primary"
                                className={classes.saveBtn}
                            >
                                Save
                            </Button>
                        )}
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    )
}

export default ShiftCreate