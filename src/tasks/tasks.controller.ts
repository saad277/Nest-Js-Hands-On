import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task, TaskStatus } from "./task.modal";
import { CreateTaskDto } from "./dto/create-task.dto";

@Controller("tasks")
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks();
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.createTask(createTaskDto);
  }

  @Delete("/:id")
  deleteTask(@Param("id") id: Number): void {
    return this.taskService.deleteTaskById(id);
  }

  @Get("/:id")
  getTaskById(@Param("id") id: Number): Task {
    return this.taskService.getTaskById(id);
  }

  @Patch("/:id/status")
  updateTaskStatus(
    @Param("id") id: Number,
    @Body("status") status: TaskStatus
  ): Task {
    return this.taskService.updateTaskStatus(id, status);
  }
}
