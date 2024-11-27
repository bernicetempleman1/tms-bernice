import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Task } from './task';
import { AddTaskDTO } from './task';
import { UpdateTaskDTO } from './task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}
  getPTasks() {
    return this.http.get<Task[]>(`${environment.apiBaseUrl}/api/tasks`);
  }

  getTask(taskId: string) {
    return this.http.get<Task>(
      `${environment.apiBaseUrl}/api/tasks/${taskId}`
    );
  }

  addTask(task: AddTaskDTO) {
    return this.http.post<Task>(`${environment.apiBaseUrl}/api/tasks`, task);
  }

  updateTask(taskId: string, updateTask: UpdateTaskDTO) {
    return this.http.patch<Task>(
      `${environment.apiBaseUrl}/api/tasks/${taskId}`,
      updateTask
    );
  }

  deleteTask(taskId: string) {
    return this.http.delete(`${environment.apiBaseUrl}/api/tasks/${taskId}`);
  }
}
