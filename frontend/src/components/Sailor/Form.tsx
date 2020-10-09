import React from "react";
import axios from "../../services/axios";

// Mui
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";

const SailorForm = (props: any) => {
  const { sailor } = props;
  const isNew = !sailor;

  let initialValues = {
    SNAME: "",
    RATING: "",
    AGE: "",
  };

  if (sailor) initialValues = { ...sailor };

  const handleSubmit = (
    values: any,
    { setSubmitting }: { setSubmitting: any }
  ) => {
    if (isNew)
      axios
        .post("/sailor", values)
        .then(({ data }) => {
          console.log(data);
        })
        .catch((error) => console.error(error))
        .finally(() => setSubmitting(false));
    else {
      axios
        .put(`/sailor/${values.SID}`, values)
        .then(({ data }) => {
          console.log(data);
        })
        .catch((error) => console.error(error))
        .finally(() => setSubmitting(false));
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {({ submitForm, isSubmitting, touched }) => (
        <Form>
          <Box>
            <Field
              component={TextField}
              type="text"
              name="SNAME"
              label="Name"
              fullWidth
              required
            />

            <Field
              component={TextField}
              type="number"
              name="RATING"
              label="Rating"
              fullWidth
              required
            />

            <Field
              component={TextField}
              type="number"
              name="AGE"
              label="Age"
              fullWidth
              required
            />

            <Box py={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={submitForm}
                fullWidth
                disabled={isSubmitting}
              >
                {isSubmitting ? <CircularProgress /> : isNew ? "Add" : "Update"}
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default SailorForm;
