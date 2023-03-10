import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bottype } from '../BotTypes/bottype';

@Injectable({
  providedIn: 'root'
})
export class BotSeriveService {
 
  //baseUrl:any= "http://localhost:54850/api/File_upload";

  baseUrl:any= "http://localhost:34610/api/File_Upload";
  
  // baseUrl:any= "http://localhost:5135/api/File_upload";

  constructor(private http:HttpClient) { }

  GetBotDeatil():Observable<Bottype>{
    return this.http.get<Bottype>("http://dev.mobito.co.in/api/on-board-manager//botdetail/list/1787");
  }
  createFolder( directoryName:string,accessLevel:string) { 
      const headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
  // return this.http.post<any>(`${this.baseUrl}`,body,{headers:headers});
   
    return this.http.post<any>(`${this.baseUrl}/CreateFolder?directoryName=${directoryName}&accessLevel=${accessLevel}`,{headers:headers})
  }
 createFile(fileName:string,fileContent:string){
  const headers = new HttpHeaders({
    'Content-Type':'application/json'
  });
  return this.http.post<any>(`${this.baseUrl}/CreateFile?fileName=${fileName}&fileContent=${fileContent}`,{headers:headers})
 }

uploadFile(payload:any){
  const headers = new HttpHeaders({
    'Content-Type':'multipart/form-data'
  });
  return this.http.post<any>(`${this.baseUrl}/uploadfile`,{headers:headers},payload)
}
 Get_HAR_data(folderName:string){
  return this.http.get<any>(`${this.baseUrl}/files/HAR_Repository`);
}

add(arg0: { severity: string; summary: string; detail: string; }) {
  throw new Error('Method not implemented.');
}
}
