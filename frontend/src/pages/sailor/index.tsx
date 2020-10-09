import React, { FC, useState, useEffect } from "react";
import axios from "../../services/axios";

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
  const [sailors, setSailors] = useState<Sailor[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [dialog, setDialog] = useState({ isOpen: false, sailor: null });

  useEffect(function loadSailors() {
    setLoading(true);
    axios
      .get("/sailor")
      .then(({ data: { data } }) => {
        setSailors(data);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const handleFABClick = (e: any) => {
    e.stopPropagation();
    setDialog({ isOpen: true, sailor: null });
  };

  return (
    <Container>
      {loading ? <Loader /> : null}
      <Box py={4}>
        <Grid container spacing={4}>
          {sailors.map((sailor) => (
            <Grid item xs={12} sm={6} md={4} xl={3} key={sailor.SID}>
              <SailorCard
                {...sailor}
                setSailors={setSailors}
                dialog={dialog}
                setDialog={setDialog}
              />
            </Grid>
          ))}

          {sailors.length === 0 ? (
            <Grid item xs={12} sm={6} md={4} xl={3}>
              <Typography>No sailors found</Typography>
            </Grid>
          ) : null}
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

      <SailorDialog
        setDialog={setDialog}
        dialog={dialog}
        setSailors={setSailors}
      />
    </Container>
  );
};

export default SailorPage;
