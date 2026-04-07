import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesAllList } from './notes-all-list.component';

describe('NotesAllList', () => {
  let component: NotesAllList;
  let fixture: ComponentFixture<NotesAllList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesAllList],
    }).compileComponents();

    fixture = TestBed.createComponent(NotesAllList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
