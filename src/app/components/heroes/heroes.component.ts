import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { HeroeModel } from 'src/app/model/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit,OnDestroy{

  heroes:HeroeModel[]=[];
  cargando=false;
  newSubscription: Subscription=new Subscription();
  constructor(private heroesService:HeroesService) {
    
  }

  ngOnInit(): void {
    this.cargando=true;
    this.newSubscription=this.heroesService.getHeroes()
        .subscribe(resp=>{
          /*console.log(resp);
          
          if(resp===null){
            resp=[];
          }*/
          this.heroes=resp;
          this.cargando=false;
        });
  }

  borrarHeroe(heroe:HeroeModel,i:number){
    Swal.fire({
      title:'¿Estas seguro?',
      text:`Estas seguro de borrar a ${heroe.nombre}`,
      icon:'question',
      showConfirmButton:true,
      showCancelButton:true
    }).then(resp=>{
        if(resp.value){
          this.heroes.splice(i,1)
          this.newSubscription=this.heroesService.borrarHeroe(heroe.id).subscribe();
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.newSubscription?.unsubscribe();
  }

}
