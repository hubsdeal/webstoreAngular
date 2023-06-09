import { Component, Injector, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { HubCountryLookupTableDto, HubStateLookupTableDto, HubHubTypeLookupTableDto, HubsServiceProxy, TokenAuthServiceProxy, HubDto } from '@shared/service-proxies/service-proxies';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { NotifyService } from 'abp-ng2-module';
import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { CreateOrEditHubModalComponent } from '../create-or-edit-hub-modal.component';
import { ViewHubModalComponent } from '../view-hub-modal.component';

@Component({
  selector: 'app-my-hub-list',
  templateUrl: './my-hub-list.component.html',
  styleUrls: ['./my-hub-list.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [appModuleAnimation()],
})
export class MyHubListComponent extends AppComponentBase {
  @ViewChild('createOrEditHubModal', { static: true }) createOrEditHubModal: CreateOrEditHubModalComponent;
  @ViewChild('viewHubModal', { static: true }) viewHubModal: ViewHubModalComponent;

  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;

  advancedFiltersAreShown = false;
  filterText = '';
  nameFilter = '';
  descriptionFilter = '';
  maxEstimatedPopulationFilter: number;
  maxEstimatedPopulationFilterEmpty: number;
  minEstimatedPopulationFilter: number;
  minEstimatedPopulationFilterEmpty: number;
  hasParentHubFilter = -1;
  maxParentHubIdFilter: number;
  maxParentHubIdFilterEmpty: number;
  minParentHubIdFilter: number;
  minParentHubIdFilterEmpty: number;
  maxLatitudeFilter: number;
  maxLatitudeFilterEmpty: number;
  minLatitudeFilter: number;
  minLatitudeFilterEmpty: number;
  maxLongitudeFilter: number;
  maxLongitudeFilterEmpty: number;
  minLongitudeFilter: number;
  minLongitudeFilterEmpty: number;
  liveFilter = -1;
  urlFilter = '';
  officeFullAddressFilter = '';
  partnerOrOwnedFilter = -1;
  phoneFilter = '';
  yearlyRevenueFilter = '';
  maxDisplaySequenceFilter: number;
  maxDisplaySequenceFilterEmpty: number;
  minDisplaySequenceFilter: number;
  minDisplaySequenceFilterEmpty: number;
  countryNameFilter = '';
  stateNameFilter = '';
  cityNameFilter = '';
  countyNameFilter = '';
  hubTypeNameFilter = '';
  currencyNameFilter = '';
  mediaLibraryNameFilter = '';

  zipCodeFilter = '';

  countryIdFilter: number;
  stateIdFilter: number;
  hubTypeIdFilter: number;

  state: any;
  country: any;
  hubType: any;

  allCountrys: HubCountryLookupTableDto[];
  allStates: HubStateLookupTableDto[];
  allHubTypes: HubHubTypeLookupTableDto[];

  cityCount: number = 0;
  countryCount: number = 0;
  stateCount: number = 0;
  countyCount: number = 0;
  localityCount: number = 0;

  skipCount: number;
  maxResultCount: number = 10;

  constructor(
    injector: Injector,
    private _hubsServiceProxy: HubsServiceProxy,
    private _notifyService: NotifyService,
    private _tokenAuth: TokenAuthServiceProxy,
    private _activatedRoute: ActivatedRoute,
    private _fileDownloadService: FileDownloadService,
    private _dateTimeService: DateTimeService
  ) {
    super(injector);
    this._hubsServiceProxy.getAllCountryForTableDropdown().subscribe((result) => {
      this.allCountrys = result;
    });
    this._hubsServiceProxy.getAllStateForTableDropdown().subscribe((result) => {
      this.allStates = result;
    });
    this._hubsServiceProxy.getAllHubTypeForTableDropdown().subscribe((result) => {
      this.allHubTypes = result;
    });
  }

  getHubs(event?: LazyLoadEvent) {
    // if (this.primengTableHelper.shouldResetPaging(event)) {
    //     this.paginator.changePage(0);
    //     if (this.primengTableHelper.records && this.primengTableHelper.records.length > 0) {
    //         return;
    //     }
    // }

    this.primengTableHelper.showLoadingIndicator();

    this._hubsServiceProxy
      .getAllHubsBySp(
        this.filterText,
        this.nameFilter,
        this.liveFilter,
        this.partnerOrOwnedFilter,
        this.cityNameFilter,
        this.phoneFilter,
        this.countryIdFilter,
        this.stateIdFilter,
        this.hubTypeIdFilter,
        this.zipCodeFilter,
        // this.filterText,
        // this.nameFilter,
        // this.descriptionFilter,
        // this.maxEstimatedPopulationFilter == null
        //     ? this.maxEstimatedPopulationFilterEmpty
        //     : this.maxEstimatedPopulationFilter,
        // this.minEstimatedPopulationFilter == null
        //     ? this.minEstimatedPopulationFilterEmpty
        //     : this.minEstimatedPopulationFilter,
        // this.hasParentHubFilter,
        // this.maxParentHubIdFilter == null ? this.maxParentHubIdFilterEmpty : this.maxParentHubIdFilter,
        // this.minParentHubIdFilter == null ? this.minParentHubIdFilterEmpty : this.minParentHubIdFilter,
        // this.maxLatitudeFilter == null ? this.maxLatitudeFilterEmpty : this.maxLatitudeFilter,
        // this.minLatitudeFilter == null ? this.minLatitudeFilterEmpty : this.minLatitudeFilter,
        // this.maxLongitudeFilter == null ? this.maxLongitudeFilterEmpty : this.maxLongitudeFilter,
        // this.minLongitudeFilter == null ? this.minLongitudeFilterEmpty : this.minLongitudeFilter,
        // this.liveFilter,
        // this.urlFilter,
        // this.officeFullAddressFilter,
        // this.partnerOrOwnedFilter,
        // this.phoneFilter,
        // this.yearlyRevenueFilter,
        // this.maxDisplaySequenceFilter == null
        //     ? this.maxDisplaySequenceFilterEmpty
        //     : this.maxDisplaySequenceFilter,
        // this.minDisplaySequenceFilter == null
        //     ? this.minDisplaySequenceFilterEmpty
        //     : this.minDisplaySequenceFilter,
        // this.countryNameFilter,
        // this.stateIdFilter,
        // this.stateNameFilter,
        // this.cityNameFilter,
        // this.countryIdFilter,
        // this.countyNameFilter,
        // this.hubTypeIdFilter,
        // this.hubTypeNameFilter,
        // this.currencyNameFilter,
        // this.mediaLibraryNameFilter,
        // this.primengTableHelper.getSorting(this.dataTable),
        // this.primengTableHelper.getSkipCount(this.paginator, event),
        // this.primengTableHelper.getMaxResultCount(this.paginator, event)
        '',
        this.skipCount,
        this.maxResultCount
      )
      .subscribe((result) => {
        this.primengTableHelper.totalRecordsCount = result.totalCount;
        this.primengTableHelper.records = result.hubs;
        this.primengTableHelper.hideLoadingIndicator();
      });
  }

  reloadPage(): void {
    this.paginator.changePage(this.paginator.getPage());
  }

  paginate(event: any) {
    this.skipCount = event.first;
    this.maxResultCount = event.rows;
    this.getHubs();
  }

  createHub(): void {
    this.createOrEditHubModal.show();
  }

  deleteHub(hub: HubDto): void {
    this.message.confirm('', this.l('AreYouSure'), (isConfirmed) => {
      if (isConfirmed) {
        this._hubsServiceProxy.delete(hub.id).subscribe(() => {
          this.reloadPage();
          this.notify.success(this.l('SuccessfullyDeleted'));
        });
      }
    });
  }

  exportToExcel(): void {
    this._hubsServiceProxy
      .getHubsToExcel(
        this.filterText,
        this.nameFilter,
        this.descriptionFilter,
        this.maxEstimatedPopulationFilter == null
          ? this.maxEstimatedPopulationFilterEmpty
          : this.maxEstimatedPopulationFilter,
        this.minEstimatedPopulationFilter == null
          ? this.minEstimatedPopulationFilterEmpty
          : this.minEstimatedPopulationFilter,
        this.hasParentHubFilter,
        this.maxParentHubIdFilter == null ? this.maxParentHubIdFilterEmpty : this.maxParentHubIdFilter,
        this.minParentHubIdFilter == null ? this.minParentHubIdFilterEmpty : this.minParentHubIdFilter,
        this.maxLatitudeFilter == null ? this.maxLatitudeFilterEmpty : this.maxLatitudeFilter,
        this.minLatitudeFilter == null ? this.minLatitudeFilterEmpty : this.minLatitudeFilter,
        this.maxLongitudeFilter == null ? this.maxLongitudeFilterEmpty : this.maxLongitudeFilter,
        this.minLongitudeFilter == null ? this.minLongitudeFilterEmpty : this.minLongitudeFilter,
        this.liveFilter,
        this.urlFilter,
        this.officeFullAddressFilter,
        this.partnerOrOwnedFilter,
        this.phoneFilter,
        this.yearlyRevenueFilter,
        this.maxDisplaySequenceFilter == null
          ? this.maxDisplaySequenceFilterEmpty
          : this.maxDisplaySequenceFilter,
        this.minDisplaySequenceFilter == null
          ? this.minDisplaySequenceFilterEmpty
          : this.minDisplaySequenceFilter,
        this.countryNameFilter,
        this.stateNameFilter,
        this.cityNameFilter,
        this.countyNameFilter,
        this.hubTypeNameFilter,
        this.currencyNameFilter,
        this.mediaLibraryNameFilter
      )
      .subscribe((result) => {
        this._fileDownloadService.downloadTempFile(result);
      });
  }

  resetFilters(): void {
    this.filterText = '';
    this.nameFilter = '';
    this.descriptionFilter = '';
    this.maxEstimatedPopulationFilter = this.maxEstimatedPopulationFilterEmpty;
    this.minEstimatedPopulationFilter = this.maxEstimatedPopulationFilterEmpty;
    this.hasParentHubFilter = -1;
    this.maxParentHubIdFilter = this.maxParentHubIdFilterEmpty;
    this.minParentHubIdFilter = this.maxParentHubIdFilterEmpty;
    this.maxLatitudeFilter = this.maxLatitudeFilterEmpty;
    this.minLatitudeFilter = this.maxLatitudeFilterEmpty;
    this.maxLongitudeFilter = this.maxLongitudeFilterEmpty;
    this.minLongitudeFilter = this.maxLongitudeFilterEmpty;
    this.liveFilter = -1;
    this.urlFilter = '';
    this.officeFullAddressFilter = '';
    this.partnerOrOwnedFilter = -1;
    this.phoneFilter = '';
    this.yearlyRevenueFilter = '';
    this.maxDisplaySequenceFilter = this.maxDisplaySequenceFilterEmpty;
    this.minDisplaySequenceFilter = this.maxDisplaySequenceFilterEmpty;
    this.countryNameFilter = '';
    this.stateNameFilter = '';
    this.cityNameFilter = '';
    this.countyNameFilter = '';
    this.hubTypeNameFilter = '';
    this.currencyNameFilter = '';
    this.mediaLibraryNameFilter = '';
    this.countryIdFilter = undefined;
    this.stateIdFilter = undefined;
    this.hubTypeIdFilter = undefined;
    this.getHubs();
  }

  onCountrySelect(event: any) {
    // if (event.value && event.value.id) {
    //     this._hubsServiceProxy.getAllStateForTableDropdown(event.value.id).subscribe(result=>{
    //         this.stateItems = result;
    //     })
    // }
    if (event.value && event.value.id) {
      this.countryIdFilter = event.value.id;
    }
  }

  onStateSelect(event: any) {
    if (event.value && event.value.id) {
      this.stateIdFilter = event.value.id;
    }
  }

  onHusTypeSelect(event: any) {
    if (event.value && event.value.id) {
      this.hubTypeIdFilter = event.value.id;
    }
  }
}
