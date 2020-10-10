import React, { FC, useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  doFetchSailors,
  doSetSelectedSailor,
  doOpenSailorDialog,
} from "../../redux/actions/sailors";
import {
  selectSailorsList,
  selectSailorsIsLoading,
} from "../../redux/selectors/sailors";

// Mui
import { makeStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

// Custom Components
import Loader from "../../components/Loader";
import SailorCard from "../../components/Sailor/Card";
import SailorDialog from "../../components/Sailor/Dialog";

import Sailor from "../../interfaces/Sailor";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const SailorPage: FC = () => {
  const classes = useStyles();
  const sailors = useSelector(selectSailorsList);
  const loading = useSelector(selectSailorsIsLoading);
  const dispatch = useDispatch();

  useEffect(
    function loadSailors() {
      dispatch(doFetchSailors());
    },
    [dispatch]
  );

  const handleFABClick = (e: any) => {
    e.stopPropagation();
    dispatch(doSetSelectedSailor(null));
    dispatch(doOpenSailorDialog());
  };

  return (
    <Container>
      {loading && sailors.length === 0 ? (
        <Loader fullscreen />
      ) : sailors.length === 0 ? (
        <Box py={8}>
          <Typography align="center">No sailors found</Typography>
        </Box>
      ) : null}

      <Box py={4}>
        <Grid container spacing={4}>
          {sailors.map((sailor: Sailor) => (
            <Grid item xs={12} sm={6} md={4} xl={3} key={sailor.SID}>
              <SailorCard {...sailor} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Fab
        variant="extended"
        color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={handleFABClick}
      >
        <AddIcon className={classes.extendedIcon} />
        Add Sailor
      </Fab>

      <SailorDialog />
    </Container>
  );
};

export default SailorPage;
