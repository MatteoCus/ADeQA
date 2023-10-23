import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggle, MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LogoutService } from 'src/app/services/logout/logout.service';
import { of } from 'rxjs';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let mockLogoutService: jasmine.SpyObj<LogoutService>;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    mockLogoutService = jasmine.createSpyObj('LogoutService', ['logout', 'logoutUserId']);
    mockMatDialog = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      imports: [
        MatToolbarModule,
        MatIconModule,
        MatSlideToggleModule,
        MatMenuModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        TranslateModule.forRoot(),
      ],
      declarations: [ToolbarComponent],
      providers: [
        { provide: LogoutService, useValue: mockLogoutService },
        { provide: MatDialog, useValue: mockMatDialog }
      ]
    });

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change active language - English', () => {
    const newLanguage = 'en'; // Change to English

    component.changeActiveLanguage(newLanguage);
    expect(component.activeLanguage).toEqual(newLanguage);
  });

  it('should change active language - Italian', () => {
    const newLanguage = 'it'; // Change to Italian

    component.changeActiveLanguage(newLanguage);
    expect(component.activeLanguage).toEqual(newLanguage);
  });

  it('should change active language - Spanish', () => {
    const newLanguage = 'es'; // Change to Spanish

    component.changeActiveLanguage(newLanguage);
    expect(component.activeLanguage).toEqual(newLanguage);
  });

  it('should toggle theme', () => {
    const initialTheme = component.isDark;

    component.toggleTheme({source: null as any as MatSlideToggle, checked: !initialTheme});
    expect(component.isDark).toEqual(!initialTheme);
  });

  it('should open a general logout dialog', () => {
    const dialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRef.afterClosed.and.returnValue(of({ event: 'exit-option' }));
  
    mockMatDialog.open.and.returnValue(dialogRef);
  
    component.openLogoutDialog();

    expect(mockMatDialog.open).toHaveBeenCalledWith(jasmine.any(Function), {
      data: { title: 'Logout generale', description: 'Occorre reinserire username e pin' }
    });
    expect(mockLogoutService.logout).toHaveBeenCalled();
  });

  it('should open a user logout dialog', () => {
    const dialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRef.afterClosed.and.returnValue(of({ event: 'exit-option' }));
  
    mockMatDialog.open.and.returnValue(dialogRef);
  
    component.openLogoutUserDialog();

    expect(mockMatDialog.open).toHaveBeenCalledWith(jasmine.any(Function), {
      data: { title: 'Logout parziale', description: 'Occorre reinserire il pin' }
    });
    expect(mockLogoutService.logoutUserId).toHaveBeenCalled();
  });

  it('should open a general logout dialog - and choose the "stay" option', () => {
    const dialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRef.afterClosed.and.returnValue(of({ event: 'stay-option' }));
  
    mockMatDialog.open.and.returnValue(dialogRef);
  
    component.openLogoutDialog();

    expect(mockMatDialog.open).toHaveBeenCalledWith(jasmine.any(Function), {
      data: { title: 'Logout generale', description: 'Occorre reinserire username e pin' }
    });
    expect(mockLogoutService.logout).toHaveBeenCalledTimes(0);
  });

  it('should open a user logout dialog - and choose the "stay" option', () => {
    const dialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRef.afterClosed.and.returnValue(of({ event: 'stay-option' }));
  
    mockMatDialog.open.and.returnValue(dialogRef);
  
    component.openLogoutUserDialog();

    expect(mockMatDialog.open).toHaveBeenCalledWith(jasmine.any(Function), {
      data: { title: 'Logout parziale', description: 'Occorre reinserire il pin' }
    });
    expect(mockLogoutService.logout).toHaveBeenCalledTimes(0);
  });

  it('should open a general logout dialog - and choose the "stay" option at first, then the "exit" option', () => {

    // stay
    const dialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRef.afterClosed.and.returnValue(of({ event: 'stay-option' }));
  
    mockMatDialog.open.and.returnValue(dialogRef);
  
    component.openLogoutDialog();

    expect(mockMatDialog.open).toHaveBeenCalledWith(jasmine.any(Function), {
      data: { title: 'Logout generale', description: 'Occorre reinserire username e pin' }
    });
    expect(mockLogoutService.logout).toHaveBeenCalledTimes(0);

    // exit
    dialogRef.afterClosed.and.returnValue(of({ event: 'exit-option' }));
  
    mockMatDialog.open.and.returnValue(dialogRef);
  
    component.openLogoutDialog();
    expect(mockMatDialog.open).toHaveBeenCalledWith(jasmine.any(Function), {
      data: { title: 'Logout generale', description: 'Occorre reinserire username e pin' }
    });
    expect(mockLogoutService.logout).toHaveBeenCalled();

  });

  it('should open a user logout dialog - and choose the "stay" option, then the "exit" option', () => {

    // stay
    const dialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRef.afterClosed.and.returnValue(of({ event: 'stay-option' }));
  
    mockMatDialog.open.and.returnValue(dialogRef);
  
    component.openLogoutUserDialog();

    expect(mockMatDialog.open).toHaveBeenCalledWith(jasmine.any(Function), {
      data: { title: 'Logout parziale', description: 'Occorre reinserire il pin' }
    });
    expect(mockLogoutService.logout).toHaveBeenCalledTimes(0);

    //exit
    dialogRef.afterClosed.and.returnValue(of({ event: 'exit-option' }));
  
    mockMatDialog.open.and.returnValue(dialogRef);
  
    component.openLogoutUserDialog();

    expect(mockMatDialog.open).toHaveBeenCalledWith(jasmine.any(Function), {
      data: { title: 'Logout parziale', description: 'Occorre reinserire il pin' }
    });
    expect(mockLogoutService.logoutUserId).toHaveBeenCalled();
  });
});
