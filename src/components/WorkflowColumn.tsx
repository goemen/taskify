import * as React from "react";
import styled from "@material-ui/core/styles/styled";
import { useTasksList } from "../hooks";
import { ITask, WorkFlowStatus, WorkFlowStatusLabels } from "../models";
import { Grid, Typography } from "@material-ui/core";
import grey from "@material-ui/core/colors/grey";
import Box from "@material-ui/core/Box/Box";
import { TaskCard } from "./TaskCard";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../constants";
import { makeStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
import { useDispatch } from "react-redux";
import { Tasks } from "../store/reducers/tasks";

const Column = styled(Grid)(({ theme }) => ({
  background: grey[300],
  padding: theme.spacing(),
  display: "flex",
  flexDirection: "column",
}));

const WorkflowLabelWrapper = styled(Box)(() => ({
  width: "100%",
  backgroundColor: "#fff",
}));

const useClasses = makeStyles(_ => ({
  isDropOver: {
    backgroundColor: grey[400]
  }
}))

interface IWorkflowColumnProps {
  status: WorkFlowStatus;
}

export const WorkflowColumn: React.FC<IWorkflowColumnProps> = ({ status }) => {
  const classes = useClasses();
  const dispatch = useDispatch();
  const tasks = useTasksList((task) => task.status === status);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.TASK_CARD,
    drop: (task: ITask) => {
      dispatch(Tasks.updateTaskStatus({taskId: task.id, nextStatus: status}));
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  }), [status])

  return (
    <Column ref={drop} item xs={3} className={clsx({[classes.isDropOver]: isOver})}>
      <WorkflowLabelWrapper>
        <Typography variant="h6">{WorkFlowStatusLabels.get(status)}</Typography>
      </WorkflowLabelWrapper>
      {tasks.map((task) => (
        <TaskCard task={task} key={task.id} />
      ))}
    </Column>
  );
};
