import { TestBed } from '@angular/core/testing';

import { GetFileDocumentService } from './get-file-document.service';

describe('GetFileDocumentService', () => {
  let service: GetFileDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetFileDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
