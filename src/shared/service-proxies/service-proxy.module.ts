import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AbpHttpInterceptor } from 'abp-ng2-module';

import * as ApiServiceProxies from './service-proxies';

@NgModule({
    providers: [
        ApiServiceProxies.RoleServiceProxy,
        ApiServiceProxies.SessionServiceProxy,
        ApiServiceProxies.UserServiceProxy,
        ApiServiceProxies.TokenAuthServiceProxy,
        ApiServiceProxies.AccountServiceProxy,
        ApiServiceProxies.ConfigurationServiceProxy,
        ApiServiceProxies.CarVendorsServiceProxy,
        ApiServiceProxies.CarModelsServiceProxy,
        ApiServiceProxies.CarModelsEnginesServiceProxy,
        ApiServiceProxies.CarFuleTypesServiceProxy,
        ApiServiceProxies.CarColorsServiceProxy,
        ApiServiceProxies.CarsServiceProxy,
        ApiServiceProxies.CitiesServiceProxy,
        ApiServiceProxies.AreasServiceProxy,
        ApiServiceProxies.SmallAreasServiceProxy,
        ApiServiceProxies.CarAdsServiceProxy,
        ApiServiceProxies.CarsAdImagesServiceProxy,
        
        
        { provide: HTTP_INTERCEPTORS, useClass: AbpHttpInterceptor, multi: true }
    ]
})
export class ServiceProxyModule { }
