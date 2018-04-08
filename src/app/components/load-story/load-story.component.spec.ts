import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadStoryComponent } from './load-story.component';

describe('LoadStoryComponent', () => {
  let component: LoadStoryComponent;
  let fixture: ComponentFixture<LoadStoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadStoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
