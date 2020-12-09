import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.modal'

@Injectable()
export class TasksService {



    private tasks: Task[] = []

    getAllTasks = (): Task[] => {

        return this.tasks;
    }

    createTask(title: String, description: String) {

        const task: Task = {
            id: Math.floor(Math.random() * 101),
            title,
            description,
            status: TaskStatus.OPEN
        }

        this.tasks.push(task)

        return task;
    }

}
