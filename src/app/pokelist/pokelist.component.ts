import { Component } from '@angular/core';
import { AppiService } from '../appi.service';


@Component({
  selector: 'app-pokelist',
  templateUrl: './pokelist.component.html',
  styleUrls: ['./pokelist.component.sass']
})
export class PokelistComponent {
 
  pokemons:any[]=[]
  clase_fondo!: String;

  constructor(
    private appiservice: AppiService
  ){}
  ngOnInit():void{
    this.appiservice.getPokemons()
    .subscribe((response:any)=>{
      /* this.totalPokemons=response.count; */

      response.results.forEach((result: { name: string; }) => {
        this.appiservice.getMoreData(result.name)
        .subscribe((response:any)=>{
          /* this.pokemons.push(response); */
          let type='';
    
          response.types.forEach((element: any) => {
            type=type+element.type.name.charAt(0).toUpperCase()+element.type.name.slice(1)+' '
          });

          this.pokemons.push({
                'name':response.name.charAt(0).toUpperCase()+response.name.slice(1),
                'img':response.sprites.front_default,
              'height':response.height,
              'health':response.stats[0].base_stat,
              'atack':response.stats[1].base_stat,
              'types':type});

              /*const tips = document.getElementById("type");
              switch ("tips") {
                case 'Fire':
                 tips.style.background = "blue";
                  break;
                case 'Water':
                  this.clase_fondo='azul'
                  break;
                case 'Grass ':
                  this.clase_fondo='verde'
                  break
                case 'Poison':
                  this.clase_fondo='rosa'
                  break
                case 'Bug':
                  this.clase_fondo='negro'
                  break
                case 'Flying':
                  this.clase_fondo='azul__claro'
                  break
                case 'Normal':
                  this.clase_fondo='naranja'
                  break
                case 'Fairy':
                  this.clase_fondo='rosa__claro'
                  break
                case 'Psychic':
                  this.clase_fondo='verde__claro'
                  break
                case 'Electric':
                  this.style.clase_fondo='amarillo'
                  break*/
    
    
              

        })
      });
    });
  }
}