import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrdSpComponent } from './prd-sp.component';

describe('PrdSpComponent', () => {
  let component: PrdSpComponent;
  let fixture: ComponentFixture<PrdSpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrdSpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrdSpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
