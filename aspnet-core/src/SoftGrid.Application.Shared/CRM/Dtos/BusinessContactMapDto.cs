﻿using System;
using Abp.Application.Services.Dto;

namespace SoftGrid.CRM.Dtos
{
    public class BusinessContactMapDto : EntityDto<long>
    {

        public long BusinessId { get; set; }

        public long ContactId { get; set; }

    }
}