import React, { useState, useEffect } from "react";
import { makeStyles, TextField, Grid, Container } from "@material-ui/core";
import { Formik, Form, FastField, FieldArray } from "formik";
import { isArray } from "lodash";
import NumberFormat from "react-number-format";
import ButtonWithSpinner from "../ButtonWithSpinner";
import { i18n } from "../../translate/i18n";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  fullWidth: {
    width: "100%",
  },
  textfield: {
    width: "100%",
  },
  row: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  control: {
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
  },
  buttonContainer: {
    textAlign: "right",
    padding: theme.spacing(1),
  },
}));

function SchedulesForm(props) {
  const { initialValues, onSubmit, loading, labelSaveButton } = props;
  const classes = useStyles();

  const [schedules, setSchedules] = useState([
    { weekday: i18n.t("daysweek.day1"), weekdayEn: "monday", startTime: "", endTime: "", },
    { weekday: i18n.t("daysweek.day2"), weekdayEn: "tuesday", startTime: "", endTime: "", },
    { weekday: i18n.t("daysweek.day3"), weekdayEn: "wednesday", startTime: "", endTime: "", },
    { weekday: i18n.t("daysweek.day4"), weekdayEn: "thursday", startTime: "", endTime: "", },
    { weekday: i18n.t("daysweek.day5"), weekdayEn: "friday", startTime: "", endTime: "" },
    { weekday: i18n.t("daysweek.day6"), weekdayEn: "saturday", startTime: "", endTime: "" },
    { weekday: i18n.t("daysweek.day7"), weekdayEn: "sunday", startTime: "", endTime: "" },
  ]);

  useEffect(() => {
    if (isArray(initialValues) && initialValues.length > 0) {
      setSchedules(initialValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

  const handleSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <Formik
      enableReinitialize
      className={classes.fullWidth}
      initialValues={{ schedules }}
      onSubmit={({ schedules }) =>
        setTimeout(() => {
          handleSubmit(schedules);
        }, 500)
      }
    >
      {({ values }) => (
        <Form className={classes.fullWidth}>
          <FieldArray
            name="schedules"
            render={(arrayHelpers) => (
              <Grid spacing={4} container>
                {values.schedules.map((item, index) => {
                  return (
                      <Container>
                          <FastField
                            as={TextField}
                            label="Dia da Semana"
                            name={`schedules[${index}].weekday`}
                            disabled
                            variant="outlined"
                            style={{ marginRight: "3.2%", width: "30%" }}
                            margin="dense"
                          />
                          <FastField
                            name={`schedules[${index}].startTime`}
                            >
                            {({ field }) => (
                              <NumberFormat
                                label="Hora de Inicial"
                                {...field}
                                variant="outlined"
                                margin="dense"
                                customInput={TextField}
                                format="##:##"
                                style={{ marginRight: "3.2%", width: "30%" }}
                              />
                            )}
                          </FastField>
                          <FastField
                            name={`schedules[${index}].endTime`}
                            >
                            {({ field }) => (
                              <NumberFormat
                                label="Hora de Final"
                                {...field}
                                variant="outlined"
                                margin="dense"
                                customInput={TextField}
                                format="##:##"
                                style={{ marginRight: "3.2%", width: "30%" }}
                              />
                            )}
                          </FastField>

                      </Container>

                  );
                })}
              </Grid>
            )}
          ></FieldArray>
          <div style={{ textAlign: "center", marginTop: "2%" }} className={classes.buttonContainer}>
            <ButtonWithSpinner
              loading={loading}
              type="submit"
              color="primary"
              variant="contained"
            >
              {labelSaveButton ?? "Salvar"}
            </ButtonWithSpinner>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default SchedulesForm;
