import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectmemberComponent } from './selectmember.component';

describe('SelectmemberComponent', () => {
  let component: SelectmemberComponent;
  let fixture: ComponentFixture<SelectmemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectmemberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectmemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
