import { Component, Injector, AfterViewInit, OnInit, HostListener, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AreaDto, CarAdDto, CarAdsServiceProxy, CarColorDto, CarDto, CarFuleTypeDto, CarModelDto, CarModelsEngineDto, CarVendorDto, CarsServiceProxy, CityDto, SmallAreaDto } from '@shared/service-proxies/service-proxies';
import { result } from 'lodash-es';
import { Router } from '@angular/router';

declare var $: any; // (or) import * as $ from 'jquery';

@Component({
    selector: 'app-homepage',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: [appModuleAnimation()],
    // encapsulation: ViewEncapsulation.None 
})
export class HomeComponent  implements OnInit {
  
  car = new CarDto;
  CarAd = new CarAdDto;  
  carAds : CarAdDto[] = [];
  carAdsTemp : CarAdDto[] = [];
  vendors: CarVendorDto[] = [];
  models: CarModelDto[] = [];
  modelsTemp: CarModelDto[] = [];
  modelEngins: CarModelsEngineDto[] = [];
  modelEnginsTemp: CarModelsEngineDto[] = [];
  colors: CarColorDto[] = [];
  CarFuleTypes: CarFuleTypeDto[] = [];  
  cities: CityDto[] = [];
  areas: AreaDto[] = [];
  smallAreas: SmallAreaDto[] = [];   
  
    constructor(public http: HttpClient,
      private _carsService : CarsServiceProxy,
      private _router : Router,
      private _carAdsService : CarAdsServiceProxy) {  
    
    }
    ngOnInit(): void {
      //this.navbar = $('nav');
      //this.pay();  
      this.getCarDetails();
      this.getAllAds();

      
    }
  getAllAds()
  {
    this._carAdsService
    .getAllNoPaging().subscribe((result: any) => {
      this.carAds = result.items;
    });
  }  
  getCarDetails()  
   {
     this._carsService
      .getCarDetails()
      .subscribe((result) => {
        this.vendors = result.vendors;  
        this.modelsTemp = result.models;  
        this.modelEnginsTemp = result.modelEngins;  
        this.colors = result.colors;  
        this.CarFuleTypes = result.carFuleTypes;  
      });
  } 
  searchCars()
  {
    debugger
    this._carAdsService
    .getAllCarsByFilter(this.car.carVendorId, this.car.carModelId, 
      this.car.carModelsEngineId,this.car.carFuleTypeId,this.CarAd.price,this.CarAd.car_year)
      .subscribe((result : any)=> {
        this.carAds = result.items;
      });
  }
  viewAdDetails(adId : any)
  {
    localStorage.setItem("carAdId", adId)
    this._router.navigateByUrl('/visitor/home/adDetails');
  }
  selectedYear(val : any)
  {
    this.CarAd.car_year = val;
  }
  selectedPrice(val : any)
  {
    this.CarAd.price = val;
  }
  selectedVendorId(val : any)
  {
    this.car.carVendorId = val;   
    //get model
    this.models = this.modelsTemp.filter( m => m.carVendorId == val);
    //filter the array
  }
  selectedModelId(val : any)
  {
    this.car.carModelId = val;  
    //get model engin
    this.modelEngins = this.modelEnginsTemp.filter( m => m.carModelId == val); 
     //filter the array
     this.carAds = this.carAdsTemp.filter(v => v?.cars?.carVendorId == val)
  }
  selectedModelEnginlId(val : any) 
  {
    this.car.carModelsEngineId = val;   
    
  }
  selectedColorlId(val : any)
  {
    this.car.carColorId = val;   
    
  }
  selectedCarFuleTypelId(val : any)
  {
    this.car.carFuleTypeId = val;   
    
  }
}
  