import { Container } from "@material-ui/core";
import { Page, PageTitle, TaskForm } from "../components";
import { v4 } from "uuid";

export const AddTaskPage = () => {
  return (
    <Page>
      <Container maxWidth="sm">
        <PageTitle variant='h4'>Create a task</PageTitle>
        <TaskForm
          task={{
            id: v4(),
            title: "",
            description: "",
            assignedTo: "",
            status: "todo",
          }}
          navigateAfterSave
        />
      </Container>
    </Page>
  );
};
