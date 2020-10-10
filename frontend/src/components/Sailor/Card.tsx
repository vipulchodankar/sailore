import React from "react";

// Redux
import { useDispatch } from "react-redux";
import {
  doSetSelectedSailor,
  doDeleteSailor,
  doOpenSailorDialog,
} from "../../redux/actions/sailors";

// Mui
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Rating from "@material-ui/lab/Rating";
import DateRangeIcon from "@material-ui/icons/DateRange";
import Box from "@material-ui/core/Box";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    // minWidth: 300,
  },
});

const SailorCard = (props: any) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { SID, SNAME, RATING, AGE } = props;

  const handleUpdate = (e: any) => {
    e.stopPropagation();
    dispatch(doSetSelectedSailor(props));
    dispatch(doOpenSailorDialog());
  };

  const handleDelete = (e: any) => {
    e.stopPropagation();
    dispatch(doDeleteSailor(SID));
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h1">
          {SNAME}
        </Typography>

        <Typography variant="h6" component="h2">
          <Rating name="rating" value={RATING} readOnly />
        </Typography>

        <Box display="flex">
          <DateRangeIcon fontSize="small" />
          <Typography color="textSecondary"> {` ${AGE} Y/O`}</Typography>
        </Box>
      </CardContent>

      <CardActions>
        <Button onClick={handleUpdate}>Update</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </CardActions>
    </Card>
  );
};

export default SailorCard;
