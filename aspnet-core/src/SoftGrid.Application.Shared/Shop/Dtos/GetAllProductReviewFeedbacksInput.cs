﻿using Abp.Application.Services.Dto;
using System;

namespace SoftGrid.Shop.Dtos
{
    public class GetAllProductReviewFeedbacksInput : PagedAndSortedResultRequestDto
    {
        public string Filter { get; set; }

        public string ReplyTextFilter { get; set; }

        public int? PublishedFilter { get; set; }

        public string ContactFullNameFilter { get; set; }

        public string ProductReviewReviewInfoFilter { get; set; }

        public string RatingLikeNameFilter { get; set; }

    }
}