import { TestBed } from '@angular/core/testing';

import { TaskList } from './task-list';

describe('TaskList', () => {
  let service: TaskList;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskList);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
