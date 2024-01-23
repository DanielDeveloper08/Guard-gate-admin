import { Injectable, inject } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Position } from '../interfaces';
import { AnimationBuilder } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private _toastService = inject(ToastrService);

  private toastOptions = {
    progressBar: true,
  };

  async showSuccess(message = 'Proceso exitoso') {
    this._toastService.success(message, 'Aviso', this.toastOptions);
  }

  async showInfo(message: string) {
    this._toastService.info(message, 'Aviso', this.toastOptions);
  }

  async showWarning(message: string) {
    this._toastService.warning(message, 'Aviso', this.toastOptions);
  }

  async showError(message: string) {
    this._toastService.error(message, 'Aviso', this.toastOptions);
  }
}
