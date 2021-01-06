import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { async } from "rxjs";
import { GetTaskFilterDto } from "./customPipes/get-task-filter.dto";
import { CreateTaskDto } from "./dto/create-task-dto";
import { TaskStatus } from "./task-status.enum";
import { Task } from "./tasks.entity";
import { TaskRepository } from "./tasks.repository";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) {}

  getTasks(filterDto: GetTaskFilterDto) {
    return this.taskRepository.getTasks(filterDto);
  }

  getTaskById = async (id: number): Promise<Task> => {
    const found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with ${id} not found`);
    }

    return found;
  };

  createTask = async (createTaskDto: CreateTaskDto): Promise<Task> => {
    return this.taskRepository.createTask(createTaskDto);
  };

  deleteTask = async (id: number): Promise<void> => {
    const result = await this.taskRepository.delete(id);

    if (result.affected == 0) {
      throw new NotFoundException(`Task with ${id} not found`);
    }
  };

  updateTask = async (id: number, status: TaskStatus): Promise<Task> => {
    const task = await this.getTaskById(id);

    task.status = status;
    await task.save();

    return task;
  };
}
