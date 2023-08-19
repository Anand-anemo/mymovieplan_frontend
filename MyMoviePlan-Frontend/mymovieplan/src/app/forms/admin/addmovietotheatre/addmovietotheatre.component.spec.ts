import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmovietotheatreComponent } from './addmovietotheatre.component';

describe('AddmovietotheatreComponent', () => {
  let component: AddmovietotheatreComponent;
  let fixture: ComponentFixture<AddmovietotheatreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddmovietotheatreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddmovietotheatreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
