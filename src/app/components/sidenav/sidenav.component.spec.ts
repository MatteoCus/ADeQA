import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavComponent } from './sidenav.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { LogoutService } from 'src/app/services/logout/logout.service';
import { of } from 'rxjs';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;
  let mockLogoutService: jasmine.SpyObj<LogoutService>;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    mockLogoutService = jasmine.createSpyObj('LogoutService', ['logout', 'logoutUserId']);
    mockMatDialog = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatIconModule,
        TranslateModule.forRoot()
      ],
      declarations: [SidenavComponent],
      providers: [
        { provide: LogoutService, useValue: mockLogoutService },
        { provide: MatDialog, useValue: mockMatDialog }
      ]
    });
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
