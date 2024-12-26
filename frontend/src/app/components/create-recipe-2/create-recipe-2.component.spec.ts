import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRecipe2Component } from './create-recipe-2.component';

describe('CreateRecipe2Component', () => {
  let component: CreateRecipe2Component;
  let fixture: ComponentFixture<CreateRecipe2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRecipe2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRecipe2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
