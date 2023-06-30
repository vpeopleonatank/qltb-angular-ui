import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { DeviceListConfig } from "../models/device-list-config.model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Device } from "../models/device.model";

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
}
