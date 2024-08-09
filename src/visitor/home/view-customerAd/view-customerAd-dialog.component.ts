import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output,
  Inject
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { forEach as _forEach, map as _map } from 'lodash-es';
import { AppComponentBase } from '@shared/app-component-base';
import {
  UserServiceProxy,
  CarVendorDto,
  CarVendorsServiceProxy,
  CarModelsServiceProxy,
  CarDto,
  CarModelDto,
  CarModelsEnginesServiceProxy,
  CarModelsEngineDto,
  CarsServiceProxy,
  CarColorDto,
  CarFuleTypeDto,
  CitiesServiceProxy,
  CityDto,
  CarAdDto,
  AreasServiceProxy,
  SmallAreasServiceProxy,
  AreaDto,
  SmallAreaDto,
  API_BASE_URL,
  CreateCarDto,
  CreateCarAdDto,
  CarAdsServiceProxy,
  CreateNewAdCls,
  CarsAdImagesServiceProxy,
  CarsAdImageDto
} from '@shared/service-proxies/service-proxies';
import { AbpValidationError } from '@shared/components/validation/abp-validation.api';
import { FileItem, FileUploader, ParsedResponseHeaders } from 'ng2-file-upload';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppSessionService } from '@shared/session/app-session.service';
import { appModuleAnimation } from '@shared/animations/routerTransition';

