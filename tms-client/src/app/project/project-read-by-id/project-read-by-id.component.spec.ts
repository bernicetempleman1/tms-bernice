
/**
 * Author: Bernice Templeman
 * Date: 2 December 2024
 * File: project-read-by-id-component.spec.ts
 * Description: Tests for Display a project
 *
 */
//Reference: Krasso, R. (2024). Lean, MEAN, and Pragmatic: A Guide to Full-Stack JavaScript Development (page 172)

import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { ProjectReadByIdComponent } from './project-read-by-id.component';
import { ProjectService } from '../project.service';
import { Project, UpdateProjectDTO } from '../project';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProjectReadByIdComponent', () => {
  let component: ProjectReadByIdComponent;
  let fixture: ComponentFixture<ProjectReadByIdComponent>;
  let projectService: ProjectService;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule,
        ProjectReadByIdComponent,
      ],
      providers: [
        ProjectService,
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } },
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ProjectReadByIdComponent);
    component = fixture.componentInstance;
    projectService = TestBed.inject(ProjectService);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form when all fields are filled correctly', () => {
    component.projectForm.controls['name'].setValue('Test Garden');
    component.projectForm.controls['description'].setValue('Test Description');
    expect(component.projectForm.valid).toBeTrue();
  });

  it('should display title "Project Details"', () => {
    //Assign DOM to variable
    const compiled = fixture.nativeElement;
    //Select HTML element
    const title = compiled.querySelector('h1');

    //Check text content of h1 element
    expect(title).toBeTruthy();
    expect(title.textContent).toContain('Project Details');
  });
});
