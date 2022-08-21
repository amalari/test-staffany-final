import React from 'react'
import {
    CircularProgress,
    Grid,
    Card,
    CardContent,
    Button,
    CardActions,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import ShiftForm from '../../../features/shift/ShiftForm'
import { useShiftUpdate } from './ShiftUpdate.hook'
import { useStyles } from './ShiftUpdate.style'
import Alert from '../../../features/alert/Alert';

const ShiftUpdate = () => {
    const classes = useStyles()
    const {
        isLoading,
        initValues,
        onSubmit,
        onSaveClick
    } = useShiftUpdate()

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
                        {Object.keys(initValues).length > 0 && <ShiftForm
                            initValues={initValues}
                            isLoading={isLoading}
                            onSubmit={onSubmit}
                        />}
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

export default ShiftUpdate