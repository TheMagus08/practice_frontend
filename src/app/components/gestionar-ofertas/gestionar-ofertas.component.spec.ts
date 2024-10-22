import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarOfertasComponent } from './gestionar-ofertas.component';

describe('GestionarOfertasComponent', () => {
  let component: GestionarOfertasComponent;
  let fixture: ComponentFixture<GestionarOfertasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionarOfertasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionarOfertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
