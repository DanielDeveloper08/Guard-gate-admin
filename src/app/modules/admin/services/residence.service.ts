import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { IGeneralResponse } from "src/app/shared/interfaces/general.interface";
import { environment } from 'src/environments/environment';
import { IResidenceRequest } from "../interfaces/residence.interface";

@Injectable({
    providedIn:'root'
})
export class ResidenceService{
    private _httpClient = inject(HttpClient);
    urlBase: string = environment.URL_API;

   /**
   * Delete residence
   * @param residenceId
   * @returns
   */
    deleteResidence(residenceId:number): Observable<IGeneralResponse<string>> {
        return this._httpClient.delete<IGeneralResponse<string>>(
            `${this.urlBase}/residences/${residenceId}`
        );
    }

    /**
   * Update residence
   * @param residenceId
   * @param params
   * @returns
   */
    updateResidence(residenceId:number, params:IResidenceRequest): Observable<IGeneralResponse<string>> {
        return this._httpClient.put<IGeneralResponse<string>>(
            `${this.urlBase}/residences/${residenceId}`,
            params
        );
    }

    /**
   * Create residence
   * @param params
   * @returns
   */
    createResidence(params:IResidenceRequest): Observable<IGeneralResponse<string>> {
        return this._httpClient.post<IGeneralResponse<string>>(
            `${this.urlBase}/residences`,
            params
        );
    }
}