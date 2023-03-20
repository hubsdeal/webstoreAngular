﻿using Abp;
using Abp.Configuration.Startup;
using Abp.Dependency;
using Abp.Domain.Uow;
using Abp.EntityFrameworkCore.Configuration;
using Abp.IdentityServer4vNext;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Abp.Zero.EntityFrameworkCore;
using SoftGrid.Configuration;
using SoftGrid.EntityHistory;
using SoftGrid.Migrations.Seed;

namespace SoftGrid.EntityFrameworkCore
{
    [DependsOn(
        typeof(AbpZeroCoreEntityFrameworkCoreModule),
        typeof(SoftGridCoreModule),
        typeof(AbpZeroCoreIdentityServervNextEntityFrameworkCoreModule)
        )]
    public class SoftGridEntityFrameworkCoreModule : AbpModule
    {
        /* Used it tests to skip DbContext registration, in order to use in-memory database of EF Core */
        public bool SkipDbContextRegistration { get; set; }

        public bool SkipDbSeed { get; set; }

        public override void PreInitialize()
        {
            Configuration.ReplaceService<IConnectionStringResolver, ConnectionStringResolver>();
            if (!SkipDbContextRegistration)
            {
                Configuration.Modules.AbpEfCore().AddDbContext<SoftGridDbContext>(options =>
                {
                    if (options.ExistingConnection != null)
                    {
                        SoftGridDbContextConfigurer.Configure(options.DbContextOptions, options.ExistingConnection);
                    }
                    else
                    {
                        SoftGridDbContextConfigurer.Configure(options.DbContextOptions, options.ConnectionString);
                    }
                });
                //initialize filestorage dbcontext
                Configuration.Modules.AbpEfCore().AddDbContext<SoftGridFileStorageDbContext>(options =>
                {
                    if (options.ExistingConnection != null)
                    {
                        SoftGridFileStorageDbContextConfigurer.Configure(options.DbContextOptions, options.ExistingConnection);
                    }
                    else
                    {
                        SoftGridFileStorageDbContextConfigurer.Configure(options.DbContextOptions, options.ConnectionString);
                    }
                });
            }

            // Set this setting to true for enabling entity history.
            Configuration.EntityHistory.IsEnabled = false;

            // Uncomment below line to write change logs for the entities below:
            // Configuration.EntityHistory.Selectors.Add("SoftGridEntities", EntityHistoryHelper.TrackedTypes);
            // Configuration.CustomConfigProviders.Add(new EntityHistoryConfigProvider(Configuration));
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(SoftGridEntityFrameworkCoreModule).GetAssembly());
        }

        public override void PostInitialize()
        {
            var configurationAccessor = IocManager.Resolve<IAppConfigurationAccessor>();

            using (var scope = IocManager.CreateScope())
            {
                if (!SkipDbSeed && scope.Resolve<DatabaseCheckHelper>().Exist(configurationAccessor.Configuration["ConnectionStrings:Default"]))
                {
                    SeedHelper.SeedHostDb(IocManager);
                }
            }
        }
    }
}
