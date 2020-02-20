import React from "react";
import Grid from '@material-ui/core/Grid';

const GridGabby = props =>
    <Grid {...props}>
        {props.children}
    </Grid>

export default GridGabby;