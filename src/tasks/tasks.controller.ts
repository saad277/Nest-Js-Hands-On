import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from "./task.modal";

@Controller('tasks')
export class TasksController {


    constructor(private taskService: TasksService) {


    }

    @Get()
    getAllTasks(): Task[] {

        return this.taskService.getAllTasks()
    }

    @Post()
    createTask(@Body() body): Task {


        const { title, description } = body

        return this.taskService.createTask(title, description)

    }


}
