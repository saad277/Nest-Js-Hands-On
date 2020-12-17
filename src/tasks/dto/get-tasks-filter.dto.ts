import { TaskStatus } from "../task.modal";

export class GetTaskFilterDto {
  status: TaskStatus;
  search: string;
}
