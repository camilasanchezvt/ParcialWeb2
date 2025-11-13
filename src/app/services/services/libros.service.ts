import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libro } from '../../libros-model/libros.models'; 

@Injectable({
  providedIn: 'root'
})
export class LibrosService { 
  
  // url de mockapi
  private apiUrl = 'https://69153cfe84e8bd126af92d13.mockapi.io/api/v1/libros';

  constructor(private http: HttpClient) { } 

  // trae todo
  getAll(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.apiUrl);
  }

  //  agrega
  save(libro: Partial<Libro>): Observable<Libro> {
    return this.http.post<Libro>(this.apiUrl, libro);
  }

  // borra
  delete(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  //actualiza
  update(id: string, libro: Partial<Libro>): Observable<Libro> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Libro>(url, libro);
  }
}