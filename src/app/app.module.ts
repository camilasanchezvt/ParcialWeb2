import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';                    
import { HttpClientModule } from '@angular/common/http';      
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';    
import { AppComponent } from './app.component';
import { LibrosListComponent } from './components/libros-list/libros-list.component'; 

@NgModule({
  declarations: [
    AppComponent,
    LibrosListComponent                                         
  ],
  imports: [
    BrowserModule,
    FormsModule,                                                
    HttpClientModule,                                           
    NgbModule                                                   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
