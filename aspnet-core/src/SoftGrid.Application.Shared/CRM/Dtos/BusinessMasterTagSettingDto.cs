﻿using SoftGrid.Shop.Enums;

using System;
using Abp.Application.Services.Dto;

namespace SoftGrid.CRM.Dtos
{
    public class BusinessMasterTagSettingDto : EntityDto<long>
    {
        public int? DisplaySequence { get; set; }

        public bool DisplayPublic { get; set; }

        public string CustomTagTitle { get; set; }

        public string CustomTagChatQuestion { get; set; }

        public AnswerType AnswerTypeId { get; set; }

        public long? MasterTagCategoryId { get; set; }

        public long BusinessTypeId { get; set; }

    }
}