@Component({
  selector: 'visitor-adDetails',
  templateUrl: './view-customerAd-dialog.component.html',
  styleUrls: ['../home.component.scss'],

  animations: [appModuleAnimation()],

})
export class ViewCustomerAdDialogComponent 
  implements OnInit {
  saving = false;
  vendor = new CarVendorDto();
  car = new CreateCarDto;
  CarAd = new CarAdDto;  
  CarAds : CarAdDto[] = [];
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
  carAdImages: CarsAdImageDto[] = [];

  PdffileName: any;
  public pdf_uploader: FileUploader;
  // uploadForm: FormGroup;
  public uploader:FileUploader = new FileUploader({
    isHTML5: true,
    url : "",
  });
  URL: string;
  MainURL: string;

  public cityId : any;
  public areaId : any;
  // @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _carsService: CarsServiceProxy,
    private _carVendorsService: CarVendorsServiceProxy,
    private _citiesService: CitiesServiceProxy,
    private _areasService: AreasServiceProxy,
    private _smallAreasService: SmallAreasServiceProxy,
    private _carModelsService: CarModelsServiceProxy,
    private _carModelsEnginesService: CarModelsEnginesServiceProxy,
    private _carAdsService: CarAdsServiceProxy,
    private _carsAdImagesService: CarsAdImagesServiceProxy,
    private http: HttpClient,

    public bsModalRef: BsModalRef,
    @Inject(API_BASE_URL) baseUrl?: string,

  ) {
    //super(injector);   
    this.URL = baseUrl + "/api/services/app/CarsAdImages/UploadFile";
    this.MainURL = baseUrl + "/api/services/app/CarAds/UploadFile";
  } 

  ngOnInit(): void {

    this.pdf_uploader = new FileUploader({ url: this.MainURL });
    this.pdf_uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

    //this.CarAd =  AppSessionService.carAd ;
    let carAdId = +localStorage.getItem("carAdId");
    this.getCarAdbyId(carAdId);
    this.getCarAdImages(carAdId);  
  }
  getCarAdbyId(id)  
  {
    debugger
     this._carAdsService
      .getCarAdDetailsById(id)  
      .subscribe((result : any) => {
        this.CarAd = result.items[0];    
        // this.vendors = result.items[0].cars.carVendor;  
        // this.models =  result.items[0].carModels;  
        // this.modelEngins =  result.items[0].carModelsEngines;  
        // this.colors =  result.items[0].carColors;  
        // this.CarFuleTypes =  result.items[0].carFuleTypes;       
        // this.smallAreas =  result.items[0].smallAreas;       
        // this.areas =  result.items[0].smallAreas.areas;       
        // this.cities =  result.items[0].smallAreas.areas.cities;         
      });
  }
  getCarAdImages(id)  
  {
     this._carsAdImagesService
      .getCarAdsImagesById(id)
      .subscribe((result) => {
        this.carAdImages = result.items;         
      });
  }
  callAdvertiser(phone : any)
  {
    window.open("tel:"+phone.toString());
  }
  getCarDetails()  
  {
     this._carsService
      .getCarDetails()
      .subscribe((result) => {
        this.vendors = result.vendors;  
        this.models = result.models;  
        this.modelEngins = result.modelEngins;  
        this.colors = result.colors;  
        this.CarFuleTypes = result.carFuleTypes;  
      });
  }
  getCities()  
  {
     this._citiesService
      .getCityByCountryId(1)
      .subscribe((result) => {
        this.cities = result.items;  
      });  
  }
  getAreas(cityId)  
  {
     this._areasService
      .getAreaByCityId(cityId)
      .subscribe((result) => {
        this.areas = result.items;  
      });  
  }
  getSmallAreas(areaId)  
  {
     this._smallAreasService
      .getSmallAreaByAreaId(areaId)
      .subscribe((result) => {
        this.smallAreas = result.items;  
      });  
  }
  // getVendors()  
  // {
  //    this._carVendorsService
  //     .getAllNoPaging()
  //     .subscribe((result) => {
  //       this.vendors = result.items;  
  //     });
  // }
  // getModeles()  
  // {
  //    this._carModelsService
  //     .getAllNoPaging()
  //     .subscribe((result) => {
  //       this.modelsTemp = result.items;  
  //     });
  // }
  // getModelEngin()  
  // {
  //    this._carModelsEnginesService
  //     .getAllNoPaging()
  //     .subscribe((result) => {
  //       this.modelEnginsTemp = result.items;  
  //     });
  // }
  // getColor()  
  // {
  //    this._carModelsEnginesService
  //     .getAllNoPaging()
  //     .subscribe((result) => {
  //       this.modelEnginsTemp = result.items;  
  //     });
  // }
  selectedVendorId(val : any)
  {
    this.car.carVendorId = val;   
    //get model
    this.models = this.modelsTemp.filter( m => m.carVendorId == val);
  }
  selectedModelId(val : any)
  {
    this.car.carModelId = val;  
    //get model engin
    this.modelEngins = this.modelEnginsTemp.filter( m => m.carModelId == val); 
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
  selectedCityId(val : any)
  {
      this.getAreas(val);   
  }
  selectedAreaId(val : any)
  {
      this.getSmallAreas(val);   
  }
  selectedSmallAreaId(val : any)
  {
      this.CarAd.smallAreasId = val;   
  }
  normalGearSelected(val : any)
  {
    this.CarAd.is_automatic = false;
  }
  automaticCarSelected(val : any)
  {
    this.CarAd.is_automatic = true;
  }
  newCarSelected($event) {
    debugger
    this.car.is_new_car = true;
  }
  usedCarSelected($event) {
    debugger
    this.car.is_new_car = false;  
  }
  save(): void {
    debugger
    this.saving = true;

    this.car.userId = null;//this.appSession.userId;
    this.CarAd.userId = null;//this.appSession.userId;
    let carAdObj = new CreateNewAdCls();
    carAdObj.car = this.car;
    carAdObj.carAd = this.CarAd;

    this._carAdsService.createNewCarAd(carAdObj)
    .subscribe(
      (result : any) => {
        //upload images
        this.uploadSubmit(result);
        //this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        //this.onSave.emit();
      },
      () => {
        this.saving = false;
      }
    );
  }

  public pdfFileChange(selector: string) {
    
    let me = this;
    var fileInput: any = document.getElementById(selector);
    this.PdffileName = fileInput.files[0].name;
    var fReader = new FileReader();
    let file = fileInput.files[0];
    if (file != undefined) {
        // var error = this.validateFileSize(file.size);
        // if (error) {
        //     me.notify.error(error);
        //     return;
        // }
        fReader.readAsDataURL(file);
         
        let length = me.pdf_uploader.queue.length;
        if (length > 1) {                
            let item = me.pdf_uploader.queue[length - 1];
            let queue = [];
            me.pdf_uploader.queue.forEach((item, index) => {
                if (index == length - 1)
                    queue.push(me.pdf_uploader.queue[index]);
            });

            me.pdf_uploader.queue = queue;  
        }
        //get file info from the server
        
        me.pdf_uploader.onBeforeUploadItem = function (item) {
          item.url += "?imgName="+item.file.name +"&fileType=" + 0;
      };
      me.pdf_uploader.uploadAll();
      this.pdf_uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);

    }
  }
  uploadSubmit(carAdId){
    
    for (let i = 0; i < this.uploader.queue.length; i++) {
      let fileItem = this.uploader.queue[i]._file;
      if(fileItem.size > 10000000){
        alert("Each File should be less than 10 MB of size.");
        return;
      }
    }
    for (let j = 0; j < this.uploader.queue.length; j++) {
      let data = new FormData();
      let fileItem = this.uploader.queue[j]._file;
      console.log(fileItem.name);
      data.append('file', fileItem);
      // data.append('imgName', fileItem.name);
      data.append('fileSeq', 'seq'+j);
      data.append('carAdId', carAdId.toString());
      //data.append( 'dataType', this.uploadForm.controls.type.value);
      //this.uploadFile(data).subscribe(data => alert(data.message));
      this.uploadFile(data).subscribe(() => {
        //
      });
    //  this.uploader.onBeforeUploadItem = function (item) {
    //   item.url += "?imgName="+item.file.name +"&fileType=" + 0;
    // };
   // this.uploader.uploadAll();
    //this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
    }
    this.uploader.clearQueue();
}
uploadFile(data: FormData): Observable<any> {
  return this.http.post(this.URL, data);
}

  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    
    let data = JSON.parse(response); //success server response
    this.CarAd.coverLink=data.result.coverLink;
  }
}
