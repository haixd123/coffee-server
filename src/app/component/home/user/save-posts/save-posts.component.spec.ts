import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavePostsComponent } from './save-posts.component';

describe('SavePostsComponent', () => {
  let component: SavePostsComponent;
  let fixture: ComponentFixture<SavePostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavePostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavePostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
