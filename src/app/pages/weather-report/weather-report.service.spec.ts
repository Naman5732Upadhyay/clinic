import { TestBed } from '@angular/core/testing';

import { WeatherReportService } from './weather-report.service';

describe('WeatherReortService', () => {
  let service: WeatherReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
