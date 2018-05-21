import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbdReportComponent } from './dbd-report.component';

describe('DbdReportComponent', () => {
  let component: DbdReportComponent;
  let fixture: ComponentFixture<DbdReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbdReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbdReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
