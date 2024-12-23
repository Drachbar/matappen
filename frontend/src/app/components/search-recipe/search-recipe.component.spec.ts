import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRecipeComponent } from './search-recipe.component';
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('SearchRecipeComponent', () => {
  let component: SearchRecipeComponent;
  let fixture: ComponentFixture<SearchRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [SearchRecipeComponent],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();

    fixture = TestBed.createComponent(SearchRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
