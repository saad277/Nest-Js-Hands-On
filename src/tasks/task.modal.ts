export interface Task {
  id: Number;
  title: String;
  description: String;
  status: TaskStatus;
}

export enum TaskStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE"
}
