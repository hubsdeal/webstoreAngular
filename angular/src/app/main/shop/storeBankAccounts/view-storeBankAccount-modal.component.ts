﻿import { AppConsts } from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetStoreBankAccountForViewDto, StoreBankAccountDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewStoreBankAccountModal',
    templateUrl: './view-storeBankAccount-modal.component.html',
})
export class ViewStoreBankAccountModalComponent extends AppComponentBase {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetStoreBankAccountForViewDto;

    constructor(injector: Injector) {
        super(injector);
        this.item = new GetStoreBankAccountForViewDto();
        this.item.storeBankAccount = new StoreBankAccountDto();
    }

    show(item: GetStoreBankAccountForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}