import React, { FC, useEffect, useState } from "react";
import Fuse from "fuse.js";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  doFetchSailors,
  doSetSelectedSailor,
  doOpenSailorDialog,
  doSortSailors,
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
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import ClearIcon from "@material-ui/icons/Clear";
import SearchIcon from "@material-ui/icons/Search";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

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
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");

  const fuseOptions = {
    includeScore: true,
    keys: ["SID", "SNAME", "RATING", "AGE"],
  };

  const fuse = new Fuse(sailors, fuseOptions);
  const matchedSailors = fuse.search(search);

  useEffect(
    function loadSailors() {
      dispatch(doFetchSailors());
    },
    [dispatch]
  );

  useEffect(
    function sortSailors() {
      dispatch(doSortSailors(sortBy));
    },
    [dispatch, sortBy]
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
      ) : (
        <Box py={4}>
          <Box pb={4}>
            <Grid container spacing={4} justify="space-between">
              <Grid item xs={12} sm={6} md={4} xl={3}>
                <TextField
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  label="Search"
                  fullWidth
                  placeholder="Juan Wick"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="start">
                        {search.length > 0 ? (
                          <IconButton>
                            <ClearIcon
                              fontSize="small"
                              onClick={() => setSearch("")}
                            />
                          </IconButton>
                        ) : null}
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} xl={3}>
                <InputLabel id="sailor-sort-label" shrink>
                  Sort By
                </InputLabel>
                <Select
                  labelId="sailor-sort-label"
                  id="sailor-sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(String(e.target.value))}
                  fullWidth
                >
                  <MenuItem value={"name_asc"}>
                    Name <ArrowUpwardIcon fontSize="small" />
                  </MenuItem>
                  <MenuItem value={"name_desc"}>
                    Name <ArrowDownwardIcon fontSize="small" />
                  </MenuItem>
                  <MenuItem value={"rating_asc"}>
                    Rating <ArrowUpwardIcon fontSize="small" />
                  </MenuItem>
                  <MenuItem value={"rating_desc"}>
                    Rating <ArrowDownwardIcon fontSize="small" />
                  </MenuItem>
                  <MenuItem value={"age_asc"}>
                    Age <ArrowUpwardIcon fontSize="small" />
                  </MenuItem>
                  <MenuItem value={"age_desc"}>
                    Age <ArrowDownwardIcon fontSize="small" />
                  </MenuItem>
                </Select>
              </Grid>
            </Grid>
          </Box>

          <Grid container spacing={4}>
            {matchedSailors.length === 0
              ? sailors.map((sailor: Sailor) => (
                  <Grid item xs={12} sm={6} md={4} xl={3} key={sailor.SID}>
                    <SailorCard {...sailor} />
                  </Grid>
                ))
              : matchedSailors.map((matchedSailor: any) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    xl={3}
                    key={matchedSailor.item.SID}
                  >
                    <SailorCard {...matchedSailor.item} />
                  </Grid>
                ))}
          </Grid>
        </Box>
      )}

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
