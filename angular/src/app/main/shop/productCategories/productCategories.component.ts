﻿import { AppConsts } from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCategoriesServiceProxy, ProductCategoryDto } from '@shared/service-proxies/service-proxies';
import { NotifyService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditProductCategoryModalComponent } from './create-or-edit-productCategory-modal.component';

import { ViewProductCategoryModalComponent } from './view-productCategory-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { filter as _filter } from 'lodash-es';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
    templateUrl: './productCategories.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()],
})
export class ProductCategoriesComponent extends AppComponentBase {
    @ViewChild('createOrEditProductCategoryModal', { static: true })
    createOrEditProductCategoryModal: CreateOrEditProductCategoryModalComponent;
    @ViewChild('viewProductCategoryModal', { static: true })
    viewProductCategoryModal: ViewProductCategoryModalComponent;

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    nameFilter = '';
    descriptionFilter = '';
    hasParentCategoryFilter = -1;
    maxParentCategoryIdFilter: number;
    maxParentCategoryIdFilterEmpty: number;
    minParentCategoryIdFilter: number;
    minParentCategoryIdFilterEmpty: number;
    urlFilter = '';
    metaTitleFilter = '';
    metaKeywordsFilter = '';
    maxDisplaySequenceFilter: number;
    maxDisplaySequenceFilterEmpty: number;
    minDisplaySequenceFilter: number;
    minDisplaySequenceFilterEmpty: number;
    productOrServiceFilter = -1;
    mediaLibraryNameFilter = '';

    constructor(
        injector: Injector,
        private _productCategoriesServiceProxy: ProductCategoriesServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
    }

    getProductCategories(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            if (this.primengTableHelper.records && this.primengTableHelper.records.length > 0) {
                return;
            }
        }

        this.primengTableHelper.showLoadingIndicator();

        this._productCategoriesServiceProxy
            .getAll(
                this.filterText,
                this.nameFilter,
                this.descriptionFilter,
                this.hasParentCategoryFilter,
                this.maxParentCategoryIdFilter == null
                    ? this.maxParentCategoryIdFilterEmpty
                    : this.maxParentCategoryIdFilter,
                this.minParentCategoryIdFilter == null
                    ? this.minParentCategoryIdFilterEmpty
                    : this.minParentCategoryIdFilter,
                this.urlFilter,
                this.metaTitleFilter,
                this.metaKeywordsFilter,
                this.maxDisplaySequenceFilter == null
                    ? this.maxDisplaySequenceFilterEmpty
                    : this.maxDisplaySequenceFilter,
                this.minDisplaySequenceFilter == null
                    ? this.minDisplaySequenceFilterEmpty
                    : this.minDisplaySequenceFilter,
                this.productOrServiceFilter,
                this.mediaLibraryNameFilter,
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

    createProductCategory(): void {
        this.createOrEditProductCategoryModal.show();
    }

    deleteProductCategory(productCategory: ProductCategoryDto): void {
        this.message.confirm('', this.l('AreYouSure'), (isConfirmed) => {
            if (isConfirmed) {
                this._productCategoriesServiceProxy.delete(productCategory.id).subscribe(() => {
                    this.reloadPage();
                    this.notify.success(this.l('SuccessfullyDeleted'));
                });
            }
        });
    }

    exportToExcel(): void {
        this._productCategoriesServiceProxy
            .getProductCategoriesToExcel(
                this.filterText,
                this.nameFilter,
                this.descriptionFilter,
                this.hasParentCategoryFilter,
                this.maxParentCategoryIdFilter == null
                    ? this.maxParentCategoryIdFilterEmpty
                    : this.maxParentCategoryIdFilter,
                this.minParentCategoryIdFilter == null
                    ? this.minParentCategoryIdFilterEmpty
                    : this.minParentCategoryIdFilter,
                this.urlFilter,
                this.metaTitleFilter,
                this.metaKeywordsFilter,
                this.maxDisplaySequenceFilter == null
                    ? this.maxDisplaySequenceFilterEmpty
                    : this.maxDisplaySequenceFilter,
                this.minDisplaySequenceFilter == null
                    ? this.minDisplaySequenceFilterEmpty
                    : this.minDisplaySequenceFilter,
                this.productOrServiceFilter,
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
        this.hasParentCategoryFilter = -1;
        this.maxParentCategoryIdFilter = this.maxParentCategoryIdFilterEmpty;
        this.minParentCategoryIdFilter = this.maxParentCategoryIdFilterEmpty;
        this.urlFilter = '';
        this.metaTitleFilter = '';
        this.metaKeywordsFilter = '';
        this.maxDisplaySequenceFilter = this.maxDisplaySequenceFilterEmpty;
        this.minDisplaySequenceFilter = this.maxDisplaySequenceFilterEmpty;
        this.productOrServiceFilter = -1;
        this.mediaLibraryNameFilter = '';

        this.getProductCategories();
    }
}
