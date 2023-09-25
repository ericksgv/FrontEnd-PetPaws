import { TestBed } from '@angular/core/testing';

import { MascotaService } from '../Service/mascotaservice.service';

describe('MascotaserviceService', () => {
  let service: MascotaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MascotaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
