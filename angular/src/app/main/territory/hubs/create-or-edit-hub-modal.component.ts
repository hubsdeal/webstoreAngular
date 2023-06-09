﻿import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import {
    HubsServiceProxy,
    CreateOrEditHubDto,
    HubCountryLookupTableDto,
    HubStateLookupTableDto,
    HubCityLookupTableDto,
    HubCountyLookupTableDto,
    HubHubTypeLookupTableDto,
    HubCurrencyLookupTableDto,
    StatesServiceProxy,
    CitiesServiceProxy,
    CountiesServiceProxy,
} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { HubMediaLibraryLookupTableModalComponent } from './hub-mediaLibrary-lookup-table-modal.component';
import { SelectItem } from 'primeng/api';
import { ChatGptResponseModalComponent } from '@app/shared/chat-gpt-response-modal/chat-gpt-response-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { GeocodingService } from '@app/shared/chat-gpt-response-modal/services/chat-gpt-lat-long.service';
import { FileItem, FileUploader, FileUploaderOptions } from 'ng2-file-upload';
import { AppConsts } from '@shared/AppConsts';
import { IAjaxResponse, TokenService } from 'abp-ng2-module';

@Component({
    selector: 'createOrEditHubModal',
    templateUrl: './create-or-edit-hub-modal.component.html',
})
export class CreateOrEditHubModalComponent extends AppComponentBase implements OnInit {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @ViewChild('hubMediaLibraryLookupTableModal', { static: true })
    hubMediaLibraryLookupTableModal: HubMediaLibraryLookupTableModalComponent;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    hub: CreateOrEditHubDto = new CreateOrEditHubDto();

    countryName = '';
    stateName = '';
    cityName = '';
    countyName = '';
    hubTypeName = '';
    currencyName = '';
    mediaLibraryName = '';

    allCountrys: HubCountryLookupTableDto[];
    allStates: HubStateLookupTableDto[];
    allCitys: HubCityLookupTableDto[];
    allCountys: HubCountyLookupTableDto[];
    allHubTypes: HubHubTypeLookupTableDto[];
    allCurrencys: HubCurrencyLookupTableDto[];

    partnerAndOwnedOptions: SelectItem[];
    sidebarVisible2: boolean;

    selectedCountry: any;
    selectedState: any;
    selectedCity: any;
    selectedCounty: any;

    imageSrc: any = 'assets/common/images/c_logo.png';
    public uploader: FileUploader;
    public temporaryPictureUrl: string;
    private _uploaderOptions: FileUploaderOptions = {};

    chatGPTPromt: string;
    productShortDesc: string;

    constructor(
        injector: Injector,
        private _hubsServiceProxy: HubsServiceProxy,
        private _stateServiceProxy: StatesServiceProxy,
        private _cityServiceProxy: CitiesServiceProxy,
        private _countyServiceProxy: CountiesServiceProxy,
        private _dateTimeService: DateTimeService,
        private dialog: MatDialog,
        private _tokenService: TokenService,
        private geocodingService: GeocodingService
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.initFileUploader();
    }

    show(hubId?: number): void {
        if (!hubId) {
            this.hub = new CreateOrEditHubDto();
            this.hub.id = hubId;
            this.countryName = '';
            this.stateName = '';
            this.cityName = '';
            this.countyName = '';
            this.hubTypeName = '';
            this.currencyName = '';
            this.mediaLibraryName = '';
            this.hub.partnerOrOwned = true;

            this.active = true;
            this.modal.show();
        } else {
            this._hubsServiceProxy.getHubForEdit(hubId).subscribe((result) => {
                this.hub = result.hub;

                this.countryName = result.countryName;
                this.stateName = result.stateName;
                this.cityName = result.cityName;
                this.countyName = result.countyName;
                this.hubTypeName = result.hubTypeName;
                this.currencyName = result.currencyName;
                this.mediaLibraryName = result.mediaLibraryName;

                this.active = true;
                this.modal.show();
            });
        }
        this._hubsServiceProxy.getAllCountryForTableDropdown().subscribe((result) => {
            this.allCountrys = result;
        });
        // this._hubsServiceProxy.getAllStateForTableDropdown().subscribe((result) => {
        //     this.allStates = result;
        // });
        // this._hubsServiceProxy.getAllCityForTableDropdown().subscribe((result) => {
        //     this.allCitys = result;
        // });
        // this._hubsServiceProxy.getAllCountyForTableDropdown().subscribe((result) => {
        //     this.allCountys = result;
        // });
        this._hubsServiceProxy.getAllHubTypeForTableDropdown().subscribe((result) => {
            this.allHubTypes = result;
        });
        this._hubsServiceProxy.getAllCurrencyForTableDropdown().subscribe((result) => {
            this.allCurrencys = result;
        });
        this.partnerAndOwnedOptions = [{ label: 'Corporate Owned', value: true }, { label: 'Partner', value: false }];
    }

