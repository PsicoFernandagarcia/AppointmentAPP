import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import { BlogRoutingModule } from './blog-routing.module';
import { EditorComponent } from '@tinymce/tinymce-angular';



@NgModule({
  declarations: [
    BlogComponent,
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    EditorComponent,
  ],
  exports:[BlogComponent]
})
export class BlogModule { }
