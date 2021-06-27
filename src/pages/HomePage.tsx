import * as React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { WorkflowColumn } from "../components";
import Typography from "@material-ui/core/Typography";
import { useTasksCount } from "../hooks";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const useClasses = makeStyles((theme) => ({
  tasks: {
    marginBottom: theme.spacing(2),
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export const HomePage = () => {
  const classes = useClasses();
  const history = useHistory();
  const numberOfTasks = useTasksCount();

  const goToCreateTask = () => history.push("/task");

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <DndProvider backend={HTML5Backend}>
          <Grid
            className={classes.tasks}
            container
            spacing={3}
            justify="center"
          >
            <WorkflowColumn status="todo" />
            <WorkflowColumn status="inprogress" />
            <WorkflowColumn status="done" />
          </Grid>
        </DndProvider>
        {numberOfTasks === 0 && (
          <Typography variant="caption" color="initial">
            You do not have tasks!!
          </Typography>
        )}
      </Container>
      <Fab
        aria-label="createtask"
        className={classes.fab}
        color="primary"
        onClick={goToCreateTask}
      >
        <AddIcon />
      </Fab>
    </React.Fragment>
  );
};
