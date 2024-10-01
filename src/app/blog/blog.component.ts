import { Component } from '@angular/core';
import { EditorComponent } from '@tinymce/tinymce-angular';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
})
export class BlogComponent  {
  dataModel: any;
  init: EditorComponent['init'] = {
    plugins: 'lists link image table code help wordcount',
  };
  

  onClick(){
    debugger;
    console.log(this.init);
    
  }
  change($event:any){
    debugger
    $event.editor.getContent();
  }
}