    saveHub(fileToken?: string): void {
        this.saving = true;
        this.hub.fileToken = fileToken;

        this._hubsServiceProxy
            .createOrEdit(this.hub)
            .pipe(
                finalize(() => {
                    this.saving = false;
                })
            )
            .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
            });
    }


    save() {
        if (this.uploader.queue != null && this.uploader.queue.length > 0) {
            this.uploader.uploadAll();
        } else {
            this.saveHub();
        }
    }

    fileChangeEvent(event: any) {

        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();

            reader.readAsDataURL(event.target.files[0]); // read file as data url

            reader.onload = (event) => { // called once readAsDataURL is completed

                this.imageSrc = event.target.result;
            }
        }
    }

    initFileUploader(): void {

        this.uploader = new FileUploader({ url: AppConsts.remoteServiceBaseUrl + '/api/MediaUpload/UploadPicture' });
        this._uploaderOptions.autoUpload = false;
        this._uploaderOptions.authToken = 'Bearer ' + this._tokenService.getToken();
        this._uploaderOptions.removeAfterUpload = true;
        this.uploader.onAfterAddingFile = (file) => {
            file.withCredentials = false;
        };

        this.uploader.onBuildItemForm = (fileItem: FileItem, form: any) => {
            form.append('FileToken', this.guid());
        };

        this.uploader.onSuccessItem = (item, response, status) => {
            const resp = <IAjaxResponse>JSON.parse(response);
            if (resp.success) {
                this.saveHub(resp.result.fileToken);
            } else {
                this.message.error(resp.error.message);
            }
        };

        this.uploader.setOptions(this._uploaderOptions);
    }

    guid(): string {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }


    openSelectMediaLibraryModal() {
        this.hubMediaLibraryLookupTableModal.id = this.hub.pictureMediaLibraryId;
        this.hubMediaLibraryLookupTableModal.displayName = this.mediaLibraryName;
        this.hubMediaLibraryLookupTableModal.show();
    }

    setPictureMediaLibraryIdNull() {
        this.hub.pictureMediaLibraryId = null;
        this.mediaLibraryName = '';
    }

    getNewPictureMediaLibraryId() {
        this.hub.pictureMediaLibraryId = this.hubMediaLibraryLookupTableModal.id;
        this.mediaLibraryName = this.hubMediaLibraryLookupTableModal.displayName;
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }



    onCountryChange(event: any) {
        if (event.value != null) {
            this.hub.countryId = event.value.id;
            this._stateServiceProxy.getAllStateForTableDropdown(event.value.id).subscribe((result) => {
                this.allStates = result;
            });
        }
        console.log("countryId" + this.selectedCountry.displayName);
    }

    onStateChange(event: any) {
        if (event.value != null) {
            this.hub.stateId = event.value.id;
            this._countyServiceProxy.getAllCountyForTableDropdown(this.selectedCountry.id, event.value.id).subscribe((result) => {
                this.allCountys = result;
            });
        }
        console.log("State Id" + this.selectedState.displayName);
    }

    onCountyChange(event: any) {
        if (event.value != null) {
            this.hub.countyId = event.value.id;
            this._cityServiceProxy.getAllCityForTableDropdown(this.selectedCountry.id, this.selectedState.id, event.value.id).subscribe((result) => {
                this.allCitys = result;
            });
        }
        console.log("countyId" + this.selectedCounty.displayName);
    }

    onCityChange(event: any) {
        if (event.value != null) {
            this.hub.cityId = event.value.id;
        }
        console.log("City Id" + this.selectedCity.displayName);

    }



    // openAiModal(feildName: string): void {
    //     var promtText = "Get latitude and longitude for New York"
    //     var modalTitle = "AI Latitude Longitude Response"
    //     const dialogRef = this.dialog.open(ChatGptResponseModalComponent, {
    //       data: { promtFromAnotherComponent: promtText, feildName: feildName, modalTitle: modalTitle },
    //       width: '1100px',
    //     });

    //     dialogRef.afterClosed().subscribe(result => {
    //       console.log(result)
    //       //this.bindingData = result.data;
    //     });
    //   }

    async getCoordinates() {
        try {
            if (this.selectedCountry && this.selectedState && this.selectedCity && this.selectedCounty) {
                this.chatGPTPromt = 'Give me only the Latitude and longitude for ' + this.selectedCountry.displayName + ', ' + this.selectedState.displayName + ', ' + this.selectedCounty.displayName + ', ' + this.selectedCity.displayName + ' as json format as Key latitude and longitude';
            } else if (this.selectedCountry && this.selectedState && this.selectedCounty) {
                this.chatGPTPromt = 'Give me only the Latitude and longitude for ' + this.selectedCountry.displayName + ', ' + this.selectedState.displayName + ', ' + this.selectedCounty.displayName + ' as json format as Key latitude and longitude';
            } else if (this.selectedCountry && this.selectedState) {
                this.chatGPTPromt = 'Give me only the Latitude and longitude for ' + this.selectedCountry.displayName + ', ' + this.selectedState.displayName + ' as json format as Key latitude and longitude';
            } else if (this.selectedCountry) {
                this.chatGPTPromt = 'Give me only the Latitude and longitude for ' + this.selectedCountry.displayName + ' as json format as Key latitude and longitude';
            }
            console.log(this.chatGPTPromt);
            const location = 'Give me Latitude and longitude for New York as json format as Key latitude and longitude'; // Replace with the desired location
            const coordinates = await this.geocodingService.invokeGPT(this.chatGPTPromt);
            console.log('Coordinates:', coordinates);
            if (coordinates) {
                this.hub.latitude = coordinates.latitude;
                this.hub.longitude = coordinates.longitude;
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    openAiModalPr(feildName: string): void {
        this.productShortDesc = "Write a  short description for a hub where hub name is Newyork"
        var modalTitle = "AI Text Generator - About Hub"
        const dialogRef = this.dialog.open(ChatGptResponseModalComponent, {
          data: { promtFromAnotherComponent: this.productShortDesc, feildName: feildName, modalTitle: modalTitle },
          width: '1100px',
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log(result)
          this.hub.description = result.data;
        });
      }
}
