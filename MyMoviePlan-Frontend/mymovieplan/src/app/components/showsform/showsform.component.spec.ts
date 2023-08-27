import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowsformComponent } from './showsform.component';

describe('ShowsformComponent', () => {
  let component: ShowsformComponent;
  let fixture: ComponentFixture<ShowsformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowsformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowsformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
