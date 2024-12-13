import { TestBed } from '@angular/core/testing';

import { ListTreePathFilesService } from './list-tree-path-files.service';

describe('ListTreePathFilesService', () => {
  let service: ListTreePathFilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListTreePathFilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
