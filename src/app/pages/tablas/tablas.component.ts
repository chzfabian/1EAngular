import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AbmAlumnosComponent } from './abm-alumnos/abm-alumnos.component';
import { find } from 'rxjs';


export interface Estudiante {
  id: number;
  nombre: string;
  apellido: string;
  fecha_nacimiento: Date;
  email: string;
}

@Component({
  selector: 'app-tablas',
  templateUrl: './tablas.component.html',
  styleUrls: ['./tablas.component.scss']
})
export class TablasComponent {

  estudiantes: Estudiante[] = [
    {
      id: 1,
      nombre: 'Luis',
      apellido: 'Diaz',
      fecha_nacimiento: new Date('1996-11-22'),
      email: 'luis_diaz22@gmail.com',
    },
    {
      id: 2,
      nombre: 'Diana',
      apellido: 'Peretti',
      fecha_nacimiento: new Date('1976-05-09'),
      email: 'diana_perreti76@hotmail.com',
    },
    {
      id: 3,
      nombre: 'Camilo',
      apellido: 'Rochetto',
      fecha_nacimiento: new Date('1981-02-18'),
      email: 'camilo_ro221@gmail.com',
    },
  ];

  dataSource = new MatTableDataSource(this.estudiantes);

  displayedColumns: string[] = ['id', 'nombreCompleto', 'fecha_nacimiento', 'email', 'actions'];

  aplicarFiltros(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement)?.value;
    this.dataSource.filter = inputValue?.trim()?.toLowerCase();
  }

  constructor(private MatDialog: MatDialog ) {}


  abrirABMAlumnos(): void {
    const dialog = this.MatDialog.open(AbmAlumnosComponent)
    dialog.afterClosed().subscribe((valor) => {
      if (valor) {
        this.dataSource.data = [
          ...this.dataSource.data,
          {
            ...valor,
            id: this.dataSource.data.length + 1,
          }
        ];
      }
    })
  }

  borrarAlumno(fila: Estudiante){
    let index = this.dataSource.data.findIndex(elemento => elemento.id === fila.id) ;
    this.dataSource.data.splice(index, 1);
    this.dataSource.data = this.dataSource.data;
  }

}
