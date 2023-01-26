import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonDeSortieComponent } from './bon-de-sortie.component';

describe('BonDeSortieComponent', () => {
  let component: BonDeSortieComponent;
  let fixture: ComponentFixture<BonDeSortieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BonDeSortieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BonDeSortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
