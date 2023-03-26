﻿using System.Collections.Generic;
using SoftGrid.JobManagement.Dtos;
using SoftGrid.Dto;

namespace SoftGrid.JobManagement.Exporting
{
    public interface IJobTagsExcelExporter
    {
        FileDto ExportToFile(List<GetJobTagForViewDto> jobTags);
    }
}