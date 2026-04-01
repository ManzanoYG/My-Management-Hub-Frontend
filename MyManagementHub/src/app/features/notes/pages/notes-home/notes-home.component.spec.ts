import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesHome } from './notes-home.component';

describe('NotesHome', () => {
  let component: NotesHome;
  let fixture: ComponentFixture<NotesHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesHome],
    }).compileComponents();

    fixture = TestBed.createComponent(NotesHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
