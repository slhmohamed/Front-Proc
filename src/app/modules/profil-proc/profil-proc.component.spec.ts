import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilProcComponent } from './profil-proc.component';

describe('ProfilProcComponent', () => {
  let component: ProfilProcComponent;
  let fixture: ComponentFixture<ProfilProcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilProcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilProcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
