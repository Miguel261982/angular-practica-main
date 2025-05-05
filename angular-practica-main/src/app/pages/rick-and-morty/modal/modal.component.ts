import { isPlatformBrowser, NgFor, NgIf, TitleCasePipe } from "@angular/common";
import { Component, ElementRef, Inject, Input, PLATFORM_ID, ViewChild } from "@angular/core";
import { Personaje } from "../interfaces/personajes";


@Component({
    selector: 'rick-and-morty-modal',
    standalone: true,
    imports: [ TitleCasePipe, NgIf],
    templateUrl: './modal.component.html',
    styles:  ``
})
export class ModalComponent{
@Input() public personaje: Personaje = {
        id: 0,
  name: '',
  status: '',
  species: '',
  type: '',
  gender: '',
  origin: {
    name: '',
    url: ''
  },
  location: {
    name: '',
    url: ''
  },
  image: '',
  episode: [],
  url: '',
  created: new Date()
};

    private booststrapModal:any;

    @ViewChild('modalElement') public modalElement!: ElementRef;
    constructor(@Inject(PLATFORM_ID) private platformId: Object){}

    ngAfterViewInit(): void {
        if(isPlatformBrowser(this.platformId)){
            this.initializeModal();  
        }
    }

    initializeModal(): void {
        import('bootstrap').then((bootstrap)=>{
          this.booststrapModal = new bootstrap.Modal(this.modalElement.nativeElement)
        })
    }

    open(personaje:Personaje):void{
        this.personaje = personaje;
        if(isPlatformBrowser(this.platformId)){
            if(this.booststrapModal){
                this.booststrapModal.show();  
            }else{
                this.initializeModal();
                setTimeout(()=>{  
                    this.booststrapModal.show();
                },0)
            } 
        }
    }

    close(): void{
        this.booststrapModal.hide();
    }
}