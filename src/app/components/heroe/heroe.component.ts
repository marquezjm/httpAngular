import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HeroeModel } from 'src/app/model/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit,OnDestroy {

  heroe:HeroeModel=new HeroeModel();


  constructor(private heroeService: HeroesService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    const id=this.route.snapshot.paramMap.get('id');
    if(id!=='nuevo'){
      this.heroeService.getHeroe(id===null?'':id)
          .subscribe( (resp:HeroeModel) => {
            this.heroe=resp;
            this.heroe.id=id===null?'':id;
          }).unsubscribe();
    }
  }

  guardar(form: NgForm){
    if(form.invalid){
      console.log('Formulario inválido');
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando informacion',
      icon: 'info',
      allowOutsideClick: false
    });

    Swal.showLoading();

    let peticion:Observable<any>;

    if(this.heroe.id){
      peticion=this.heroeService.actualizarHeroe(this.heroe);
    }else{
      peticion=this.heroeService.crearHeroe(this.heroe);
    }

    peticion.subscribe(resp=>{
      Swal.fire({
        title: this.heroe.nombre,
        text:'Se actualizó correctamente',
        icon:'success'
      })
    }).unsubscribe()
  }

  ngOnDestroy(): void {
  }
}
