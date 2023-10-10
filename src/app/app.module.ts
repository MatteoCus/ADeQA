import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginUsernameComponent } from './components/login-username/login-username.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBar} from '@angular/material/snack-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginPinComponent } from './components/login-pin/login-pin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LogModifierComponent } from './components/log-modifier/log-modifier.component';
import { PhasesComponent } from './components/phases/phases.component';
import { LogViewerComponent } from './components/log-viewer/log-viewer.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { LogoutDialogComponent } from './components/logout-dialog/logout-dialog.component';
import { SafePipe } from './pipes/safe-html.pipe';
import { MatSelectModule } from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ConfirmDataDialogComponent } from './components/confirm-data-dialog/confirm-data-dialog.component';
import { OptionsPipe } from './pipes/options.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginUsernameComponent,
    LoginPinComponent,
    DashboardComponent,
    LogModifierComponent,
    PhasesComponent,
    LogViewerComponent,
    SidenavComponent,
    ToolbarComponent,
    LogoutDialogComponent,
    SafePipe,
    OptionsPipe,
    ConfirmDataDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatDialogModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatCardModule,
    MatTableModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTooltipModule,
    ScrollingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    MatSnackBar,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {horizontalPosition: 'center', verticalPosition: 'top', duration: 3000}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
