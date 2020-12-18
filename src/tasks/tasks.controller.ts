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
  ValidationPipe
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task, TaskStatus } from "./task.modal";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTaskFilterDto } from "./dto/get-tasks-filter.dto";
import { TaskStatusValidationPipe } from "./customPipes/task-status-validation-pipe";

@Controller("tasks")
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto): Task[] {
    console.log(filterDto);

    if (Object.keys(filterDto).length) {
      this.taskService.getTaskWithFilter(filterDto);
    } else {
      return this.taskService.getAllTasks();
    }
  }

  @Post()
  @UsePipes(ValidationPipe)
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
    @Body("status", TaskStatusValidationPipe) status: TaskStatus
  ): Task {
    return this.taskService.updateTaskStatus(id, status);
  }
}
