﻿import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeesComponent } from './employees.component';
import { CreateOrEditEmployeeModalComponent } from './create-or-edit-employee-modal.component';
import { ViewEmployeeModalComponent } from './view-employee-modal.component';
import { EmployeeStateLookupTableModalComponent } from './employee-state-lookup-table-modal.component';
import { EmployeeCountryLookupTableModalComponent } from './employee-country-lookup-table-modal.component';
import { EmployeeContactLookupTableModalComponent } from './employee-contact-lookup-table-modal.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { StoreModule } from '@app/main/shop/stores/store.module';
import { MyEmployeesComponent } from './my-employees/my-employees.component';

@NgModule({
    declarations: [
        EmployeesComponent,
        CreateOrEditEmployeeModalComponent,
        ViewEmployeeModalComponent,

        EmployeeStateLookupTableModalComponent,
        EmployeeCountryLookupTableModalComponent,
        EmployeeContactLookupTableModalComponent,
        EmployeeDashboardComponent,
        MyEmployeesComponent,
    ],
    imports: [AppSharedModule, EmployeeRoutingModule, AdminSharedModule, StoreModule],
})
export class EmployeeModule {}
