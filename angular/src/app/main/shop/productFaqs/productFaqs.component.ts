﻿import { AppConsts } from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductFaqsServiceProxy, ProductFaqDto } from '@shared/service-proxies/service-proxies';
import { NotifyService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditProductFaqModalComponent } from './create-or-edit-productFaq-modal.component';

import { ViewProductFaqModalComponent } from './view-productFaq-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { filter as _filter } from 'lodash-es';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
    templateUrl: './productFaqs.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()],
})
export class ProductFaqsComponent extends AppComponentBase {
    @ViewChild('createOrEditProductFaqModal', { static: true })
    createOrEditProductFaqModal: CreateOrEditProductFaqModalComponent;
    @ViewChild('viewProductFaqModal', { static: true }) viewProductFaqModal: ViewProductFaqModalComponent;

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    questionFilter = '';
    answerFilter = '';
    templateFilter = -1;
    publishFilter = -1;
    productNameFilter = '';

    constructor(
        injector: Injector,
        private _productFaqsServiceProxy: ProductFaqsServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
    }

    getProductFaqs(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            if (this.primengTableHelper.records && this.primengTableHelper.records.length > 0) {
                return;
            }
        }

        this.primengTableHelper.showLoadingIndicator();

        this._productFaqsServiceProxy
            .getAll(
                this.filterText,
                this.questionFilter,
                this.answerFilter,
                this.templateFilter,
                this.publishFilter,
                this.productNameFilter,
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

    createProductFaq(): void {
        this.createOrEditProductFaqModal.show();
    }

    deleteProductFaq(productFaq: ProductFaqDto): void {
        this.message.confirm('', this.l('AreYouSure'), (isConfirmed) => {
            if (isConfirmed) {
                this._productFaqsServiceProxy.delete(productFaq.id).subscribe(() => {
                    this.reloadPage();
                    this.notify.success(this.l('SuccessfullyDeleted'));
                });
            }
        });
    }

    exportToExcel(): void {
        this._productFaqsServiceProxy
            .getProductFaqsToExcel(
                this.filterText,
                this.questionFilter,
                this.answerFilter,
                this.templateFilter,
                this.publishFilter,
                this.productNameFilter
            )
            .subscribe((result) => {
                this._fileDownloadService.downloadTempFile(result);
            });
    }

    resetFilters(): void {
        this.filterText = '';
        this.questionFilter = '';
        this.answerFilter = '';
        this.templateFilter = -1;
        this.publishFilter = -1;
        this.productNameFilter = '';

        this.getProductFaqs();
    }
}
