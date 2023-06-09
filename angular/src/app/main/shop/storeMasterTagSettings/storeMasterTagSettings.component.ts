﻿import { AppConsts } from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
    StoreMasterTagSettingsServiceProxy,
    StoreMasterTagSettingDto,
    AnswerType,
} from '@shared/service-proxies/service-proxies';
import { NotifyService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditStoreMasterTagSettingModalComponent } from './create-or-edit-storeMasterTagSetting-modal.component';

import { ViewStoreMasterTagSettingModalComponent } from './view-storeMasterTagSetting-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { filter as _filter } from 'lodash-es';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
    templateUrl: './storeMasterTagSettings.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()],
})
export class StoreMasterTagSettingsComponent extends AppComponentBase {
    @ViewChild('createOrEditStoreMasterTagSettingModal', { static: true })
    createOrEditStoreMasterTagSettingModal: CreateOrEditStoreMasterTagSettingModalComponent;
    @ViewChild('viewStoreMasterTagSettingModal', { static: true })
    viewStoreMasterTagSettingModal: ViewStoreMasterTagSettingModalComponent;

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    customTagTitleFilter = '';
    customTagChatQuestionFilter = '';
    displayPublicFilter = -1;
    maxDisplaySequenceFilter: number;
    maxDisplaySequenceFilterEmpty: number;
    minDisplaySequenceFilter: number;
    minDisplaySequenceFilterEmpty: number;
    answerTypeIdFilter = -1;
    storeTagSettingCategoryNameFilter = '';
    masterTagCategoryNameFilter = '';

    answerType = AnswerType;

    constructor(
        injector: Injector,
        private _storeMasterTagSettingsServiceProxy: StoreMasterTagSettingsServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
    }

    getStoreMasterTagSettings(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            if (this.primengTableHelper.records && this.primengTableHelper.records.length > 0) {
                return;
            }
        }

        this.primengTableHelper.showLoadingIndicator();

        this._storeMasterTagSettingsServiceProxy
            .getAll(
                this.filterText,
                this.customTagTitleFilter,
                this.customTagChatQuestionFilter,
                this.displayPublicFilter,
                this.maxDisplaySequenceFilter == null
                    ? this.maxDisplaySequenceFilterEmpty
                    : this.maxDisplaySequenceFilter,
                this.minDisplaySequenceFilter == null
                    ? this.minDisplaySequenceFilterEmpty
                    : this.minDisplaySequenceFilter,
                this.answerTypeIdFilter,
                this.storeTagSettingCategoryNameFilter,
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

    createStoreMasterTagSetting(): void {
        this.createOrEditStoreMasterTagSettingModal.show();
    }

    deleteStoreMasterTagSetting(storeMasterTagSetting: StoreMasterTagSettingDto): void {
        this.message.confirm('', this.l('AreYouSure'), (isConfirmed) => {
            if (isConfirmed) {
                this._storeMasterTagSettingsServiceProxy.delete(storeMasterTagSetting.id).subscribe(() => {
                    this.reloadPage();
                    this.notify.success(this.l('SuccessfullyDeleted'));
                });
            }
        });
    }

    exportToExcel(): void {
        this._storeMasterTagSettingsServiceProxy
            .getStoreMasterTagSettingsToExcel(
                this.filterText,
                this.customTagTitleFilter,
                this.customTagChatQuestionFilter,
                this.displayPublicFilter,
                this.maxDisplaySequenceFilter == null
                    ? this.maxDisplaySequenceFilterEmpty
                    : this.maxDisplaySequenceFilter,
                this.minDisplaySequenceFilter == null
                    ? this.minDisplaySequenceFilterEmpty
                    : this.minDisplaySequenceFilter,
                this.answerTypeIdFilter,
                this.storeTagSettingCategoryNameFilter,
                this.masterTagCategoryNameFilter
            )
            .subscribe((result) => {
                this._fileDownloadService.downloadTempFile(result);
            });
    }

    resetFilters(): void {
        this.filterText = '';
        this.customTagTitleFilter = '';
        this.customTagChatQuestionFilter = '';
        this.displayPublicFilter = -1;
        this.maxDisplaySequenceFilter = this.maxDisplaySequenceFilterEmpty;
        this.minDisplaySequenceFilter = this.maxDisplaySequenceFilterEmpty;
        this.answerTypeIdFilter = -1;
        this.storeTagSettingCategoryNameFilter = '';
        this.masterTagCategoryNameFilter = '';

        this.getStoreMasterTagSettings();
    }
}
