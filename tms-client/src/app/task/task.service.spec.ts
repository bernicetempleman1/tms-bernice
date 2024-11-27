import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TaskService } from './task';
import { Task } from './task';
import { environment } from '../../environments/environment';
import { AddTaskDTO } from './task';
import { UpdateTaskDTO } from './task';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService],
    });

    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add a new task via the API', () => {
    const newTask: AddTaskDTO = {
      title: 'Sunflower',
      priority: 'High',
      status: 'In Progress',
    };
    const mockResponse: Task = {
      _id: '3',
      projectId: 1,
      ...newTask,
    };
    service.addTask(newTask).subscribe((task) => {
      expect(task).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/tasks`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newTask);
    req.flush(mockResponse);
  });

  it('should update an existing task via the API', () => {
    const updatedTask: UpdateTaskDTO = {
      title: 'Sunflower',
      priority: 'High',
      status: 'In Progress',
      description: 'testing',
      dueDate: "2021-01-10T00:00:00.000Z",
      projectId: "1",
    };
    const mockResponse: Task = {
      _id: '3',
      projectId: 1,
      title: 'Sunflower',
      priority: 'High',
      status: 'In Progress',
      ...updatedTask,
    };
    service.updateTask('1', updatedTask).subscribe((task) => {
      expect(task).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/tasks/1`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(updatedTask);
    req.flush(mockResponse);
  });

});

