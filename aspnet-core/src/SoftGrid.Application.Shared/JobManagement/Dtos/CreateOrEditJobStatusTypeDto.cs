﻿using System;
using Abp.Application.Services.Dto;
using System.ComponentModel.DataAnnotations;

namespace SoftGrid.JobManagement.Dtos
{
    public class CreateOrEditJobStatusTypeDto : EntityDto<long?>
    {

        [Required]
        [StringLength(JobStatusTypeConsts.MaxNameLength, MinimumLength = JobStatusTypeConsts.MinNameLength)]
        public string Name { get; set; }

    }
}