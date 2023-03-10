import { Component,ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BotSeriveService } from '../BotService/bot-serive.service';
import { data } from '../BotTypes/bottype';

@Component({
  selector: 'app-bot-table',
  templateUrl: './bot-table.component.html',
  styleUrls: ['./bot-table.component.css'],
})
export class BotTableComponent {
  Apivalue: data[] = [];
  display: boolean = false;
  bot_info: boolean = false;
  add_bot: boolean = false;
  keys: any;
  botdetail!: data;
  first = 0;
  rows = 10;
  selectedItem1:any;
  @ViewChild('dt') dt: any;
  bot_name!: string | any ;
  //new_repo
  cities!: any[];
  selected_option: any | string;
  stateOptions!: any[];
  value1: string = "on";
  dummy!:FormGroup; 
  name!:string; 
  visibility!:string;
  file_name!:string;
  content!:string;
  create_repo: boolean = false;
  upload:boolean = false;
  options: any[];
  upload_name!:string;
  uploadedFiles: any[] = [];
  uploadedFile: any;
  HAR_Data: any;

  constructor(private Service: BotSeriveService) {
    this.stateOptions = [{label: 'Public', value: 'public'},{label: 'Private', value: 'private'}];
    this.cities = [
      {name: 'AWS'},
      {name: "Azure"},
      {name: "Google Cloud"}
  ];
  this.options=[
    {name:"Create File"},
    {name:"Upload File"}
  ]
  }
  
  ngOnInit() {
    this.Service.GetBotDeatil().subscribe({
      next: (res) => {
        this.Apivalue = res.Data.data;
        this.Apivalue = this.removeDuplicates(this.Apivalue);
      },
    });
    this.Service.Get_HAR_data("HAR_Repository").subscribe({
     next:(res) =>{
      this.HAR_Data = res;
     }
    })
  }

  customSort(event: any) {
    event.data.sort((data1: any, data2: any) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null) result = -1;
      else if (value1 != null && value2 == null) result = 1;
      else if (value1 == null && value2 == null) result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

      return event.order * result;
    });
  }
  showDialog(val: number) {
    this.bot_info = true;
    this.keys = Object.values(this.Apivalue);
    this.keys.filter((x: data) => {
      if (x.bot_configuration_id === val){
        this.botdetail = x;
      }
    });
  }
  addfile(){
   this.add_bot = true;
  }
  Create_repo(){
    this.create_repo= true;
   }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
  removeDuplicates(bots: any[]): any[] {
    const uniqueBots = [];
    const botIds = new Set();
    for (const bot of bots) {
      if (!botIds.has(bot.bot_configuration_id)) {
        botIds.add(bot.bot_configuration_id);
        uniqueBots.push(bot);
      }
    }
    return uniqueBots;
  }
  // visibility
  visibility_fn(event:any){
   this.visibility = event.value;
   }

 //Create Repo
  createfolder(): void { 
    console.log(this.visibility)
    this.visibility_fn(event);
    console.log(this.name,this.visibility);
    console.log(this.visibility)
    this.Service.createFolder(this.name, "public")
    .subscribe(res => console.log('Folder Created Successfully')
    , error => console.log(error) ); 
  }
  //Create file
  createfile():void{
    console.log(this.file_name,this.content);
    this.Service.createFile(this.file_name,this.content)
    .subscribe(res => console.log('File Created Successfully')
    , error => console.log(error) ); 
  }

  ChangePaxType(event:any){
    console.log(event);
    if(event.value.name == "Create File"){
      this.add_bot = true;
    };
    if(event.value.name == "Upload File"){
      this.upload = true;
    }
 }

//HAR_DATA
HAR(){
  this.upload = true;
console.log(this.upload_name)
   this.Service.Get_HAR_data(this.upload_name).subscribe({
    next: (res) => {
      this.HAR_Data = res;
    }
   })
}

onUpload(event:any) {
  console.log("hjkb");
  for(let file of event.files) {
      this.uploadedFiles.push(file);
      this.uploadedFile = file;
  }
  this.uploadFileToActivity();
}
uploadFileToActivity() {
  this.Service.uploadFile(this.uploadedFile).subscribe(data => {
    alert('Success');
  }, error => {
    console.log(error);
  });
}
  
}

