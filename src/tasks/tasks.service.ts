import { Injectable, NotFoundException } from "@nestjs/common";
import { Task, TaskStatus } from "./task.modal";

import { CreateTaskDto } from "./dto/create-task.dto";

import { GetTaskFilterDto } from "./dto/get-tasks-filter.dto";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks = (): Task[] => {
    return this.tasks;
  };

  getTaskById = (id: Number): Task => {
    const found = this.tasks.find((task) => {
      return task.id == id;
    });

    if (!found) {
      throw NotFoundException;
    } else {
      return found;
    }
  };

  deleteTaskById = (id: Number): void => {
    const found = this.getTaskById(id);

    this.tasks.filter((task) => {
      return task.id !== found.id;
    });
  };

  updateTaskStatus = (id: Number, status: TaskStatus): Task => {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  };

  getTaskWithFilter(filterDto: GetTaskFilterDto): Task[] {
    const { status, search } = filterDto;

    let tasks = this.getAllTasks();

    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search)
      );

      return tasks;
    } else return tasks;
  }

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
