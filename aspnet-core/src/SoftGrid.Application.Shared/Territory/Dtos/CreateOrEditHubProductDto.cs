﻿using System;
using Abp.Application.Services.Dto;
using System.ComponentModel.DataAnnotations;

namespace SoftGrid.Territory.Dtos
{
    public class CreateOrEditHubProductDto : EntityDto<long?>
    {

        public bool Published { get; set; }

        public int? DisplayScore { get; set; }

        public long HubId { get; set; }

        public long ProductId { get; set; }

    }
}