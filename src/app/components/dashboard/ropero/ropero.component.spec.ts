import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoperoComponent } from './ropero.component';

describe('RoperoComponent', () => {
  let component: RoperoComponent;
  let fixture: ComponentFixture<RoperoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoperoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoperoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
