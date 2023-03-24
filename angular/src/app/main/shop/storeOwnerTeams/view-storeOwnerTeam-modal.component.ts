﻿import { AppConsts } from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetStoreOwnerTeamForViewDto, StoreOwnerTeamDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewStoreOwnerTeamModal',
    templateUrl: './view-storeOwnerTeam-modal.component.html',
})
export class ViewStoreOwnerTeamModalComponent extends AppComponentBase {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetStoreOwnerTeamForViewDto;

    constructor(injector: Injector) {
        super(injector);
        this.item = new GetStoreOwnerTeamForViewDto();
        this.item.storeOwnerTeam = new StoreOwnerTeamDto();
    }

    show(item: GetStoreOwnerTeamForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
