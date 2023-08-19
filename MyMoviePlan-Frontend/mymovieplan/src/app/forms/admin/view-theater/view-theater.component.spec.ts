import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTheaterComponent } from './view-theater.component';

describe('ViewTheaterComponent', () => {
  let component: ViewTheaterComponent;
  let fixture: ComponentFixture<ViewTheaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTheaterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTheaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
