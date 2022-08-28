import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommPostsComponent } from './comm-posts.component';

describe('CommPostsComponent', () => {
  let component: CommPostsComponent;
  let fixture: ComponentFixture<CommPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommPostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
