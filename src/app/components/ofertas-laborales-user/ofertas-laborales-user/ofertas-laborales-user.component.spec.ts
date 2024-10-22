import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertasLaboralesUserComponent } from './ofertas-laborales-user.component';

describe('OfertasLaboralesUserComponent', () => {
  let component: OfertasLaboralesUserComponent;
  let fixture: ComponentFixture<OfertasLaboralesUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfertasLaboralesUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfertasLaboralesUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
