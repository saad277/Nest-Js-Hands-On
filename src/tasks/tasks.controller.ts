import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task } from "./tasks.entity";
import { CreateTaskDto } from "./dto/create-task-dto";
import { TaskStatusValidationPipe } from "./customPipes/task-status-validation-pipe";
import { TaskStatus } from "./task-status.enum";

@Controller("tasks")
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get("/:id")
  getTaskById(@Param("id", ParseIntPipe) id: number): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  @Delete()
  deleteTask(@Param("id", ParseIntPipe) id: number): void {
    this.taskService.deleteTask(id);
  }

  @Patch("/:id/status")
  updateTaskStatus(
    @Param("id") id: number,
    @Body("status", TaskStatusValidationPipe) status: TaskStatus
  ): Promise<Task> {
    return this.taskService.updateTask(id, status);
  }
}
