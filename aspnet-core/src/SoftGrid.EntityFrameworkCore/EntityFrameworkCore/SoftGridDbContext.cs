﻿using SoftGrid.SalesLeadManagement;
using SoftGrid.TaskManagement;
using SoftGrid.JobManagement;
using SoftGrid.Shop;
using SoftGrid.CRM;
using SoftGrid.Territory;
using SoftGrid.LookupData;
using Abp.IdentityServer4vNext;
using Abp.Zero.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SoftGrid.Authorization.Delegation;
using SoftGrid.Authorization.Roles;
using SoftGrid.Authorization.Users;
using SoftGrid.Chat;
using SoftGrid.Editions;
using SoftGrid.Friendships;
using SoftGrid.MultiTenancy;
using SoftGrid.MultiTenancy.Accounting;
using SoftGrid.MultiTenancy.Payments;
using SoftGrid.Storage;

namespace SoftGrid.EntityFrameworkCore
{
    public class SoftGridDbContext : AbpZeroDbContext<Tenant, Role, User, SoftGridDbContext>, IAbpPersistedGrantDbContext
    {
        public virtual DbSet<SubscriptionType> SubscriptionTypes { get; set; }

        public virtual DbSet<ProductSubscriptionMap> ProductSubscriptionMaps { get; set; }

        public virtual DbSet<SocialMedia> SocialMedias { get; set; }

        public virtual DbSet<ProductCustomerStat> ProductCustomerStats { get; set; }

        public virtual DbSet<ProductFaq> ProductFaqs { get; set; }

        public virtual DbSet<ProductCustomerQuery> ProductCustomerQueries { get; set; }

        public virtual DbSet<ProductPackage> ProductPackages { get; set; }

        public virtual DbSet<ProductNote> ProductNotes { get; set; }

        public virtual DbSet<ProductMedia> ProductMedias { get; set; }

        public virtual DbSet<ProductCategoryTeam> ProductCategoryTeams { get; set; }

        public virtual DbSet<ProductCategoryMap> ProductCategoryMaps { get; set; }

        public virtual DbSet<ProductVariant> ProductVariants { get; set; }

        public virtual DbSet<ProductVariantCategory> ProductVariantCategories { get; set; }

        public virtual DbSet<HubNavigationMenu> HubNavigationMenus { get; set; }

        public virtual DbSet<MasterNavigationMenu> MasterNavigationMenus { get; set; }

        public virtual DbSet<HubAccountTeam> HubAccountTeams { get; set; }

        public virtual DbSet<HubSalesProjection> HubSalesProjections { get; set; }

        public virtual DbSet<HubZipCodeMap> HubZipCodeMaps { get; set; }

        public virtual DbSet<HubContact> HubContacts { get; set; }

        public virtual DbSet<HubBusiness> HubBusinesses { get; set; }

        public virtual DbSet<HubStore> HubStores { get; set; }

        public virtual DbSet<HubProduct> HubProducts { get; set; }

        public virtual DbSet<HubProductCategory> HubProductCategories { get; set; }

        public virtual DbSet<LeadReferralReward> LeadReferralRewards { get; set; }

        public virtual DbSet<LeadContact> LeadContacts { get; set; }

        public virtual DbSet<LeadNote> LeadNotes { get; set; }

        public virtual DbSet<LeadTask> LeadTasks { get; set; }

        public virtual DbSet<LeadTag> LeadTags { get; set; }

        public virtual DbSet<LeadSalesTeam> LeadSalesTeams { get; set; }

        public virtual DbSet<LeadPipelineStatus> LeadPipelineStatuses { get; set; }

        public virtual DbSet<Lead> Leads { get; set; }

        public virtual DbSet<LeadPipelineStage> LeadPipelineStages { get; set; }

        public virtual DbSet<LeadSource> LeadSources { get; set; }

        public virtual DbSet<StoreZipCodeMap> StoreZipCodeMaps { get; set; }

        public virtual DbSet<StoreReviewFeedback> StoreReviewFeedbacks { get; set; }

        public virtual DbSet<StoreReview> StoreReviews { get; set; }

        public virtual DbSet<StoreRelevantStore> StoreRelevantStores { get; set; }

        public virtual DbSet<StoreMarketplaceCommissionSetting> StoreMarketplaceCommissionSettings { get; set; }

        public virtual DbSet<MarketplaceCommissionType> MarketplaceCommissionTypes { get; set; }

