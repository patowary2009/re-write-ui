import { TestBed } from '@angular/core/testing';

import { HidaUiService } from './hida-ui.service';

describe('HidaUiService', () => {
  let service: HidaUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HidaUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
