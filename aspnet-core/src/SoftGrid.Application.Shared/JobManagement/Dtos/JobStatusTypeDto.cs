﻿using System;
using Abp.Application.Services.Dto;

namespace SoftGrid.JobManagement.Dtos
{
    public class JobStatusTypeDto : EntityDto<long>
    {
        public string Name { get; set; }

    }
}