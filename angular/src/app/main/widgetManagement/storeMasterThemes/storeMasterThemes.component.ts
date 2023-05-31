﻿import { AppConsts } from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreMasterThemesServiceProxy, StoreMasterThemeDto } from '@shared/service-proxies/service-proxies';
import { NotifyService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditStoreMasterThemeModalComponent } from './create-or-edit-storeMasterTheme-modal.component';

import { ViewStoreMasterThemeModalComponent } from './view-storeMasterTheme-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { filter as _filter } from 'lodash-es';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
    templateUrl: './storeMasterThemes.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()],
})
export class StoreMasterThemesComponent extends AppComponentBase {
    @ViewChild('createOrEditStoreMasterThemeModal', { static: true })
    createOrEditStoreMasterThemeModal: CreateOrEditStoreMasterThemeModalComponent;
    @ViewChild('viewStoreMasterThemeModal', { static: true })
    viewStoreMasterThemeModal: ViewStoreMasterThemeModalComponent;

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    nameFilter = '';
    descriptionFilter = '';
    themeCodeFilter = '';
    thumbnailImageIdFilter = '';

    constructor(
        injector: Injector,
        private _storeMasterThemesServiceProxy: StoreMasterThemesServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
    }

    getStoreMasterThemes(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            if (this.primengTableHelper.records && this.primengTableHelper.records.length > 0) {
                return;
            }
        }

        this.primengTableHelper.showLoadingIndicator();

        this._storeMasterThemesServiceProxy
            .getAll(
                this.filterText,
                this.nameFilter,
                this.descriptionFilter,
                this.themeCodeFilter,
                this.thumbnailImageIdFilter,
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

    createStoreMasterTheme(): void {
        this.createOrEditStoreMasterThemeModal.show();
    }

    deleteStoreMasterTheme(storeMasterTheme: StoreMasterThemeDto): void {
        this.message.confirm('', this.l('AreYouSure'), (isConfirmed) => {
            if (isConfirmed) {
                this._storeMasterThemesServiceProxy.delete(storeMasterTheme.id).subscribe(() => {
                    this.reloadPage();
                    this.notify.success(this.l('SuccessfullyDeleted'));
                });
            }
        });
    }

    exportToExcel(): void {
        this._storeMasterThemesServiceProxy
            .getStoreMasterThemesToExcel(
                this.filterText,
                this.nameFilter,
                this.descriptionFilter,
                this.themeCodeFilter,
                this.thumbnailImageIdFilter
            )
            .subscribe((result) => {
                this._fileDownloadService.downloadTempFile(result);
            });
    }

    resetFilters(): void {
        this.filterText = '';
        this.nameFilter = '';
        this.descriptionFilter = '';
        this.themeCodeFilter = '';
        this.thumbnailImageIdFilter = '';

        this.getStoreMasterThemes();
    }
}