        public virtual DbSet<StoreSalesAlert> StoreSalesAlerts { get; set; }

        public virtual DbSet<StoreTax> StoreTaxes { get; set; }

        public virtual DbSet<StoreBankAccount> StoreBankAccounts { get; set; }

        public virtual DbSet<StoreNote> StoreNotes { get; set; }

        public virtual DbSet<StoreMedia> StoreMedias { get; set; }

        public virtual DbSet<StoreLocation> StoreLocations { get; set; }

        public virtual DbSet<StoreBusinessHour> StoreBusinessHours { get; set; }

        public virtual DbSet<StoreContactMap> StoreContactMaps { get; set; }

        public virtual DbSet<StoreBusinessCustomerMap> StoreBusinessCustomerMaps { get; set; }

        public virtual DbSet<StoreOwnerTeam> StoreOwnerTeams { get; set; }

        public virtual DbSet<StoreAccountTeam> StoreAccountTeams { get; set; }

        public virtual DbSet<StoreProductMap> StoreProductMaps { get; set; }

        public virtual DbSet<StoreProductCategoryMap> StoreProductCategoryMaps { get; set; }

        public virtual DbSet<EmployeeTag> EmployeeTags { get; set; }

        public virtual DbSet<BusinessTaskMap> BusinessTaskMaps { get; set; }

        public virtual DbSet<BusinessProductMap> BusinessProductMaps { get; set; }

        public virtual DbSet<BusinessStoreMap> BusinessStoreMaps { get; set; }

        public virtual DbSet<BusinessJobMap> BusinessJobMaps { get; set; }

        public virtual DbSet<BusinessNote> BusinessNotes { get; set; }

        public virtual DbSet<BusinessUser> BusinessUsers { get; set; }

        public virtual DbSet<BusinessAccountTeam> BusinessAccountTeams { get; set; }

        public virtual DbSet<BusinessContactMap> BusinessContactMaps { get; set; }

        public virtual DbSet<TaskTag> TaskTags { get; set; }

        public virtual DbSet<TaskEvent> TaskEvents { get; set; }

        public virtual DbSet<TaskStatus> TaskStatuses { get; set; }

        public virtual DbSet<Employee> Employees { get; set; }

        public virtual DbSet<JobTag> JobTags { get; set; }

        public virtual DbSet<Job> Jobs { get; set; }

        public virtual DbSet<JobStatusType> JobStatusTypes { get; set; }

        public virtual DbSet<StoreTag> StoreTags { get; set; }

        public virtual DbSet<ProductTag> ProductTags { get; set; }

        public virtual DbSet<BusinessTag> BusinessTags { get; set; }

        public virtual DbSet<ContactTag> ContactTags { get; set; }

        public virtual DbSet<Store> Stores { get; set; }

        public virtual DbSet<Product> Products { get; set; }

        public virtual DbSet<ProductCategory> ProductCategories { get; set; }

        public virtual DbSet<MediaLibrary> MediaLibraries { get; set; }

        public virtual DbSet<Business> Businesses { get; set; }

        public virtual DbSet<Contact> Contacts { get; set; }

        public virtual DbSet<Hub> Hubs { get; set; }

        public virtual DbSet<HubType> HubTypes { get; set; }

        public virtual DbSet<MembershipType> MembershipTypes { get; set; }

        public virtual DbSet<ContractType> ContractTypes { get; set; }

        public virtual DbSet<DocumentType> DocumentTypes { get; set; }

        public virtual DbSet<SmsTemplate> SmsTemplates { get; set; }

        public virtual DbSet<EmailTemplate> EmailTemplates { get; set; }

        public virtual DbSet<ConnectChannel> ConnectChannels { get; set; }

        public virtual DbSet<ZipCode> ZipCodes { get; set; }

        public virtual DbSet<RatingLike> RatingLikes { get; set; }

        public virtual DbSet<MeasurementUnit> MeasurementUnits { get; set; }

        public virtual DbSet<MasterTag> MasterTags { get; set; }

        public virtual DbSet<MasterTagCategory> MasterTagCategories { get; set; }

        public virtual DbSet<City> Cities { get; set; }

        public virtual DbSet<County> Counties { get; set; }

        public virtual DbSet<State> States { get; set; }

        public virtual DbSet<Country> Countries { get; set; }

        public virtual DbSet<Currency> Currencies { get; set; }

        /* Define an IDbSet for each entity of the application */

