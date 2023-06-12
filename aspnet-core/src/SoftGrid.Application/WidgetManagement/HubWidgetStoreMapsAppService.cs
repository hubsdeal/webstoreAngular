﻿using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;

using Microsoft.EntityFrameworkCore;

using SoftGrid.Authorization;
using SoftGrid.Dto;
using SoftGrid.Shop;
using SoftGrid.Storage;
using SoftGrid.WidgetManagement.Dtos;
using SoftGrid.WidgetManagement.Exporting;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;

namespace SoftGrid.WidgetManagement
{
    [AbpAuthorize(AppPermissions.Pages_HubWidgetStoreMaps)]
    public class HubWidgetStoreMapsAppService : SoftGridAppServiceBase, IHubWidgetStoreMapsAppService
    {
        private readonly IRepository<HubWidgetStoreMap, long> _hubWidgetStoreMapRepository;
        private readonly IHubWidgetStoreMapsExcelExporter _hubWidgetStoreMapsExcelExporter;
        private readonly IRepository<HubWidgetMap, long> _lookup_hubWidgetMapRepository;
        private readonly IRepository<Store, long> _lookup_storeRepository;
        private readonly IBinaryObjectManager _binaryObjectManager;

        public HubWidgetStoreMapsAppService(IRepository<HubWidgetStoreMap, long> hubWidgetStoreMapRepository, IHubWidgetStoreMapsExcelExporter hubWidgetStoreMapsExcelExporter, IRepository<HubWidgetMap, long> lookup_hubWidgetMapRepository, IRepository<Store, long> lookup_storeRepository, IBinaryObjectManager binaryObjectManager)
        {
            _hubWidgetStoreMapRepository = hubWidgetStoreMapRepository;
            _hubWidgetStoreMapsExcelExporter = hubWidgetStoreMapsExcelExporter;
            _lookup_hubWidgetMapRepository = lookup_hubWidgetMapRepository;
            _lookup_storeRepository = lookup_storeRepository;
            _binaryObjectManager = binaryObjectManager;
        }

