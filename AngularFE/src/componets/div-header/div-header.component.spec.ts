import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivHeaderComponent } from './div-header.component';

describe('DivHeaderComponent', () => {
  let component: DivHeaderComponent;
  let fixture: ComponentFixture<DivHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DivHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DivHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
