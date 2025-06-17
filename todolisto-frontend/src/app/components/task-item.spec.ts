import { TestBed } from '@angular/core/testing';

import { TaskItem } from './task-item';

describe('TaskItem', () => {
  let service: TaskItem;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskItem);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
