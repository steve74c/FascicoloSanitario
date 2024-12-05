import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ResizeDirective } from 'src/componets/div-split-resizable/resize.directives';
import { DivSplitResizable } from 'src/componets/div-split-resizable/div-split-resizable.component';
import { DivLeftComponentNew } from 'src/componets/div-left-new/div-left-new.component';
import { DivRightNewComponent } from 'src/componets/div-right-new/div-right.component';
import { NgxtTreecontrolComponent } from 'src/componets/ngxt-treecontrol/ngxt-treecontrol.component';
import { PdfViewerModule } from 'ng2-pdf-viewer'; // <- import 
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ResizeDirective,
    DivSplitResizable,
    DivLeftComponentNew,
    DivRightNewComponent,
    NgxtTreecontrolComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    PdfViewerModule,
    NgxExtendedPdfViewerModule
  ],
  providers: [provideHttpClient(),],
  bootstrap: [AppComponent]
})
export class AppModule { }
