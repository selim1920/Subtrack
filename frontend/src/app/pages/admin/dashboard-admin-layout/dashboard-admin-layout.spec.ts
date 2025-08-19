import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAdminLayout } from './dashboard-admin-layout';

describe('DashboardAdminLayout', () => {
  let component: DashboardAdminLayout;
  let fixture: ComponentFixture<DashboardAdminLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAdminLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAdminLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
