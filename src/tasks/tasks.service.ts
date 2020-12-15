import { Injectable } from "@nestjs/common";
import { Task, TaskStatus } from "./task.modal";

import { CreateTaskDto } from "./dto/create-task.dto";
import { title } from "process";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks = (): Task[] => {
    return this.tasks;
  };

  createTask(createTaskDto: CreateTaskDto) {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: Math.floor(Math.random() * 101),
      title,
      description,
      status: TaskStatus.OPEN
    };

    this.tasks.push(task);

    return task;
  }
}
