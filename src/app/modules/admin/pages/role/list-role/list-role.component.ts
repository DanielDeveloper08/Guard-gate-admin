import { Component, inject } from '@angular/core';
import {
  IGeneralRequestPagination,
  RoleTypeEnum,
} from 'src/app/shared/interfaces/general.interface';
import { IRole } from '../../../interfaces/role.interface';
import { RoleService } from '../../../services/role.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UrbanizationService } from '../../../services/urbanization.service';
import { IUrbanization } from '../../../interfaces/urbanization.interface';
import { ToastService } from 'src/app/shared/services';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.scss'],
})
export class ListRoleComponent {
  roles: IRole[];
  private _roleService = inject(RoleService);
  private _urbanizationService = inject(UrbanizationService);
  private _formBuilder = inject(FormBuilder);
  private _toastService = inject(ToastService);

  urbanizationForm!: FormGroup;
  urbanizationData!: IUrbanization;

  constructor() {
    this.roles = [];
  }

  ngOnInit() {
    this.getRoles();
  }

  createForm() {
    this.urbanizationForm = this._formBuilder.group({
      name: [this.urbanizationData.name, Validators.required],
      address: [this.urbanizationData.address, Validators.required],
    });
  }

  getRoles() {
    const queryParams: IGeneralRequestPagination = {
      limit: 1000,
    };
    const combinedObservables = forkJoin({
      obs1: this._roleService.getRoles(queryParams),
      obs2: this._urbanizationService.getUrbanization(),
    });

    combinedObservables.subscribe({
      next: (res) => {
        this.roles = res.obs1.data.records.filter(
          (role) => role.name != RoleTypeEnum.ADMIN
        );

        this.urbanizationData = {
          address: res.obs2.data.address,
          name: res.obs2.data.name,
        };
        this.createForm();
      },
    });
  }

  controlValueChange(formControl: FormControl, controlName: string) {
    if (this.urbanizationForm.get(controlName) !== formControl) {
      this.urbanizationForm.setControl(controlName, formControl);
    }
  }

  saveUrbanization() {
    if (this.urbanizationData.name) {
      this._urbanizationService
        .editarUrbanization(this.urbanizationForm.value)
        .subscribe({
          next: (res) => {
            this._toastService.showSuccess(res.message);
          },
          error: (err) => {
            this._toastService.showError(err.error.message);
          },
        });

      return;
    }
    this._urbanizationService
      .saveUrbanization(this.urbanizationForm.value)
      .subscribe({
        next: (res) => {
          this._toastService.showSuccess(res.message);
        },
        error: (err) => {
          this._toastService.showError(err.error.message);
        },
      });
  }
}
