﻿using SoftGrid.CRM;
using SoftGrid.Shop;
using SoftGrid.Shop;
using SoftGrid.LookupData;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;

namespace SoftGrid.Shop
{
    [Table("ProductReviews")]
    public class ProductReview : CreationAuditedEntity<long>, IMayHaveTenant
    {
        public int? TenantId { get; set; }

        [Required]
        public virtual string ReviewInfo { get; set; }

        public virtual DateTime? PostDate { get; set; }

        public virtual bool Publish { get; set; }

        [StringLength(ProductReviewConsts.MaxPostTimeLength, MinimumLength = ProductReviewConsts.MinPostTimeLength)]
        public virtual string PostTime { get; set; }

        public virtual long? ContactId { get; set; }

        [ForeignKey("ContactId")]
        public Contact ContactFk { get; set; }

        public virtual long ProductId { get; set; }

        [ForeignKey("ProductId")]
        public Product ProductFk { get; set; }

        public virtual long? StoreId { get; set; }

        [ForeignKey("StoreId")]
        public Store StoreFk { get; set; }

        public virtual long? RatingLikeId { get; set; }

        [ForeignKey("RatingLikeId")]
        public RatingLike RatingLikeFk { get; set; }

    }
}