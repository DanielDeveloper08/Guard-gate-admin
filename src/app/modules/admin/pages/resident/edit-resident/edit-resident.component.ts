import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/shared/services';
import { ResidentService } from '../../../services/resident.service';
import { IResident } from '../../../interfaces/resident.interface';
import { UserService } from '../../../services/user.service';
import { IUser } from '../../../interfaces/user.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonModal } from '@ionic/angular';
import { Position } from 'src/app/shared/interfaces';
import { ResidenceService } from '../../../services/residence.service';

@Component({
  selector: 'app-edit-resident',
  templateUrl: './edit-resident.component.html',
  styleUrls: ['./edit-resident.component.scss'],
})
export class EditResidentComponent implements OnInit {
  private _userService = inject(UserService);
  private _residenceService = inject(ResidenceService);
  private _toastService = inject(ToastService);
  private _activatedRoute = inject(ActivatedRoute);
  private _formBuilder = inject(FormBuilder);
  idResident!: number;
  userData!: IUser;
  filterText!: string;

  residenceForm!: FormGroup;

  editing!:boolean;
  residenceId!:number;

  @ViewChild('modal') modal!: IonModal;

  constructor(public alertController: AlertController) {}

  ngOnInit() {
    this.createForm();
    this._activatedRoute.params.subscribe((params) => {
      this.idResident = params['id'];
    });

    this.getResidentWithHomes();
  }

  getResidentWithHomes() {
    this._userService.getUser(this.idResident.toString()).subscribe({
      next: (res) => {
        this.userData = res.data;
        this.userData.residences = res.data.residences.map((residence,id) => {
          residence.num = id+1;
          return residence;
        })
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }

  filterTextChange(formControl: FormControl) {
    this.filterText=formControl.value;
  }

  addResidence(){
    this.editing=false;
    this.residenceForm.reset();
    this.modal.present();
  }

  editResidence(residenceIndex:number){
    this.editing=true;
    this.residenceId=this.userData.residences[residenceIndex].id;
    this.residenceForm.patchValue(this.userData.residences[residenceIndex]);
    this.modal.present();
  }

  closeModal(){
    this.modal.dismiss();
  }

  createForm() {
    this.residenceForm = this._formBuilder.group({
      block: ['', Validators.required],
      town: ['', Validators.required],
      urbanization: ['', Validators.required]
    });
  }

  controlValueChange(formControl: FormControl, controlName:string) {
    if (this.residenceForm.get(controlName) !== formControl) {
      this.residenceForm.setControl(controlName, formControl);
    }
  }

  private updateResidence() {

    this._residenceService.updateResidence(this.residenceId,
      {
        personId:this.userData.personId,
        ...this.residenceForm.value
      }).subscribe({
      next: (res) => {
        this._toastService.showSuccess(res.message  );
        this.getResidentWithHomes();
        this.modal.dismiss();
      },
      error:(err)=>{
        this._toastService.showError(err.error.message  );
      }
    });
  }

  private deleteResidence(residenceId:number) {

    this._residenceService.deleteResidence(residenceId).subscribe({
      next: (res) => {
        this.getResidentWithHomes();
        this._toastService.showSuccess(res.message  );
      },
      error:(err)=>{
        this._toastService.showError(err.error.message  );
      }
    });
  }

  private setMainResidence(residenceId:number) {

    this._residenceService.setMainResidence(residenceId, this.userData.id).subscribe({
      next: (res) => {
        this.getResidentWithHomes();
        this._toastService.showSuccess(res.message  );
      },
      error:(err)=>{
        this._toastService.showError(err.error.message  );
      }
    });
  }

  private createResidence() {

    this._residenceService.createResidence(
      {
        personId:this.userData.personId,
        ...this.residenceForm.value
      }).subscribe({
      next: (res) => {
        this._toastService.showSuccess(res.message  );
        this.getResidentWithHomes();
        this.modal.dismiss();
      },
      error:(err)=>{
        this._toastService.showError(err.error.message  );
      }
    });
  }

  saveChanges(){
    if(!this.residenceForm.valid){
      this._toastService.showError('Debe llenar todos los campos.'  );
      return;
    }

    if(this.editing){
      this.updateResidence();
    }
    else{
      this.createResidence();
    }
  }

  async deleteResidenceAlert(residenceId:number, residenceIndex:number) {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: `¿Está seguro de que desea eliminar la residencia Manzana ${this.userData.residences[residenceIndex].block} Villa ${this.userData.residences[residenceIndex].town}?`,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Sí',
          handler: () => {
            this.deleteResidence(residenceId);
          }
        }
      ]
    });

    await alert.present();
  }

  async setMainResidenceAlert(residenceId:number, residenceIndex:number) {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: `¿Está seguro de que desea establecer la residencia Manzana ${this.userData.residences[residenceIndex].block} Villa ${this.userData.residences[residenceIndex].town} como principal?`,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Sí',
          handler: () => {
            this.setMainResidence(residenceId);
          }
        }
      ]
    });

    await alert.present();
  }
}
