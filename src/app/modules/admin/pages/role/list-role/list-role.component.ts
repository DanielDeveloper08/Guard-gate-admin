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
  urbanizationForm!: FormGroup;
  urbanizationData!: IUrbanization;

  constructor() {
    this.roles = [];
  }

  ngOnInit() {
    this.getUrbanization();
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

    this._roleService.getRoles(queryParams).subscribe({
      next: (res) => {
        this.roles = res.data.records.filter(
          (role) => role.name != RoleTypeEnum.ADMIN
        );
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
            console.log('res', res);
          },
        });

      return;
    }
    this._urbanizationService
      .saveUrbanization(this.urbanizationForm.value)
      .subscribe({
        next: (res) => {
          console.log('res', res);
        },
      });
  }

  getUrbanization() {
    this._urbanizationService.getUrbanization().subscribe({
      next: (res) => {
        console.log('res', res);
        this.urbanizationData = {
          address: res.data.address,
          name: res.data.name,
        };
        this.createForm();
      },
    });
  }
}
