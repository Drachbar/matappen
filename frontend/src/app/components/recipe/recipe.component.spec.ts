import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RecipeComponent} from './recipe.component';
import { provideHttpClientTesting } from "@angular/common/http/testing";
import {ActivatedRoute, convertToParamMap} from "@angular/router";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('RecipeComponent', () => {
  let component: RecipeComponent;
  let fixture: ComponentFixture<RecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [RecipeComponent],
    providers: [{
            provide: ActivatedRoute,
            useValue: {
                snapshot: {
                    paramMap: convertToParamMap({ id: '1' }), // Mocka paramMap
                },
            }
        }, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();

    fixture = TestBed.createComponent(RecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
