import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSearchListComponent } from './show-search-list.component';

describe('ShowSearchListComponent', () => {
  let component: ShowSearchListComponent;
  let fixture: ComponentFixture<ShowSearchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowSearchListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowSearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
