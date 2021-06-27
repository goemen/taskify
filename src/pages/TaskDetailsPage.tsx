import { Container } from "@material-ui/core";
import { Page, PageTitle, TaskForm } from "../components";
import { useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const TaskDetailsPage = () => {
  const {params} = useRouteMatch<{id: string}>();
  const task = useSelector((state: RootState) => state.tasks[params.id]);
  const user = useSelector((state: RootState) => state.users.find(x => x.id === task.assignedTo));

  return (
    <Page>
      <Container maxWidth="sm">
        <PageTitle variant="h4">Task Details</PageTitle>
        <TaskForm
          task={{...task, assignedTo: user!}}
        />
      </Container>
    </Page>
  );
};
