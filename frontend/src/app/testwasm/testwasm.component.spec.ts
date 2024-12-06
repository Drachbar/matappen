import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestwasmComponent } from './testwasm.component';

describe('TestwasmComponent', () => {
  let component: TestwasmComponent;
  let fixture: ComponentFixture<TestwasmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestwasmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestwasmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
