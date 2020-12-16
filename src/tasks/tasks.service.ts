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

  getTaskById = (id: Number): Task => {
    return this.tasks.find((task) => {
      return task.id == id;
    });
  };

  deleteTaskById = (id: Number): void => {
    this.tasks.filter((task) => {
      return task.id !== id;
    });
  };

  updateTaskStatus = (id: Number, status: TaskStatus): Task => {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  };

  createTask(createTaskDto: CreateTaskDto): Task {
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
