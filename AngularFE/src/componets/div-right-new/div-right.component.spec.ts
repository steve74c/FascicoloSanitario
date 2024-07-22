import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivRightNewComponent } from './div-right.component';

describe('DivRightComponent', () => {
  let component: DivRightNewComponent;
  let fixture: ComponentFixture<DivRightNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DivRightNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DivRightNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
