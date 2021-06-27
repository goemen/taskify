import * as React from "react";
import { useUser } from "../hooks";
import { ITask } from "../models";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router-dom";
import { TaskDialog } from "./TaskDialog";
import { useDispatch } from "react-redux";
import { Tasks } from "../store/reducers/tasks";
import { ItemTypes } from "../constants";
import { useDrag } from "react-dnd";
import clsx from "clsx";
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "100%",
    marginTop: theme.spacing(),
    position: "relative",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  drag: {
    position: "absolute",
    top: theme.spacing(),
    right: theme.spacing(),
    cursor: "move",
  },
  dragging: {
    cursor: "move",
    opacity: 0.5,
  },
}));

export interface ITaskCardProps {
  task: ITask;
}

export const TaskCard: React.FC<ITaskCardProps> = ({ task }) => {
  const user = useUser(task.assignedTo as string);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TASK_CARD,
    item: task,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const openFullscreen = () => {
    setOpen(false);
    history.push(`/task/${task.id}`);
  };

  const edit = () => {
    setOpen(true);
  };

  const remove = () => {
    dispatch(Tasks.delete(task.id));
  };

  return (
    <>
      <Card
        ref={drag}
        className={clsx(classes.root, { [classes.dragging]: isDragging })}
      >
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {task.title}
          </Typography>
          <Typography variant="body2" component="p">
            {task.description}
          </Typography>
          {task.dueDate && (
            <Typography variant="caption" component="p">
              {moment(task.dueDate).format('MMM Do YYYY')}
            </Typography>
          )}
        </CardContent>
        <CardHeader
          avatar={<Avatar src={user?.avatar} aria-label={user?.name} />}
          title={user?.name}
        />
        <CardActions>
          <IconButton onClick={edit}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={remove}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
        <IconButton className={classes.drag}>
          <DragIndicatorIcon />
        </IconButton>
      </Card>
      <TaskDialog
        task={{ ...task, assignedTo: user! }}
        open={open}
        setOpen={setOpen}
        openFullscreen={openFullscreen}
      />
    </>
  );
};
