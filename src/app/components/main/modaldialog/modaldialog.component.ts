import {
  ViewEncapsulation,
  ElementRef,
  Input,
  Component,
  OnInit,
} from '@angular/core';
import { ModalserviceService } from 'src/app/Services/modalservice.service';

@Component({
  selector: 'app-modaldialog',
  templateUrl: './modaldialog.component.html',
  styleUrls: ['./modaldialog.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ModaldialogComponent implements OnInit {
  @Input() id!: string;
  private element: any;

  constructor(private el: ElementRef) {
    // this.element = el.nativeElement;
  }

  ngOnInit(): void {


    // adicionamos isso para que, quando o pano de fundo for clicado, o modal seja fechado.
    // this.el.nativeElement.addEventListener('click', () => {
    //   this.close();
    // });


  }

  close() {
    this.el.nativeElement.classList.remove('sshow');
    this.el.nativeElement.classList.add('hhidden');
  }
}
