import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { QueryBuilderService } from 'src/app/shared/services/query-builder.service';
import { environment } from 'src/environments/environment';
import {
  IUrbanization,
  IUrbanizationResponse,
} from '../interfaces/urbanization.interface';
import { IGeneralResponse } from 'src/app/shared/interfaces/general.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UrbanizationService {
  private _httpClient = inject(HttpClient);
  urlBase: string = environment.URL_API;
  private _queryBuilderService = inject(QueryBuilderService);

  saveUrbanization(
    params: IUrbanization
  ): Observable<IGeneralResponse<IUrbanizationResponse>> {
    return this._httpClient.post<IGeneralResponse<IUrbanizationResponse>>(
      `${this.urlBase}/urbanization`,
      params
    );
  }

  editarUrbanization(
    params: IUrbanization
  ): Observable<IGeneralResponse<IUrbanizationResponse>> {
    return this._httpClient.put<IGeneralResponse<IUrbanizationResponse>>(
      `${this.urlBase}/urbanization/1`,
      params
    );
  }

  getUrbanization(): Observable<IGeneralResponse<IUrbanizationResponse>> {
    return this._httpClient.get<IGeneralResponse<IUrbanizationResponse>>(
      `${this.urlBase}/urbanization/1`
    );
  }
}
