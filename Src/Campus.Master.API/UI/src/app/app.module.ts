import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from '@shared/shared.module';
import { AppComponent } from './app.component';
import { UserPageLayoutComponent } from './views/user-page-layout/user-page-layout.component';
import { ConfirmDialogComponent } from '@shared/dialogs/confirm-dialog/confirm-dialog.component';
import { EditProjectDialogComponent } from '@shared/dialogs/edit-project-dialog/edit-project-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { LeftSidebarComponent } from '@core/left-sidebar/left-sidebar.component';
import { ToastrModule } from 'ngx-toastr';
import { CoreModule } from '@core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    LeftSidebarComponent,
    UserPageLayoutComponent,
    ConfirmDialogComponent,
    EditProjectDialogComponent,
  ],
  imports: [
    CoreModule,
    SharedModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  entryComponents: [EditProjectDialogComponent, ConfirmDialogComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
}
