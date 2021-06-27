import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddIcon from '@material-ui/icons/Add'
import { useHistory } from "react-router-dom";
import { Page } from "../components";

const useClasses = makeStyles((_) => ({
  root: {
    flexDirection: "column",
  },
}));

export const OnBoardingPage = () => {
  const classes = useClasses();
  const  history = useHistory();

  const addTask = () => history.replace('/task')
  
  return (
    <Page className={classes.root}>
      <Typography variant="h4">Welcome To Taskify</Typography>
      <Typography variant="h6">Let us get started</Typography>
      <Button startIcon={<AddIcon/>} variant="contained" color="primary" onClick={addTask}>
        Add your first task
      </Button>
    </Page>
  );
};
