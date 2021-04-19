import { TestBed } from '@angular/core/testing';

import { LocationService } from './location.service';

describe('LocationService', () => {
  let service: LocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getCurrentPosition should return a promise', () => {
    const location = {};
    spyOn(service, 'getCurrentPosition').and.returnValue(Promise.resolve(location));
    service.getCurrentPosition().then(res => {
      expect(res).toEqual(location);
    });
  });
});
