﻿using System;
using Abp.Application.Services.Dto;
using System.ComponentModel.DataAnnotations;

namespace SoftGrid.Shop.Dtos
{
    public class CreateOrEditStoreNoteDto : EntityDto<long?>
    {

        public string Notes { get; set; }

        public long StoreId { get; set; }

    }
}