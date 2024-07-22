import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivSplitResizable } from './div-split-resizable.component';

describe('DivSplitResizableComponent', () => {
  let component: DivSplitResizable;
  let fixture: ComponentFixture<DivSplitResizable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivSplitResizable ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DivSplitResizable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
