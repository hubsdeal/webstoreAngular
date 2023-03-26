﻿using Abp.Application.Services.Dto;
using System;

namespace SoftGrid.Shop.Dtos
{
    public class GetAllStoreAccountTeamsForExcelInput
    {
        public string Filter { get; set; }

        public int? PrimaryFilter { get; set; }

        public int? ActiveFilter { get; set; }

        public int? OrderEmailNotificationFilter { get; set; }

        public int? OrderSmsNotificationFilter { get; set; }

        public string StoreNameFilter { get; set; }

        public string EmployeeNameFilter { get; set; }

    }
}