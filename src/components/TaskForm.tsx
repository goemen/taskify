import * as React from 'react';
import {
  Button,
  Grid,
  makeStyles,
  MenuItem,
  TextField as MuiTextField,
} from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { ITask, IUser, WorkFlowStatusLabels } from "../models";
import { TextField } from "formik-material-ui";
import {
  Autocomplete,
  AutocompleteRenderInputParams,
} from "formik-material-ui-lab";
import { DatePicker } from "formik-material-ui-pickers";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { Tasks } from "../store/reducers/tasks";
import moment from "moment";
import Snackbar from '@material-ui/core/Snackbar';

import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface ITaskFormProps {
  task: ITask;
  navigateAfterSave?: boolean;
}

const useClasses = makeStyles((theme) => ({
  actions: {
    display: "flex",
    justifyContent: "space-between",
    margin: theme.spacing(2),
  },
  userOption: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row'
  },
  userOptionAvatar: {
    marginRight: theme.spacing()
  }
}));

export const TaskForm: React.FC<ITaskFormProps> = ({
  task,
  navigateAfterSave,
}) => {
  const classes = useClasses();
  const users = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = React.useState<boolean>(false);

  const handleClose = () => setOpen(false);

  return (
    <Formik
      initialValues={task}
      validationSchema={Yup.object().shape({
        title: Yup.string()
          .required("Title is required")
          .max(100, "Max length is 100"),
        description: Yup.string()
          .required("Desctiption is required")
          .max(500, "Max length is 500"),
        assignedTo: Yup.object().required("Please assign this task to a user"),
        status: Yup.string().required("Workflow status is required"),
      })}
      onSubmit={(values) => {
        dispatch(
          Tasks.add({
            ...values,
            assignedTo: (values.assignedTo as IUser).id,
            dueDate:
              typeof values.dueDate === "string"
                ? values.dueDate
                : moment(values.dueDate).toISOString(),
          })
        );
        setOpen(true);
        setTimeout(() => {
          if (navigateAfterSave) {
            history.replace(`/task/${values.id}`);
          }
        }, 1500);
      }}
    >
      {({ touched, errors }) => (
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Field
                component={TextField}
                name="title"
                type="text"
                label="Title"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                component={TextField}
                name="description"
                type="text"
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                component={DatePicker}
                name="dueDate"
                label="Due Date"
                format="MMM dd yyyy"
                fullWidth
                inputVariant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                component={TextField}
                name="status"
                type="text"
                label="Workflow Status"
                variant="outlined"
                fullWidth
                select
              >
                <MenuItem value="todo">
                  {WorkFlowStatusLabels.get("todo")}
                </MenuItem>
                <MenuItem value="inprogress">
                  {WorkFlowStatusLabels.get("inprogress")}
                </MenuItem>
                <MenuItem value="done">
                  {WorkFlowStatusLabels.get("done")}
                </MenuItem>
              </Field>
            </Grid>
            <Grid item xs={12}>
              <Field
                name="assignedTo"
                component={Autocomplete}
                options={users}
                getOptionLabel={(option: IUser) => option.name || ""}
                renderOption={(option: IUser) => {
                  return (
                    <Box className={classes.userOption}>
                        <Avatar src={option.avatar} className={classes.userOptionAvatar}/>
                      <Typography>{option.name}</Typography>
                    </Box>
                  );
                }}
                renderInput={(params: AutocompleteRenderInputParams) => (
                  <MuiTextField
                    {...params}
                    fullWidth
                    error={touched["assignedTo"] && !!errors["assignedTo"]}
                    helperText={touched["assignedTo"] && errors["assignedTo"]}
                    label="Assigned To"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} className={classes.actions}>
              <Button type="reset" color="secondary" variant="contained">
                Reset
              </Button>
              <Button type="submit" color="primary" variant="contained">
                Submit
              </Button>
            </Grid>
          </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Task successfully saved!!!
        </Alert>
      </Snackbar>
        </Form>
      )}
    </Formik>
  );
};
