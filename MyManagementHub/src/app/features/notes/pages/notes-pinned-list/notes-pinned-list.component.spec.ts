import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesPinnedList } from './notes-pinned-list.component';

describe('NotesPinnedList', () => {
  let component: NotesPinnedList;
  let fixture: ComponentFixture<NotesPinnedList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesPinnedList],
    }).compileComponents();

    fixture = TestBed.createComponent(NotesPinnedList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
