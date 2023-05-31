﻿using System;
using Abp.Application.Services.Dto;
using System.ComponentModel.DataAnnotations;

namespace SoftGrid.WidgetManagement.Dtos
{
    public class CreateOrEditMasterWidgetDto : EntityDto<long?>
    {

        [Required]
        [StringLength(MasterWidgetConsts.MaxNameLength, MinimumLength = MasterWidgetConsts.MinNameLength)]
        public string Name { get; set; }

        public string Description { get; set; }

        public string DesignCode { get; set; }

        public bool Publish { get; set; }

        public int? InternalDisplayNumber { get; set; }

        public Guid ThumbnailImageId { get; set; }

    }
}