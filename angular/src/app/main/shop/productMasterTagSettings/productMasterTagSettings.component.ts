﻿import { AppConsts } from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
    ProductMasterTagSettingsServiceProxy,
    ProductMasterTagSettingDto,
    AnswerType,
} from '@shared/service-proxies/service-proxies';
import { NotifyService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditProductMasterTagSettingModalComponent } from './create-or-edit-productMasterTagSetting-modal.component';

import { ViewProductMasterTagSettingModalComponent } from './view-productMasterTagSetting-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { filter as _filter } from 'lodash-es';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
    templateUrl: './productMasterTagSettings.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()],
})
export class ProductMasterTagSettingsComponent extends AppComponentBase {
    @ViewChild('createOrEditProductMasterTagSettingModal', { static: true })
    createOrEditProductMasterTagSettingModal: CreateOrEditProductMasterTagSettingModalComponent;
    @ViewChild('viewProductMasterTagSettingModal', { static: true })
    viewProductMasterTagSettingModal: ViewProductMasterTagSettingModalComponent;

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    maxDisplaySequenceFilter: number;
    maxDisplaySequenceFilterEmpty: number;
    minDisplaySequenceFilter: number;
    minDisplaySequenceFilterEmpty: number;
    customTagTitleFilter = '';
    customTagChatQuestionFilter = '';
    displayPublicFilter = -1;
    answerTypeIdFilter = -1;
    productCategoryNameFilter = '';
    masterTagCategoryNameFilter = '';

    answerType = AnswerType;

    constructor(
        injector: Injector,
        private _productMasterTagSettingsServiceProxy: ProductMasterTagSettingsServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
    }

    getProductMasterTagSettings(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            if (this.primengTableHelper.records && this.primengTableHelper.records.length > 0) {
                return;
            }
        }

        this.primengTableHelper.showLoadingIndicator();

        this._productMasterTagSettingsServiceProxy
            .getAll(
                this.filterText,
                this.maxDisplaySequenceFilter == null
                    ? this.maxDisplaySequenceFilterEmpty
                    : this.maxDisplaySequenceFilter,
                this.minDisplaySequenceFilter == null
                    ? this.minDisplaySequenceFilterEmpty
                    : this.minDisplaySequenceFilter,
                this.customTagTitleFilter,
                this.customTagChatQuestionFilter,
                this.displayPublicFilter,
                this.answerTypeIdFilter,
                this.productCategoryNameFilter,
                this.masterTagCategoryNameFilter,
                this.primengTableHelper.getSorting(this.dataTable),
                this.primengTableHelper.getSkipCount(this.paginator, event),
                this.primengTableHelper.getMaxResultCount(this.paginator, event)
            )
            .subscribe((result) => {
                this.primengTableHelper.totalRecordsCount = result.totalCount;
                this.primengTableHelper.records = result.items;
                this.primengTableHelper.hideLoadingIndicator();
            });
    }

    reloadPage(): void {
        this.paginator.changePage(this.paginator.getPage());
    }

    createProductMasterTagSetting(): void {
        this.createOrEditProductMasterTagSettingModal.show();
    }

    deleteProductMasterTagSetting(productMasterTagSetting: ProductMasterTagSettingDto): void {
        this.message.confirm('', this.l('AreYouSure'), (isConfirmed) => {
            if (isConfirmed) {
                this._productMasterTagSettingsServiceProxy.delete(productMasterTagSetting.id).subscribe(() => {
                    this.reloadPage();
                    this.notify.success(this.l('SuccessfullyDeleted'));
                });
            }
        });
    }

    exportToExcel(): void {
        this._productMasterTagSettingsServiceProxy
            .getProductMasterTagSettingsToExcel(
                this.filterText,
                this.maxDisplaySequenceFilter == null
                    ? this.maxDisplaySequenceFilterEmpty
                    : this.maxDisplaySequenceFilter,
                this.minDisplaySequenceFilter == null
                    ? this.minDisplaySequenceFilterEmpty
                    : this.minDisplaySequenceFilter,
                this.customTagTitleFilter,
                this.customTagChatQuestionFilter,
                this.displayPublicFilter,
                this.answerTypeIdFilter,
                this.productCategoryNameFilter,
                this.masterTagCategoryNameFilter
            )
            .subscribe((result) => {
                this._fileDownloadService.downloadTempFile(result);
            });
    }

    resetFilters(): void {
        this.filterText = '';
        this.maxDisplaySequenceFilter = this.maxDisplaySequenceFilterEmpty;
        this.minDisplaySequenceFilter = this.maxDisplaySequenceFilterEmpty;
        this.customTagTitleFilter = '';
        this.customTagChatQuestionFilter = '';
        this.displayPublicFilter = -1;
        this.answerTypeIdFilter = -1;
        this.productCategoryNameFilter = '';
        this.masterTagCategoryNameFilter = '';

        this.getProductMasterTagSettings();
    }
}
