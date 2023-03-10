import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HARTableComponent } from './har-table.component';

describe('HARTableComponent', () => {
  let component: HARTableComponent;
  let fixture: ComponentFixture<HARTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HARTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HARTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
