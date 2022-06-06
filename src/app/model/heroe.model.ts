export class HeroeModel {
    id?:string;
    nombre:string;
    poder:string;
    vivo:boolean;
    constructor(){
        this.poder='';
        this.nombre='';
        this.vivo=true;
    }
}
