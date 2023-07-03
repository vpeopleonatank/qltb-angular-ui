import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { DeviceListConfig } from "../models/device-list-config.model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Device } from "../models/device.model";
import { Donvi } from "../models/donvi.model";
import { LoaiThietBi } from "../models/LoaiThietBi.model";

@Injectable({ providedIn: "root" })
export class DevicesService {
  constructor(private readonly http: HttpClient) {}

  query(
    config: DeviceListConfig
  ): Observable<{ devices: Device[]; devicesCount: number }> {
    // Convert any filters over to Angular's URLSearchParams
    let params = new HttpParams();

    Object.keys(config.filters).forEach((key) => {
      // @ts-ignore
      params = params.set(key, config.filters[key]);
    });

    return this.http.get<{ devices: Device[]; devicesCount: number }>(
      "/qltb",
      { params }
    );
  }

  add(device: Partial<Device>): Observable<{thietbiDto: Device}> {
    return this.http.post<{thietbiDto: Device}>("/qltb", device);
  }

  update(matb: number, device: Partial<Device>): Observable<{thietbiDto: Device}> {
    return this.http.put<{thietbiDto: Device}>(`/qltb/${matb}`, device);
  }

  delete(matb: number): Observable<any> {
    return this.http.delete<any>(`/qltb/${matb}`);
  }

  getDonVis(): Observable<{donviDTOs: Donvi[]}> {
    return this.http.get<{donviDTOs: Donvi[]}>("/qltb/donvi");
  }
  getLoaiThietBis(): Observable<{loaiThietbiDTOs: LoaiThietBi[]}> {
    return this.http.get<{loaiThietbiDTOs: LoaiThietBi[]}>("/qltb/loaithietbi");
  }
}
