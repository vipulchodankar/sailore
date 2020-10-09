import React from "react";

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

import Sailor from "../../interfaces/Sailor";

const useStyles = makeStyles({
  root: {
    // minWidth: 300,
  },
});

const SailorCard = (props: Sailor) => {
  const classes = useStyles();
  const { SID, SNAME, RATING, AGE } = props;

  const handleUpdate = (e: any) => {
    e.stopPropagation();
    console.log("Will update sailor with id: " + SID);
  };

  const handleDelete = (e: any) => {
    e.stopPropagation();
    console.log("Will delete sailor with id: " + SID);
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