        public virtual DbSet<BinaryObject> BinaryObjects { get; set; }

        public virtual DbSet<Friendship> Friendships { get; set; }

        public virtual DbSet<ChatMessage> ChatMessages { get; set; }

        public virtual DbSet<SubscribableEdition> SubscribableEditions { get; set; }

        public virtual DbSet<SubscriptionPayment> SubscriptionPayments { get; set; }

        public virtual DbSet<Invoice> Invoices { get; set; }

        public virtual DbSet<PersistedGrantEntity> PersistedGrants { get; set; }

        public virtual DbSet<SubscriptionPaymentExtensionData> SubscriptionPaymentExtensionDatas { get; set; }

        public virtual DbSet<UserDelegation> UserDelegations { get; set; }

        public virtual DbSet<RecentPassword> RecentPasswords { get; set; }

        public SoftGridDbContext(DbContextOptions<SoftGridDbContext> options)
            : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ProductSubscriptionMap>(p =>
            {
                p.HasIndex(e => new { e.TenantId });
            });
            modelBuilder.Entity<SubscriptionType>(s =>
                       {
                           s.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<ProductSubscriptionMap>(p =>
                       {
                           p.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<ProductCustomerStat>(p =>
                       {
                           p.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<SocialMedia>(s =>
                       {
                           s.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<ProductCustomerStat>(p =>
                       {
                           p.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<ProductFaq>(p =>
                       {
                           p.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<ProductCustomerQuery>(p =>
                       {
                           p.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<ProductPackage>(p =>
                       {
                           p.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<ProductNote>(p =>
                       {
                           p.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<ProductMedia>(p =>
                       {
                           p.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<ProductCategoryTeam>(p =>
                       {
                           p.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<ProductCategoryMap>(p =>
                       {
                           p.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<ProductVariant>(p =>
                       {
                           p.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<ProductVariantCategory>(p =>
                       {
                           p.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<Product>(p =>
                       {
                           p.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<HubNavigationMenu>(h =>
                       {
                           h.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<MasterNavigationMenu>(m =>
                       {
                           m.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<HubAccountTeam>(h =>
                       {
                           h.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<HubSalesProjection>(h =>
                       {
                           h.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<HubZipCodeMap>(h =>
                       {
                           h.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<HubContact>(h =>
                       {
                           h.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<HubBusiness>(h =>
                       {
                           h.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<HubStore>(h =>
                       {
                           h.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<HubProduct>(h =>
                       {
                           h.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<HubProductCategory>(h =>
                       {
                           h.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<LeadReferralReward>(l =>
                       {
                           l.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<LeadContact>(l =>
                       {
                           l.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<LeadNote>(l =>
                       {
                           l.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<LeadTask>(l =>
                       {
                           l.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<LeadTag>(l =>
                       {
                           l.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<LeadSalesTeam>(l =>
                       {
                           l.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<LeadPipelineStatus>(l =>
                       {
                           l.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<Lead>(l =>
                       {
                           l.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<LeadPipelineStage>(l =>
                       {
                           l.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<LeadSource>(l =>
                       {
                           l.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<StoreZipCodeMap>(s =>
                       {
                           s.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<StoreReviewFeedback>(s =>
                       {
                           s.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<StoreReview>(s =>
                       {
                           s.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<StoreRelevantStore>(s =>
                       {
                           s.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<StoreMarketplaceCommissionSetting>(s =>
                       {
                           s.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<MarketplaceCommissionType>(m =>
                       {
                           m.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<StoreSalesAlert>(s =>
                       {
                           s.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<StoreTax>(s =>
                       {
                           s.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<StoreBankAccount>(s =>
                       {
                           s.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<StoreNote>(s =>
                       {
                           s.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<StoreMedia>(s =>
                       {
                           s.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<StoreLocation>(s =>
                       {
                           s.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<StoreBusinessHour>(s =>
                       {
                           s.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<StoreContactMap>(s =>
                       {
                           s.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<StoreBusinessCustomerMap>(s =>
                       {
                           s.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<StoreOwnerTeam>(s =>
                       {
                           s.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<StoreAccountTeam>(s =>
                       {
                           s.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<StoreProductMap>(s =>
                       {
                           s.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<StoreProductCategoryMap>(s =>
                       {
                           s.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<EmployeeTag>(x =>
                       {
                           x.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<BusinessTaskMap>(b =>
                       {
                           b.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<BusinessProductMap>(b =>
                       {
                           b.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<BusinessStoreMap>(b =>
                       {
                           b.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<BusinessJobMap>(b =>
                       {
                           b.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<BusinessNote>(b =>
                       {
                           b.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<BusinessUser>(b =>
                       {
                           b.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<BusinessAccountTeam>(b =>
                       {
                           b.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<BusinessContactMap>(b =>
                       {
                           b.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<TaskTag>(t =>
                       {
                           t.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<TaskEvent>(t =>
                       {
                           t.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<TaskStatus>(t =>
                       {
                           t.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<Employee>(x =>
                       {
                           x.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<JobTag>(j =>
                       {
                           j.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<Job>(j =>
                       {
                           j.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<JobStatusType>(j =>
                       {
                           j.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<StoreTag>(s =>
                       {
                           s.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<ProductTag>(p =>
                       {
                           p.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<BusinessTag>(b =>
                       {
                           b.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<ContactTag>(c =>
                       {
                           c.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<Store>(s =>
                       {
                           s.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<Product>(p =>
                       {
                           p.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<ProductCategory>(p =>
                       {
                           p.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<MasterTag>(m =>
                       {
                           m.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<MasterTagCategory>(m =>
                       {
                           m.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<Hub>(h =>
                       {
                           h.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<Business>(b =>
                       {
                           b.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<MediaLibrary>(m =>
                       {
                           m.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<Business>(b =>
                       {
                           b.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<Contact>(c =>
                       {
                           c.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<Hub>(h =>
                       {
                           h.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<HubType>(h =>
                       {
                           h.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<MembershipType>(m =>
                       {
                           m.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<ContractType>(c =>
                       {
                           c.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<DocumentType>(d =>
                       {
                           d.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<SmsTemplate>(s =>
                       {
                           s.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<EmailTemplate>(x =>
                       {
                           x.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<ConnectChannel>(c =>
                       {
                           c.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<ZipCode>(z =>
                       {
                           z.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<RatingLike>(r =>
                       {
                           r.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<MeasurementUnit>(m =>
                       {
                           m.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<MasterTag>(m =>
                       {
                           m.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<MasterTagCategory>(m =>
                       {
                           m.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<City>(c =>
                       {
                           c.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<County>(c =>
                       {
                           c.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<State>(s =>
                       {
                           s.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<Country>(c =>
                       {
                           c.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<Currency>(c =>
                       {
                           c.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<BinaryObject>(b =>
                       {
                           b.HasIndex(e => new { e.TenantId });
                       });

            modelBuilder.Entity<ChatMessage>(b =>
            {
                b.HasIndex(e => new { e.TenantId, e.UserId, e.ReadState });
                b.HasIndex(e => new { e.TenantId, e.TargetUserId, e.ReadState });
                b.HasIndex(e => new { e.TargetTenantId, e.TargetUserId, e.ReadState });
                b.HasIndex(e => new { e.TargetTenantId, e.UserId, e.ReadState });
            });

            modelBuilder.Entity<Friendship>(b =>
            {
                b.HasIndex(e => new { e.TenantId, e.UserId });
                b.HasIndex(e => new { e.TenantId, e.FriendUserId });
                b.HasIndex(e => new { e.FriendTenantId, e.UserId });
                b.HasIndex(e => new { e.FriendTenantId, e.FriendUserId });
            });

            modelBuilder.Entity<Tenant>(b =>
            {
                b.HasIndex(e => new { e.SubscriptionEndDateUtc });
                b.HasIndex(e => new { e.CreationTime });
            });

            modelBuilder.Entity<SubscriptionPayment>(b =>
            {
                b.HasIndex(e => new { e.Status, e.CreationTime });
                b.HasIndex(e => new { PaymentId = e.ExternalPaymentId, e.Gateway });
            });

            modelBuilder.Entity<SubscriptionPaymentExtensionData>(b =>
            {
                b.HasQueryFilter(m => !m.IsDeleted)
                    .HasIndex(e => new { e.SubscriptionPaymentId, e.Key, e.IsDeleted })
                    .IsUnique()
                    .HasFilter("[IsDeleted] = 0");
            });

            modelBuilder.Entity<UserDelegation>(b =>
            {
                b.HasIndex(e => new { e.TenantId, e.SourceUserId });
                b.HasIndex(e => new { e.TenantId, e.TargetUserId });
            });

            modelBuilder.ConfigurePersistedGrantEntity();
        }
    }
}