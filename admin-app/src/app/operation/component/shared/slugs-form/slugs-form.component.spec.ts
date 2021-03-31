import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlugsFormComponent } from './slugs-form.component';

describe('SlugsFormComponent', () => {
  let component: SlugsFormComponent;
  let fixture: ComponentFixture<SlugsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlugsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlugsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
