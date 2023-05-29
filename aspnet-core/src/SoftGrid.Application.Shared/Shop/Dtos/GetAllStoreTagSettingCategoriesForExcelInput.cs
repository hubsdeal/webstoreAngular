﻿using Abp.Application.Services.Dto;
using System;

namespace SoftGrid.Shop.Dtos
{
    public class GetAllStoreTagSettingCategoriesForExcelInput
    {
        public string Filter { get; set; }

        public string NameFilter { get; set; }

        public Guid? ImageIdFilter { get; set; }

        public string DescriptionFilter { get; set; }

    }
}