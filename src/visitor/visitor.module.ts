import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientJsonpModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ServiceProxyModule } from '../shared/service-proxies/service-proxy.module';
import { SharedModule } from '../shared/shared.module';

import { VisitorRoutingModule } from './visitor-routing.module';
import { VisitorComponent } from './visitor.component';
import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NgSelectModule } from '@ng-select/ng-select';
import { ViewCustomerAdDialogComponent } from './home/view-customerAd/view-customerAd-dialog.component';
import { HeaderComponent } from './home/header.component';

@NgModule({  
    imports: [
        CommonModule,   
        FormsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        SharedModule,
        ServiceProxyModule,
        VisitorRoutingModule,
        // BrowserModule, 
        CollapseModule.forRoot(),
        ModalModule.forChild(),
        NgSelectModule
    ],
    declarations: [
        VisitorComponent,
        HomeComponent,
        ViewCustomerAdDialogComponent,
        HeaderComponent
       
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

    // entryComponents: [
    //     // tenant
    //     TenantChangeDialogComponent
    // ]
})
export class VisitorModule {

}