        public async Task<PagedResultDto<GetHubWidgetStoreMapForViewDto>> GetAll(GetAllHubWidgetStoreMapsInput input)
        {

            var filteredHubWidgetStoreMaps = _hubWidgetStoreMapRepository.GetAll()
                        .Include(e => e.HubWidgetMapFk)
                        .Include(e => e.StoreFk)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.Filter), e => false)
                        .WhereIf(input.MinDisplaySequenceFilter != null, e => e.DisplaySequence >= input.MinDisplaySequenceFilter)
                        .WhereIf(input.MaxDisplaySequenceFilter != null, e => e.DisplaySequence <= input.MaxDisplaySequenceFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.HubWidgetMapCustomNameFilter), e => e.HubWidgetMapFk != null && e.HubWidgetMapFk.CustomName == input.HubWidgetMapCustomNameFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.StoreNameFilter), e => e.StoreFk != null && e.StoreFk.Name == input.StoreNameFilter);

            var pagedAndFilteredHubWidgetStoreMaps = filteredHubWidgetStoreMaps
                .OrderBy(input.Sorting ?? "id asc")
                .PageBy(input);

            var hubWidgetStoreMaps = from o in pagedAndFilteredHubWidgetStoreMaps
                                     join o1 in _lookup_hubWidgetMapRepository.GetAll() on o.HubWidgetMapId equals o1.Id into j1
                                     from s1 in j1.DefaultIfEmpty()

                                     join o2 in _lookup_storeRepository.GetAll() on o.StoreId equals o2.Id into j2
                                     from s2 in j2.DefaultIfEmpty()

                                     select new
                                     {

                                         o.DisplaySequence,
                                         Id = o.Id,
                                         HubWidgetMapCustomName = s1 == null || s1.CustomName == null ? "" : s1.CustomName.ToString(),
                                         StoreName = s2 == null || s2.Name == null ? "" : s2.Name.ToString()
                                     };

            var totalCount = await filteredHubWidgetStoreMaps.CountAsync();

            var dbList = await hubWidgetStoreMaps.ToListAsync();
            var results = new List<GetHubWidgetStoreMapForViewDto>();

            foreach (var o in dbList)
            {
                var res = new GetHubWidgetStoreMapForViewDto()
                {
                    HubWidgetStoreMap = new HubWidgetStoreMapDto
                    {

                        DisplaySequence = o.DisplaySequence,
                        Id = o.Id,
                    },
                    HubWidgetMapCustomName = o.HubWidgetMapCustomName,
                    StoreName = o.StoreName
                };

                results.Add(res);
            }

            return new PagedResultDto<GetHubWidgetStoreMapForViewDto>(
                totalCount,
                results
            );

        }

        public async Task<GetHubWidgetStoreMapForViewDto> GetHubWidgetStoreMapForView(long id)
        {
            var hubWidgetStoreMap = await _hubWidgetStoreMapRepository.GetAsync(id);

            var output = new GetHubWidgetStoreMapForViewDto { HubWidgetStoreMap = ObjectMapper.Map<HubWidgetStoreMapDto>(hubWidgetStoreMap) };

            if (output.HubWidgetStoreMap.HubWidgetMapId != null)
            {
                var _lookupHubWidgetMap = await _lookup_hubWidgetMapRepository.FirstOrDefaultAsync((long)output.HubWidgetStoreMap.HubWidgetMapId);
                output.HubWidgetMapCustomName = _lookupHubWidgetMap?.CustomName?.ToString();
            }

            if (output.HubWidgetStoreMap.StoreId != null)
            {
                var _lookupStore = await _lookup_storeRepository.FirstOrDefaultAsync((long)output.HubWidgetStoreMap.StoreId);
                output.StoreName = _lookupStore?.Name?.ToString();
            }

            return output;
        }

        [AbpAuthorize(AppPermissions.Pages_HubWidgetStoreMaps_Edit)]
        public async Task<GetHubWidgetStoreMapForEditOutput> GetHubWidgetStoreMapForEdit(EntityDto<long> input)
        {
            var hubWidgetStoreMap = await _hubWidgetStoreMapRepository.FirstOrDefaultAsync(input.Id);

            var output = new GetHubWidgetStoreMapForEditOutput { HubWidgetStoreMap = ObjectMapper.Map<CreateOrEditHubWidgetStoreMapDto>(hubWidgetStoreMap) };

            if (output.HubWidgetStoreMap.HubWidgetMapId != null)
            {
                var _lookupHubWidgetMap = await _lookup_hubWidgetMapRepository.FirstOrDefaultAsync((long)output.HubWidgetStoreMap.HubWidgetMapId);
                output.HubWidgetMapCustomName = _lookupHubWidgetMap?.CustomName?.ToString();
            }

            if (output.HubWidgetStoreMap.StoreId != null)
            {
                var _lookupStore = await _lookup_storeRepository.FirstOrDefaultAsync((long)output.HubWidgetStoreMap.StoreId);
                output.StoreName = _lookupStore?.Name?.ToString();
            }

            return output;
        }

        public async Task CreateOrEdit(CreateOrEditHubWidgetStoreMapDto input)
        {
            if (input.Id == null)
            {
                await Create(input);
            }
            else
            {
                await Update(input);
            }
        }

        [AbpAuthorize(AppPermissions.Pages_HubWidgetStoreMaps_Create)]
        protected virtual async Task Create(CreateOrEditHubWidgetStoreMapDto input)
        {
            var hubWidgetStoreMap = ObjectMapper.Map<HubWidgetStoreMap>(input);

            if (AbpSession.TenantId != null)
            {
                hubWidgetStoreMap.TenantId = (int?)AbpSession.TenantId;
            }

            await _hubWidgetStoreMapRepository.InsertAsync(hubWidgetStoreMap);

        }

        [AbpAuthorize(AppPermissions.Pages_HubWidgetStoreMaps_Edit)]
        protected virtual async Task Update(CreateOrEditHubWidgetStoreMapDto input)
        {
            var hubWidgetStoreMap = await _hubWidgetStoreMapRepository.FirstOrDefaultAsync((long)input.Id);
            ObjectMapper.Map(input, hubWidgetStoreMap);

        }

        [AbpAuthorize(AppPermissions.Pages_HubWidgetStoreMaps_Delete)]
        public async Task Delete(EntityDto<long> input)
        {
            await _hubWidgetStoreMapRepository.DeleteAsync(input.Id);
        }

        public async Task<FileDto> GetHubWidgetStoreMapsToExcel(GetAllHubWidgetStoreMapsForExcelInput input)
        {

            var filteredHubWidgetStoreMaps = _hubWidgetStoreMapRepository.GetAll()
                        .Include(e => e.HubWidgetMapFk)
                        .Include(e => e.StoreFk)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.Filter), e => false)
                        .WhereIf(input.MinDisplaySequenceFilter != null, e => e.DisplaySequence >= input.MinDisplaySequenceFilter)
                        .WhereIf(input.MaxDisplaySequenceFilter != null, e => e.DisplaySequence <= input.MaxDisplaySequenceFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.HubWidgetMapCustomNameFilter), e => e.HubWidgetMapFk != null && e.HubWidgetMapFk.CustomName == input.HubWidgetMapCustomNameFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.StoreNameFilter), e => e.StoreFk != null && e.StoreFk.Name == input.StoreNameFilter);

            var query = (from o in filteredHubWidgetStoreMaps
                         join o1 in _lookup_hubWidgetMapRepository.GetAll() on o.HubWidgetMapId equals o1.Id into j1
                         from s1 in j1.DefaultIfEmpty()

                         join o2 in _lookup_storeRepository.GetAll() on o.StoreId equals o2.Id into j2
                         from s2 in j2.DefaultIfEmpty()

                         select new GetHubWidgetStoreMapForViewDto()
                         {
                             HubWidgetStoreMap = new HubWidgetStoreMapDto
                             {
                                 DisplaySequence = o.DisplaySequence,
                                 Id = o.Id
                             },
                             HubWidgetMapCustomName = s1 == null || s1.CustomName == null ? "" : s1.CustomName.ToString(),
                             StoreName = s2 == null || s2.Name == null ? "" : s2.Name.ToString()
                         });

            var hubWidgetStoreMapListDtos = await query.ToListAsync();

            return _hubWidgetStoreMapsExcelExporter.ExportToFile(hubWidgetStoreMapListDtos);
        }

        [AbpAuthorize(AppPermissions.Pages_HubWidgetStoreMaps)]
        public async Task<PagedResultDto<HubWidgetStoreMapHubWidgetMapLookupTableDto>> GetAllHubWidgetMapForLookupTable(GetAllForLookupTableInput input)
        {
            var query = _lookup_hubWidgetMapRepository.GetAll().WhereIf(
                   !string.IsNullOrWhiteSpace(input.Filter),
                  e => e.CustomName != null && e.CustomName.Contains(input.Filter)
               );

            var totalCount = await query.CountAsync();

            var hubWidgetMapList = await query
                .PageBy(input)
                .ToListAsync();

            var lookupTableDtoList = new List<HubWidgetStoreMapHubWidgetMapLookupTableDto>();
            foreach (var hubWidgetMap in hubWidgetMapList)
            {
                lookupTableDtoList.Add(new HubWidgetStoreMapHubWidgetMapLookupTableDto
                {
                    Id = hubWidgetMap.Id,
                    DisplayName = hubWidgetMap.CustomName?.ToString()
                });
            }

            return new PagedResultDto<HubWidgetStoreMapHubWidgetMapLookupTableDto>(
                totalCount,
                lookupTableDtoList
            );
        }

        [AbpAuthorize(AppPermissions.Pages_HubWidgetStoreMaps)]
        public async Task<PagedResultDto<HubWidgetStoreMapStoreLookupTableDto>> GetAllStoreForLookupTable(GetAllForLookupTableInput input)
        {
            var query = _lookup_storeRepository.GetAll().WhereIf(
                   !string.IsNullOrWhiteSpace(input.Filter),
                  e => e.Name != null && e.Name.Contains(input.Filter)
               );

            var totalCount = await query.CountAsync();

            var storeList = await query
                .PageBy(input)
                .ToListAsync();

            var lookupTableDtoList = new List<HubWidgetStoreMapStoreLookupTableDto>();
            foreach (var store in storeList)
            {
                lookupTableDtoList.Add(new HubWidgetStoreMapStoreLookupTableDto
                {
                    Id = store.Id,
                    DisplayName = store.Name?.ToString()
                });
            }

            return new PagedResultDto<HubWidgetStoreMapStoreLookupTableDto>(
                totalCount,
                lookupTableDtoList
            );
        }


        [AbpAllowAnonymous]
        public async Task<dynamic> GetHubWidgetStoresByHubId(long hubId)
        {
            try
            {
                var dataList = await _hubWidgetStoreMapRepository.GetAll()
                .Include(c => c.HubWidgetMapFk).ThenInclude(c => c.MasterWidgetFk)
                .Include(c => c.StoreFk).ThenInclude(c => c.CountryFk)
                .Include(c => c.StoreFk).ThenInclude(c => c.StateFk)
                .Include(c => c.StoreFk).ThenInclude(c => c.LogoMediaLibraryFk)
                .Include(c => c.StoreFk).ThenInclude(c => c.StoreCategoryFk).ThenInclude(c => c.PictureMediaLibraryFk)
                .Include(c => c.StoreFk).ThenInclude(c => c.StoreCategoryFk).ThenInclude(c => c.MasterTagCategoryFk)
                .Include(c => c.StoreFk).ThenInclude(c => c.StoreTagSettingCategoryFk)
                .Where(c => c.HubWidgetMapFk.HubId == hubId).ToListAsync(); // TODO: Make is Paginated. RB- #SRABAN


                var widgets = dataList.Where(c => c.HubWidgetMapFk.MasterWidgetFk.Publish).Distinct()
                    .Select(c => new HwsMapWidgetJsonViewDto
                    {
                        Id = c.HubWidgetMapFk?.MasterWidgetFk?.Id,
                        Name = c.HubWidgetMapFk?.MasterWidgetFk?.Name,
                        Description = c.HubWidgetMapFk?.MasterWidgetFk?.Description,
                        DesignCode = c.HubWidgetMapFk?.MasterWidgetFk?.DesignCode,
                        InternalDisplayNumber = c.HubWidgetMapFk?.MasterWidgetFk?.InternalDisplayNumber,
                        ThumbnailImageId = c.HubWidgetMapFk?.MasterWidgetFk?.ThumbnailImageId,
                        TenantId = c.HubWidgetMapFk?.MasterWidgetFk?.TenantId,
                        Publish = c.HubWidgetMapFk?.MasterWidgetFk?.Publish ?? false,
                        HubId = c.HubWidgetMapFk?.HubId,
                    }).ToList();


                foreach (var widget in widgets)
                {
                    widget.Stores = dataList.Where(c => c.HubWidgetMapFk?.MasterWidgetFk?.Id == widget.Id).Select(async c => new HwsStoreJsonViewDto
                    {
                        Id = c?.Id,
                        WidgetId = widget.Id,
                        HubId = widget?.HubId,
                        Name = c?.StoreFk?.Name,
                        DisplaySequence = c?.DisplaySequence,
                        TenantId = c?.StoreFk?.TenantId,
                        Address = c?.StoreFk?.Address,
                        City = c?.StoreFk?.City,
                        CountryId = c?.StoreFk?.CountryId,
                        IsVerified = c?.StoreFk?.IsVerified,

                        Country = new
                        {
                            c?.StoreFk?.CountryFk?.Id,
                            c?.StoreFk?.CountryFk?.Name,
                            c?.StoreFk?.CountryFk?.TenantId,
                            c?.StoreFk?.CountryFk?.FlagIcon,
                            c?.StoreFk?.CountryFk?.PhoneCode,
                            c?.StoreFk?.CountryFk?.Ticker,
                        },


                        StateId = c?.StoreFk?.StateId,
                        State = new
                        {
                            c?.StoreFk?.StateFk?.Id,
                            c?.StoreFk?.StateFk?.Name,
                            c?.StoreFk?.StateFk?.TenantId,
                            c?.StoreFk?.StateFk?.CountryId,
                            c?.StoreFk?.StateFk?.Ticker,
                        },


                        StoreCategoryId = c?.StoreFk?.StoreCategoryId,
                        StoreCategory = new
                        {
                            c?.StoreFk?.StoreCategoryFk?.Id,
                            c?.StoreFk?.StoreCategoryFk?.Name,
                            c?.StoreFk?.StoreCategoryFk?.TenantId,
                            c?.StoreFk?.StoreCategoryFk?.DisplaySequence,
                            c?.StoreFk?.StoreCategoryFk?.Description,
                            c?.StoreFk?.StoreCategoryFk?.Synonyms,

                            #region MasterTagCategory

                            c?.StoreFk?.StoreCategoryFk?.MasterTagCategoryId,
                            MasterTagCategory = new
                            {
                                c?.StoreFk?.StoreCategoryFk?.MasterTagCategoryFk?.Id,
                                c?.StoreFk?.StoreCategoryFk?.MasterTagCategoryFk?.Name,
                                c?.StoreFk?.StoreCategoryFk?.MasterTagCategoryFk?.Description,
                                c?.StoreFk?.StoreCategoryFk?.MasterTagCategoryFk?.TenantId,
                            },

                            #endregion

                            #region PictureMediaLibrary

                            c?.StoreFk?.StoreCategoryFk?.PictureMediaLibraryId,
                            PictureMediaLibrary = new
                            {
                                c?.StoreFk?.StoreCategoryFk?.PictureMediaLibraryFk?.Name,
                                c?.StoreFk?.StoreCategoryFk?.PictureMediaLibraryFk?.AltTag,
                                c?.StoreFk?.StoreCategoryFk?.PictureMediaLibraryFk?.TenantId,
                                c?.StoreFk?.StoreCategoryFk?.PictureMediaLibraryFk?.VirtualPath,
                            },


                            LogoMediaLibrary = new
                            {
                                c?.StoreFk?.LogoMediaLibraryFk?.Name,
                                c?.StoreFk?.LogoMediaLibraryFk?.AltTag,
                                c?.StoreFk?.LogoMediaLibraryFk?.TenantId,
                                c?.StoreFk?.LogoMediaLibraryFk?.VirtualPath,
                                Logo = (c.StoreFk?.LogoMediaLibraryFk?.BinaryObjectId != null && c.StoreFk?.LogoMediaLibraryFk?.BinaryObjectId != Guid.Empty)
                                    ? await _binaryObjectManager.GetStorePictureUrlAsync((c.StoreFk?.LogoMediaLibraryFk?.BinaryObjectId ?? Guid.Empty), ".png")
                                    : ""
                            }

                            #endregion



                        },

                    }).ToList();

                }

                return widgets;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }



        }

    }
}