import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarGeneroComponent } from './listar-genero.component';

describe('ListarGeneroComponent', () => {
  let component: ListarGeneroComponent;
  let fixture: ComponentFixture<ListarGeneroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarGeneroComponent]
    });
    fixture = TestBed.createComponent(ListarGeneroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
