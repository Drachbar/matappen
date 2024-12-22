import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRecipeComponent } from './create-recipe.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('CreateRecipeComponent', () => {
  let component: CreateRecipeComponent;
  let fixture: ComponentFixture<CreateRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRecipeComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
