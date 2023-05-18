﻿import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { StoreRoutingModule } from './store-routing.module';
import { StoresComponent } from './stores.component';
import { CreateOrEditStoreModalComponent } from './create-or-edit-store-modal.component';
import { ViewStoreModalComponent } from './view-store-modal.component';
import { StoreMediaLibraryLookupTableModalComponent } from './store-mediaLibrary-lookup-table-modal.component';
import { StoreMasterTagLookupTableModalComponent } from './store-masterTag-lookup-table-modal.component';
import { StoreDashboardComponent } from './store-dashboard/store-dashboard.component';
import { StoreMediaModule } from '../storeMedias/storeMedia.module';
import { MyStoresComponent } from './my-stores/my-stores.component';

@NgModule({
    declarations: [
        StoresComponent,
        CreateOrEditStoreModalComponent,
        ViewStoreModalComponent,

        StoreMediaLibraryLookupTableModalComponent,
        StoreMasterTagLookupTableModalComponent,
        StoreDashboardComponent,
        MyStoresComponent,
    ],
    imports: [AppSharedModule, StoreRoutingModule, AdminSharedModule, StoreMediaModule],
    exports:[
        MyStoresComponent,
        CreateOrEditStoreModalComponent,
        StoreMediaLibraryLookupTableModalComponent,
        StoreMasterTagLookupTableModalComponent,
    ]
})
export class StoreModule {}
