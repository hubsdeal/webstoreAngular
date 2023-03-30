﻿using Abp.Application.Services.Dto;
using System;

namespace SoftGrid.Territory.Dtos
{
    public class GetAllHubProductCategoriesInput : PagedAndSortedResultRequestDto
    {
        public string Filter { get; set; }

        public int? PublishedFilter { get; set; }

        public int? MaxDisplayScoreFilter { get; set; }
        public int? MinDisplayScoreFilter { get; set; }

        public string HubNameFilter { get; set; }

        public string ProductCategoryNameFilter { get; set; }

    }
}