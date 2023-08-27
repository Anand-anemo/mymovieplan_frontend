import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovietoshowsComponent } from './movietoshows.component';

describe('MovietoshowsComponent', () => {
  let component: MovietoshowsComponent;
  let fixture: ComponentFixture<MovietoshowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovietoshowsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovietoshowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
