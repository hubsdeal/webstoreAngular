﻿using System;
using Abp.Application.Services.Dto;

namespace SoftGrid.CRM.Dtos
{
    public class BusinessStoreMapDto : EntityDto<long>
    {

        public long BusinessId { get; set; }

        public long StoreId { get; set; }

    }
}