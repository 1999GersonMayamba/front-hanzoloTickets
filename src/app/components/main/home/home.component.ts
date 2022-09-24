import { Component, OnInit,  ViewChild } from '@angular/core';
import { FilePickerDirective, ReadFile, ReadMode } from "ngx-file-helpers";
import { GeneralConstants } from 'src/app/constants/GeneralConstants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public readMode = ReadMode.dataURL;
  public picked: ReadFile | null = null;
  public status: string | null = null;
  displayPay = 'none';
  displayNotPay = 'none';
  modal_t: any;

  @ViewChild("filePicker", { static: false })
  private filePicker: FilePickerDirective | null = null;

  constructor() { }

  ngOnInit(): void {

    let IsPago = localStorage.getItem(GeneralConstants.UserData.IsPago);
    if(IsPago === 'true')
    {
      this.displayNotPay = 'none'
      this.displayPay = 'block'
    }
    else
    {
      this.displayPay = 'none'
      this.displayNotPay = 'block'
    }

  }

  ignoreTooBigFile(file: File): boolean {
    return file.size < 100000;
  }

  onReadStart(fileCount: number) {
    this.status = `Reading ${fileCount} file(s)...`;
    console.log(this.status);
  }

  onFilePicked(file: ReadFile) {
    this.picked = file;
    console.log(this.picked);
  }

  onReadEnd(fileCount: number) {
    this.status = `Read ${fileCount} file(s) on ${new Date().toLocaleTimeString()}.`;
    if (this.filePicker !== null) {
     // this.filePicker.reset();
      console.log(this.status);
    }
  }

  //Mostrar o modal de termos e condições
showDialog(){
  this.modal_t  = document.getElementById('modal_1')
  this.modal_t.classList.remove('hhidden')
  this.modal_t.classList.add('sshow');
}

//Ocultar o modal de termos & condições
closeDialog() {
  this.modal_t  = document.getElementById('modal_1')
  this.modal_t.classList.remove('sshow')
  this.modal_t.classList.add('hhidden');
}



}
