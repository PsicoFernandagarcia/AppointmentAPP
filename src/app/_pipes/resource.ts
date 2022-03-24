import {  Pipe, PipeTransform } from '@angular/core';
import { AppSettingsService } from '../_services/app-settings.service';
import * as data_esp from '../../assets/resources/lang-es.json';

@Pipe({name: 'translate'})
export class TranslatePipe implements PipeTransform {
    constructor(public appSettings: AppSettingsService){

    }
    loadResources(lang:string){
        this.appSettings.getJSON(lang).subscribe(data=>{
          localStorage.setItem("resources",JSON.stringify(data));
        })
      }
    transform(value:string |null): string {

        const lang = localStorage.getItem("lang")?.toString()||"es";
        const res_esp=   (data_esp as any);
        const res_en=   (data_esp as any);
        switch(lang){
          case "en": return !res_en[value ?? ''] ? value : res_en[value ?? ''];
          default: return !res_esp[value ?? ''] ? value : res_esp[value ?? ''];
        }
    }
}
