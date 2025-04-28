import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationCardComponent } from './location-card.component';
import { TranslateModule } from '@ngx-translate/core';

describe('LocationCardComponent', () => {
  let component: LocationCardComponent;
  let fixture: ComponentFixture<LocationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocationCardComponent],
      imports: [TranslateModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get country code', () => {
    const countryCode = component.getCountryCode('United States');
    expect(countryCode).toBe('us');
  });
});
