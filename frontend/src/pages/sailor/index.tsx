import React, { FC, useState, useEffect } from "react";
import axios from "../../services/axios";

// Mui
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// Custom Components
import Loader from "../../components/Loader";
import SailorCard from "../../components/Sailor/Card";

import Sailor from "../../interfaces/Sailor";

const SailorPage: FC = () => {
  const [sailors, setSailors] = useState<Sailor[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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

  return (
    <Container>
      {loading ? <Loader /> : null}

      <Box py={4}>
        <Grid container spacing={4}>
          {sailors.map((sailor) => (
            <Grid item xs={12} sm={6} md={4} xl={3} key={sailor.SID}>
              <SailorCard {...sailor} setSailors={setSailors} />
            </Grid>
          ))}

          {sailors.length === 0 ? (
            <Grid item xs={12} sm={6} md={4} xl={3}>
              <Typography>No sailors found</Typography>
            </Grid>
          ) : null}
        </Grid>
      </Box>
    </Container>
  );
};

export default SailorPage;
