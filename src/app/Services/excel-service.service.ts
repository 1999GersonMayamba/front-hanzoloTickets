import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';


@Injectable({
  providedIn: 'root'
})
export class ExcelServiceService {


  constructor() { }

  public exportAsExcelFile(json: any[], excelFileName: string, totalDestino: any, totalTempoInteracao: any, totalCusto: any): void {

    let  myArray: any[] = [];
    let myArrayTotal: any[] = [];

    json.forEach(element => {

    let commentData =        {
       'Data da chamada': element.dataChamada,
       'Hora da chamada': element.horaChamada,
       'Utilizador': element.agentFirstName + ' ' + element.agentLastName,
       'Extensão': element.agent,
       'Destino': element.num,
       'Estado': element.callType == 'Outbound' ? 'Atendida' : 'Não atendida',
       'Tempo de interação': element.talkingTime,
       'Custo de chamada': element.custoCall,
     };

      myArray.push(commentData)

  });

  let commentDataTotal =        {
    'Total': '',
    'Hora da chamada Total': '',
    'Utilizador Total': '',
    'Extensão Total': '',
    'Destino':totalDestino,
    'Estado': '',
    'Tempo de interação Total': totalTempoInteracao,
    'Custo de chamada Total': totalCusto,
  };

  myArrayTotal.push(commentDataTotal)

    const myworksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(myArray);
    const myworksheeet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(myArrayTotal);
    const myworkbook: XLSX.WorkBook = { Sheets: { 'Interações': myworksheet, 'Total': myworksheeet }, SheetNames: ['Interações', 'Total'] };
    const excelBuffer: any = XLSX.write(myworkbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  public exportTableAsExcelFile(tableName: any, excelFileName: string): void {

    /* pass here the table id */
    let element = document.getElementById(tableName);
    console.log(element);
    const myworksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(tableName);
    const myworkbook: XLSX.WorkBook = { Sheets: { 'data': myworksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(myworkbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_exported'+ EXCEL_EXTENSION);
  }

}
