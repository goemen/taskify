import React from "react";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { ITask } from "../models";
import { TaskForm } from "./TaskForm";
import FullscreenIcon from "@material-ui/icons/Fullscreen";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
      display: 'flex',
      alignItems: 'center'
    },
    spacer: {
        flex: '1 1 auto'
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
  onFullscreen: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, onFullscreen, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      <span className={classes.spacer}></span>
      <IconButton
        aria-label="fullscreen"
        onClick={onFullscreen}
      >
        <FullscreenIcon />
      </IconButton>
      <IconButton
        aria-label="close"
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

interface ITaskDialogProps {
  task: ITask;
  open: boolean;
  setOpen: (open: boolean) => void;
  openFullscreen: () => void;
}

export const TaskDialog: React.FC<ITaskDialogProps> = ({
  task,
  open,
  setOpen,
  openFullscreen,
}) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle
        id={task.id}
        onClose={handleClose}
        onFullscreen={openFullscreen}
      >
        Task Details
      </DialogTitle>
      <DialogContent dividers>
        <TaskForm task={task} />
      </DialogContent>
    </Dialog>
  );
};
