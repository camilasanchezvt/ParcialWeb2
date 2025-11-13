import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { LibrosService } from '../../services/services/libros.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Libro } from '../../libros-model/libros.models';

@Component({
  selector: 'app-libros-list',
  templateUrl: './libros-list.component.html',
  styleUrls: ['./libros-list.component.css']
})
export class LibrosListComponent implements OnInit {
  libros: Libro[] = [];
  librosFiltrados: Libro[] = [];
  filtroTexto: string = '';

  selectedLibro: Libro | null = null;
  newLibro: Partial<Libro> = {};
  modalRef: any;

  @ViewChild('editModal') editModal!: TemplateRef<any>;  constructor(private librosService: LibrosService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getAll();
  }

 
  getAll() {
    this.librosService.getAll().subscribe({
      next: (data: Libro[]) => {
        this.libros = data;
        this.librosFiltrados = data;
      },
      error: (err: any) => console.error('Error al cargar libros:', err)
    });
  }

 
  view(libro: Libro) {
    this.selectedLibro = { ...libro };
    this.newLibro = { ...libro };
    
    this.modalRef = this.modalService.open(this.editModal, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });
    this.modalRef.result.then(
        (result: any) => {
        }, 
        (reason: any) => {
            this.selectedLibro = null;
        }
    );
  }  
  save() {
    if ((this.newLibro as any).id) {
      this.update();
      return;
    }

    this.librosService.save(this.newLibro).subscribe({
      next: () => {
        this.getAll();
        this.newLibro = {};
        this.selectedLibro = null;
        if (this.modalRef) {
          this.modalRef.close('Save click');
        }
      },
      error: (err: any) => console.error('Error al guardar libro:', err)
    });
  }  
  update() {
    const id = (this.newLibro as any).id;
    if (!id) return;

    this.librosService.update(id, this.newLibro).subscribe({
      next: () => {
        this.getAll();
        this.newLibro = {};
        this.selectedLibro = null;
        if (this.modalRef) {
          this.modalRef.close('Update click');
        }
      },
      error: (err: any) => console.error('Error al actualizar libro:', err)
    });
  }  
  delete(id: string) {
    if (confirm('¿Estás seguro de que deseas eliminar este libro?')) {
      this.librosService.delete(id).subscribe({
        next: () => {
          this.getAll(); 
          this.newLibro = {};
          this.selectedLibro = null;
          if (this.modalRef) {
            this.modalRef.close('Delete click');
          }
        },
        error: (err: any) => console.error('Error al eliminar libro:', err)
      });
    }
  }  
  aplicarFiltro() {
    if (!this.filtroTexto) {
      this.librosFiltrados = this.libros;
      return;
    }
    const textoBusqueda = this.filtroTexto.toLowerCase();
    this.librosFiltrados = this.libros.filter(libro =>
      (libro.titulo || '').toLowerCase().includes(textoBusqueda) ||
      (libro.autor || '').toLowerCase().includes(textoBusqueda)
    );
  }
}