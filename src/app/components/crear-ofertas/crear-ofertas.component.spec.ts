import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearOfertasComponent } from './crear-ofertas.component';

describe('CrearOfertasComponent', () => {
  let component: CrearOfertasComponent;
  let fixture: ComponentFixture<CrearOfertasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearOfertasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearOfertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
