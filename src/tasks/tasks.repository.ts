import { Task } from "./tasks.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task-dto";
import { TaskStatus } from "./task-status.enum";
import { GetTaskFilterDto } from "./customPipes/get-task-filter.dto";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  getTasks = async (filterDto: GetTaskFilterDto): Promise<Task[]> => {
    const { status, search } = filterDto;

    const query = this.createQueryBuilder("task");

    const tasks = await query.getMany();

    return tasks;
  };

  createTask = async (createTaskDto: CreateTaskDto): Promise<Task> => {
    const { title, description } = createTaskDto;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;

    task.save();

    return task;
  };
}
