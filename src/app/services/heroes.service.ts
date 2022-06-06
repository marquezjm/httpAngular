import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../model/heroe.model';
import { map,delay, catchError } from 'rxjs/operators'
import Swal from 'sweetalert2';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url ='https://heroes-25cdd-default-rtdb.firebaseio.com'

  constructor(private http: HttpClient) { }

  crearHeroe(heroe:HeroeModel){
    return this.http.post(`${this.url}/heroes.json`,heroe)
                .pipe(
                  map((resp:any)=>{
                    heroe.id=resp.name
                    return heroe
                  })
                );
  }

  actualizarHeroe(heroe:HeroeModel){
    const heroeTemp={
      ...heroe
    };
    delete heroeTemp.id;

    return this.http.put(`${this.url}/heroes/${heroe.id}.json`,heroeTemp);
  }

  getHeroes(){
    return this.http.get<HeroeModel[]>(`${this.url}/heroes.json`)
                .pipe(
                  map(this.crearArreglo),
                  delay(1500),
                  catchError(this.manejaError)
                );
  }

  manejaError(error:any){
    Swal.fire(
      {
        title:'Error',
        text:'Error',
        icon:'error'
      }
    )
    return throwError(()=>{return ''})
  }

  private crearArreglo(heroesObj:Object){
    const heroes:HeroeModel[]=[]
    if(heroesObj===null){
      return [];
    }
    Object.keys(heroesObj).forEach(key=>{
      //console.log(key,heroesObj[key as keyof typeof heroesObj]);
      
      const heroe:HeroeModel=heroesObj[key as keyof typeof heroesObj] as unknown as HeroeModel;
      heroe.id=key;
      heroes.push(heroe);
    });
    return heroes;
  }

  getHeroe(id:string){
    return this.http.get<HeroeModel>(`${this.url}/heroes/${id}.json`);
  }

  borrarHeroe(id:string|undefined){
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }
}
