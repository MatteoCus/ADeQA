import { LOCALE_ID, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginUsernameComponent } from './components/login-username/login-username.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBar } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginPinComponent } from './components/login-pin/login-pin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LogModifierComponent } from './components/log-modifier/log-modifier.component';
import { PhasesComponent } from './components/phases/phases.component';
import { LogViewerComponent } from './components/log-viewer/log-viewer.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { LogoutDialogComponent } from './components/logout-dialog/logout-dialog.component';
import { SafePipe } from './pipes/safe-html.pipe';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ConfirmDataDialogComponent } from './components/confirm-data-dialog/confirm-data-dialog.component';
import { OptionsPipe } from './pipes/options.pipe';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import localeIt from '@angular/common/locales/it';
import { registerLocaleData } from '@angular/common';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { DxButtonModule, DxChartModule, DxTabPanelModule, DxTooltipModule } from 'devextreme-angular';
import { LogComponent } from './components/log/log.component';
import { LogChartComponent } from './components/log-chart/log-chart.component';

registerLocaleData(localeIt);


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

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
    ConfirmDataDialogComponent,
    SplashScreenComponent,
    LogComponent,
    LogChartComponent
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
    HttpClientModule,
    DxButtonModule,
    DxTabPanelModule,
    DxChartModule,
    DxTooltipModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'it'
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    DashboardComponent,
    MatSnackBar,
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { horizontalPosition: 'center', verticalPosition: 'top', duration: 3000 } },
    { provide: LOCALE_ID, useValue: 'it-IT' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
