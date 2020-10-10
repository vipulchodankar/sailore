import React from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { doCreateSailor, doUpdateSailor } from "../../redux/actions/sailors";
import { selectSelectedSailor } from "../../redux/selectors/sailors";

// Mui
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";

const SailorForm = () => {
  const dispatch = useDispatch();
  const sailor = useSelector(selectSelectedSailor);
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
    setSubmitting(false);

    if (isNew) dispatch(doCreateSailor(values));
    else dispatch(doUpdateSailor(values));
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
