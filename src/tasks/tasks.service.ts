import { Injectable, NotFoundException } from "@nestjs/common";
import { Task, TaskStatus } from "./task.modal";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks = (): Task[] => {
    return this.tasks;
  };
}
