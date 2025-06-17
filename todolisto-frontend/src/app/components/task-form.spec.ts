import { TestBed } from '@angular/core/testing';

import { TaskForm } from './task-form';

describe('TaskForm', () => {
  let service: TaskForm;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskForm);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
