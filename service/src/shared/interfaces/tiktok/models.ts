import localVarRequest from 'request';

export * from './order/V202406/AddExternalOrderReferencesRequestBody';
export * from './order/V202406/AddExternalOrderReferencesRequestBodyOrders';
export * from './order/V202406/AddExternalOrderReferencesRequestBodyOrdersExternalOrder';
export * from './order/V202406/AddExternalOrderReferencesRequestBodyOrdersExternalOrderLineItems';
export * from './order/V202406/AddExternalOrderReferencesResponse';
export * from './order/V202406/AddExternalOrderReferencesResponseData';
export * from './order/V202406/AddExternalOrderReferencesResponseDataErrors';
export * from './order/V202406/AddExternalOrderReferencesResponseDataErrorsDetail';
export * from './order/V202406/AddExternalOrderReferencesResponseDataErrorsDetailExternalOrder';
export * from './order/V202406/GetExternalOrderReferencesResponse';
export * from './order/V202406/GetExternalOrderReferencesResponseData';
export * from './order/V202406/GetExternalOrderReferencesResponseDataExternalOrders';
export * from './order/V202406/GetExternalOrderReferencesResponseDataExternalOrdersLineItems';
export * from './order/V202406/SearchOrderByExternalOrderReferenceResponse';
export * from './order/V202406/SearchOrderByExternalOrderReferenceResponseData';
export * from './order/V202406/SearchOrderByExternalOrderReferenceResponseDataOrders';
export * from './order/V202406/SearchOrderByExternalOrderReferenceResponseDataOrdersExternalOrder';
export * from './order/V202406/SearchOrderByExternalOrderReferenceResponseDataOrdersExternalOrderLineItems';
export * from './order/V202407/GetPriceDetailResponse';
export * from './order/V202407/GetPriceDetailResponseData';
export * from './order/V202407/GetPriceDetailResponseDataLineItems';
export * from './order/V202507/GetOrderDetailResponse';
export * from './order/V202507/GetOrderDetailResponseData';
export * from './order/V202507/GetOrderDetailResponseDataOrders';
export * from './order/V202507/GetOrderDetailResponseDataOrdersHandlingDuration';
export * from './order/V202507/GetOrderDetailResponseDataOrdersLineItems';
export * from './order/V202507/GetOrderDetailResponseDataOrdersLineItemsCombinedListingSkus';
export * from './order/V202507/GetOrderDetailResponseDataOrdersLineItemsItemTax';
export * from './order/V202507/GetOrderDetailResponseDataOrdersPackages';
export * from './order/V202507/GetOrderDetailResponseDataOrdersPayment';
export * from './order/V202507/GetOrderDetailResponseDataOrdersRecipientAddress';
export * from './order/V202507/GetOrderDetailResponseDataOrdersRecipientAddressDeliveryPreferences';
export * from './order/V202507/GetOrderDetailResponseDataOrdersRecipientAddressDistrictInfo';
export * from './product/V202309/ActivateProductRequestBody';
export * from './product/V202309/ActivateProductResponse';
export * from './product/V202309/ActivateProductResponseData';
export * from './product/V202309/ActivateProductResponseDataErrors';
export * from './product/V202309/ActivateProductResponseDataErrorsDetail';
export * from './product/V202309/ActivateProductResponseDataErrorsDetailExtraErrors';
export * from './product/V202309/CheckListingPrerequisitesResponse';
export * from './product/V202309/CheckListingPrerequisitesResponseData';
export * from './product/V202309/CheckListingPrerequisitesResponseDataShop';
export * from './product/V202309/CheckListingPrerequisitesResponseDataShopGne';
export * from './product/V202309/CheckListingPrerequisitesResponseDataShopLogistics';
export * from './product/V202309/CheckProductListingRequestBody';
export * from './product/V202309/CheckProductListingRequestBodyCertifications';
export * from './product/V202309/CheckProductListingRequestBodyCertificationsFiles';
export * from './product/V202309/CheckProductListingRequestBodyCertificationsImages';
export * from './product/V202309/CheckProductListingRequestBodyMainImages';
export * from './product/V202309/CheckProductListingRequestBodyPackageDimensions';
export * from './product/V202309/CheckProductListingRequestBodyPackageWeight';
export * from './product/V202309/CheckProductListingRequestBodyProductAttributes';
export * from './product/V202309/CheckProductListingRequestBodyProductAttributesValues';
export * from './product/V202309/CheckProductListingRequestBodySizeChart';
export * from './product/V202309/CheckProductListingRequestBodySizeChartImage';
export * from './product/V202309/CheckProductListingRequestBodySizeChartTemplate';
export * from './product/V202309/CheckProductListingRequestBodySkus';
export * from './product/V202309/CheckProductListingRequestBodySkusCombinedSkus';
export * from './product/V202309/CheckProductListingRequestBodySkusExternalListPrices';
export * from './product/V202309/CheckProductListingRequestBodySkusIdentifierCode';
export * from './product/V202309/CheckProductListingRequestBodySkusInventory';
export * from './product/V202309/CheckProductListingRequestBodySkusListPrice';
export * from './product/V202309/CheckProductListingRequestBodySkusPreSale';
export * from './product/V202309/CheckProductListingRequestBodySkusPreSaleFulfillmentType';
export * from './product/V202309/CheckProductListingRequestBodySkusPrice';
export * from './product/V202309/CheckProductListingRequestBodySkusSalesAttributes';
export * from './product/V202309/CheckProductListingRequestBodySkusSalesAttributesSkuImg';
export * from './product/V202309/CheckProductListingRequestBodySkusSalesAttributesSupplementarySkuImages';
export * from './product/V202309/CheckProductListingRequestBodyVideo';
export * from './product/V202309/CheckProductListingResponse';
export * from './product/V202309/CheckProductListingResponseData';
export * from './product/V202309/CheckProductListingResponseDataDiagnoses';
export * from './product/V202309/CheckProductListingResponseDataDiagnosesDiagnosisResults';
export * from './product/V202309/CheckProductListingResponseDataDiagnosesSuggestions';
export * from './product/V202309/CheckProductListingResponseDataDiagnosesSuggestionsImages';
export * from './product/V202309/CheckProductListingResponseDataDiagnosesSuggestionsSeoWords';
export * from './product/V202309/CheckProductListingResponseDataDiagnosesSuggestionsSmartTexts';
export * from './product/V202309/CheckProductListingResponseDataFailReasons';
export * from './product/V202309/CheckProductListingResponseDataListingQuality';
export * from './product/V202309/CheckProductListingResponseDataWarnings';
export * from './product/V202309/CreateCustomBrandsRequestBody';
export * from './product/V202309/CreateCustomBrandsResponse';
export * from './product/V202309/CreateCustomBrandsResponseData';
export * from './product/V202309/CreateGlobalProductRequestBody';
export * from './product/V202309/CreateGlobalProductRequestBodyCertifications';
export * from './product/V202309/CreateGlobalProductRequestBodyCertificationsFiles';
export * from './product/V202309/CreateGlobalProductRequestBodyCertificationsImages';
export * from './product/V202309/CreateGlobalProductRequestBodyMainImages';
export * from './product/V202309/CreateGlobalProductRequestBodyManufacturer';
export * from './product/V202309/CreateGlobalProductRequestBodyPackageDimensions';
export * from './product/V202309/CreateGlobalProductRequestBodyPackageWeight';
export * from './product/V202309/CreateGlobalProductRequestBodyProductAttributes';
export * from './product/V202309/CreateGlobalProductRequestBodyProductAttributesValues';
export * from './product/V202309/CreateGlobalProductRequestBodySizeChart';
export * from './product/V202309/CreateGlobalProductRequestBodySizeChartImage';
export * from './product/V202309/CreateGlobalProductRequestBodySizeChartTemplate';
export * from './product/V202309/CreateGlobalProductRequestBodySkus';
export * from './product/V202309/CreateGlobalProductRequestBodySkusIdentifierCode';
export * from './product/V202309/CreateGlobalProductRequestBodySkusInventory';
export * from './product/V202309/CreateGlobalProductRequestBodySkusPrice';
export * from './product/V202309/CreateGlobalProductRequestBodySkusSalesAttributes';
export * from './product/V202309/CreateGlobalProductRequestBodySkusSalesAttributesSkuImg';
export * from './product/V202309/CreateGlobalProductRequestBodyVideo';
export * from './product/V202309/CreateGlobalProductResponse';
export * from './product/V202309/CreateGlobalProductResponseData';
export * from './product/V202309/CreateGlobalProductResponseDataGlobalSkus';
export * from './product/V202309/CreateGlobalProductResponseDataGlobalSkusSalesAttributes';
export * from './product/V202309/CreateProductRequestBody';
export * from './product/V202309/CreateProductRequestBodyCertifications';
export * from './product/V202309/CreateProductRequestBodyCertificationsFiles';
export * from './product/V202309/CreateProductRequestBodyCertificationsImages';
export * from './product/V202309/CreateProductRequestBodyMainImages';
export * from './product/V202309/CreateProductRequestBodyPackageDimensions';
export * from './product/V202309/CreateProductRequestBodyPackageWeight';
export * from './product/V202309/CreateProductRequestBodyProductAttributes';
export * from './product/V202309/CreateProductRequestBodyProductAttributesValues';
export * from './product/V202309/CreateProductRequestBodySizeChart';
export * from './product/V202309/CreateProductRequestBodySizeChartImage';
export * from './product/V202309/CreateProductRequestBodySizeChartTemplate';
export * from './product/V202309/CreateProductRequestBodySkus';
export * from './product/V202309/CreateProductRequestBodySkusCombinedSkus';
export * from './product/V202309/CreateProductRequestBodySkusExternalListPrices';
export * from './product/V202309/CreateProductRequestBodySkusIdentifierCode';
export * from './product/V202309/CreateProductRequestBodySkusInventory';
export * from './product/V202309/CreateProductRequestBodySkusListPrice';
export * from './product/V202309/CreateProductRequestBodySkusPreSale';
export * from './product/V202309/CreateProductRequestBodySkusPreSaleFulfillmentType';
export * from './product/V202309/CreateProductRequestBodySkusPrice';
export * from './product/V202309/CreateProductRequestBodySkusSalesAttributes';
export * from './product/V202309/CreateProductRequestBodySkusSalesAttributesSkuImg';
export * from './product/V202309/CreateProductRequestBodySkusSalesAttributesSupplementarySkuImages';
export * from './product/V202309/CreateProductRequestBodyVideo';
export * from './product/V202309/CreateProductResponse';
export * from './product/V202309/CreateProductResponseData';
export * from './product/V202309/CreateProductResponseDataSkus';
export * from './product/V202309/CreateProductResponseDataSkusSalesAttributes';
export * from './product/V202309/CreateProductResponseDataWarnings';
export * from './product/V202309/DeactivateProductsRequestBody';
export * from './product/V202309/DeactivateProductsResponse';
export * from './product/V202309/DeactivateProductsResponseData';
export * from './product/V202309/DeactivateProductsResponseDataErrors';
export * from './product/V202309/DeactivateProductsResponseDataErrorsDetail';
export * from './product/V202309/DeleteGlobalProductsRequestBody';
export * from './product/V202309/DeleteGlobalProductsResponse';
export * from './product/V202309/DeleteGlobalProductsResponseData';
export * from './product/V202309/DeleteGlobalProductsResponseDataErrors';
export * from './product/V202309/DeleteGlobalProductsResponseDataErrorsDetail';
export * from './product/V202309/DeleteProductsRequestBody';
export * from './product/V202309/DeleteProductsResponse';
export * from './product/V202309/DeleteProductsResponseData';
export * from './product/V202309/DeleteProductsResponseDataErrors';
export * from './product/V202309/DeleteProductsResponseDataErrorsDetail';
export * from './product/V202309/EditGlobalProductRequestBody';
export * from './product/V202309/EditGlobalProductRequestBodyCertifications';
export * from './product/V202309/EditGlobalProductRequestBodyCertificationsFiles';
export * from './product/V202309/EditGlobalProductRequestBodyCertificationsImages';
export * from './product/V202309/EditGlobalProductRequestBodyMainImages';
export * from './product/V202309/EditGlobalProductRequestBodyManufacturer';
export * from './product/V202309/EditGlobalProductRequestBodyPackageDimensions';
export * from './product/V202309/EditGlobalProductRequestBodyPackageWeight';
export * from './product/V202309/EditGlobalProductRequestBodyProductAttributes';
export * from './product/V202309/EditGlobalProductRequestBodyProductAttributesValues';
export * from './product/V202309/EditGlobalProductRequestBodySizeChart';
export * from './product/V202309/EditGlobalProductRequestBodySizeChartImage';
export * from './product/V202309/EditGlobalProductRequestBodySizeChartTemplate';
export * from './product/V202309/EditGlobalProductRequestBodySkus';
export * from './product/V202309/EditGlobalProductRequestBodySkusIdentifierCode';
export * from './product/V202309/EditGlobalProductRequestBodySkusInventory';
export * from './product/V202309/EditGlobalProductRequestBodySkusPrice';
export * from './product/V202309/EditGlobalProductRequestBodySkusSalePrices';
export * from './product/V202309/EditGlobalProductRequestBodySkusSalesAttributes';
export * from './product/V202309/EditGlobalProductRequestBodySkusSalesAttributesSkuImg';
export * from './product/V202309/EditGlobalProductRequestBodyVideo';
export * from './product/V202309/EditGlobalProductResponse';
export * from './product/V202309/EditGlobalProductResponseData';
export * from './product/V202309/EditGlobalProductResponseDataGlobalSkus';
export * from './product/V202309/EditGlobalProductResponseDataGlobalSkusSalesAttributes';
export * from './product/V202309/EditGlobalProductResponseDataPublishResults';
export * from './product/V202309/EditGlobalProductResponseDataPublishResultsFailReasons';
export * from './product/V202309/EditProductRequestBody';
export * from './product/V202309/EditProductRequestBodyCertifications';
export * from './product/V202309/EditProductRequestBodyCertificationsFiles';
export * from './product/V202309/EditProductRequestBodyCertificationsImages';
export * from './product/V202309/EditProductRequestBodyMainImages';
export * from './product/V202309/EditProductRequestBodyPackageDimensions';
export * from './product/V202309/EditProductRequestBodyPackageWeight';
export * from './product/V202309/EditProductRequestBodyProductAttributes';
export * from './product/V202309/EditProductRequestBodyProductAttributesValues';
export * from './product/V202309/EditProductRequestBodyReplicatedProducts';
export * from './product/V202309/EditProductRequestBodyReplicatedProductsSkus';
export * from './product/V202309/EditProductRequestBodyReplicatedProductsSkusInventory';
export * from './product/V202309/EditProductRequestBodyReplicatedProductsSkusPrice';
export * from './product/V202309/EditProductRequestBodySizeChart';
export * from './product/V202309/EditProductRequestBodySizeChartImage';
export * from './product/V202309/EditProductRequestBodySizeChartTemplate';
export * from './product/V202309/EditProductRequestBodySkus';
export * from './product/V202309/EditProductRequestBodySkusCombinedSkus';
export * from './product/V202309/EditProductRequestBodySkusExternalListPrices';
export * from './product/V202309/EditProductRequestBodySkusIdentifierCode';
export * from './product/V202309/EditProductRequestBodySkusInventory';
export * from './product/V202309/EditProductRequestBodySkusListPrice';
export * from './product/V202309/EditProductRequestBodySkusPreSale';
export * from './product/V202309/EditProductRequestBodySkusPreSaleFulfillmentType';
export * from './product/V202309/EditProductRequestBodySkusPrice';
export * from './product/V202309/EditProductRequestBodySkusSalesAttributes';
export * from './product/V202309/EditProductRequestBodySkusSalesAttributesSkuImg';
export * from './product/V202309/EditProductRequestBodySkusSalesAttributesSupplementarySkuImages';
export * from './product/V202309/EditProductRequestBodySubscribeInfoEdit';
export * from './product/V202309/EditProductRequestBodySubscribeInfoEditDiscountDetails';
export * from './product/V202309/EditProductRequestBodyVideo';
export * from './product/V202309/EditProductResponse';
export * from './product/V202309/EditProductResponseData';
export * from './product/V202309/EditProductResponseDataAudit';
export * from './product/V202309/EditProductResponseDataSkus';
export * from './product/V202309/EditProductResponseDataSkusSalesAttributes';
export * from './product/V202309/EditProductResponseDataWarnings';
export * from './product/V202309/GetAttributesResponse';
export * from './product/V202309/GetAttributesResponseData';
export * from './product/V202309/GetAttributesResponseDataAttributes';
export * from './product/V202309/GetAttributesResponseDataAttributesRequirementConditions';
export * from './product/V202309/GetAttributesResponseDataAttributesValues';
export * from './product/V202309/GetBrandsResponse';
export * from './product/V202309/GetBrandsResponseData';
export * from './product/V202309/GetBrandsResponseDataBrands';
export * from './product/V202309/GetCategoriesResponse';
export * from './product/V202309/GetCategoriesResponseData';
export * from './product/V202309/GetCategoriesResponseDataCategories';
export * from './product/V202309/GetCategoryRulesResponse';
export * from './product/V202309/GetCategoryRulesResponseData';
export * from './product/V202309/GetCategoryRulesResponseDataCod';
export * from './product/V202309/GetCategoryRulesResponseDataEpr';
export * from './product/V202309/GetCategoryRulesResponseDataManufacturer';
export * from './product/V202309/GetCategoryRulesResponseDataPackageDimension';
export * from './product/V202309/GetCategoryRulesResponseDataProductCertifications';
export * from './product/V202309/GetCategoryRulesResponseDataProductCertificationsExpirationDate';
export * from './product/V202309/GetCategoryRulesResponseDataProductCertificationsRequirementConditions';
export * from './product/V202309/GetCategoryRulesResponseDataResponsiblePerson';
export * from './product/V202309/GetCategoryRulesResponseDataSizeChart';
export * from './product/V202309/GetGlobalAttributesResponse';
export * from './product/V202309/GetGlobalAttributesResponseData';
export * from './product/V202309/GetGlobalAttributesResponseDataAttributes';
export * from './product/V202309/GetGlobalAttributesResponseDataAttributesRequirementConditions';
export * from './product/V202309/GetGlobalAttributesResponseDataAttributesValues';
export * from './product/V202309/GetGlobalCategoriesResponse';
export * from './product/V202309/GetGlobalCategoriesResponseData';
export * from './product/V202309/GetGlobalCategoriesResponseDataCategories';
export * from './product/V202309/GetGlobalCategoryRulesResponse';
export * from './product/V202309/GetGlobalCategoryRulesResponseData';
export * from './product/V202309/GetGlobalCategoryRulesResponseDataManufacturer';
export * from './product/V202309/GetGlobalCategoryRulesResponseDataProductCertifications';
export * from './product/V202309/GetGlobalCategoryRulesResponseDataProductCertificationsRequirementConditions';
export * from './product/V202309/GetGlobalCategoryRulesResponseDataResponsiblePerson';
export * from './product/V202309/GetGlobalCategoryRulesResponseDataSizeChart';
export * from './product/V202309/GetGlobalProductResponse';
export * from './product/V202309/GetGlobalProductResponseData';
export * from './product/V202309/GetGlobalProductResponseDataBrand';
export * from './product/V202309/GetGlobalProductResponseDataCategory';
export * from './product/V202309/GetGlobalProductResponseDataCertifications';
export * from './product/V202309/GetGlobalProductResponseDataCertificationsFiles';
export * from './product/V202309/GetGlobalProductResponseDataCertificationsImages';
export * from './product/V202309/GetGlobalProductResponseDataMainImages';
export * from './product/V202309/GetGlobalProductResponseDataManufacturer';
export * from './product/V202309/GetGlobalProductResponseDataPackageDimensions';
export * from './product/V202309/GetGlobalProductResponseDataPackageWeight';
export * from './product/V202309/GetGlobalProductResponseDataProductAttributes';
export * from './product/V202309/GetGlobalProductResponseDataProductAttributesValues';
export * from './product/V202309/GetGlobalProductResponseDataProducts';
export * from './product/V202309/GetGlobalProductResponseDataProductsSkuMappings';
export * from './product/V202309/GetGlobalProductResponseDataProductsSkuMappingsSalesAttributeMappings';
export * from './product/V202309/GetGlobalProductResponseDataSizeChart';
export * from './product/V202309/GetGlobalProductResponseDataSizeChartImage';
export * from './product/V202309/GetGlobalProductResponseDataSizeChartTemplate';
export * from './product/V202309/GetGlobalProductResponseDataSkus';
export * from './product/V202309/GetGlobalProductResponseDataSkusIdentifierCode';
export * from './product/V202309/GetGlobalProductResponseDataSkusInventory';
export * from './product/V202309/GetGlobalProductResponseDataSkusPrice';
export * from './product/V202309/GetGlobalProductResponseDataSkusSalesAttributes';
export * from './product/V202309/GetGlobalProductResponseDataSkusSalesAttributesSkuImg';
export * from './product/V202309/GetGlobalProductResponseDataVideo';
export * from './product/V202309/GetProductResponse';
export * from './product/V202309/GetProductResponseData';
export * from './product/V202309/GetProductResponseDataAudit';
export * from './product/V202309/GetProductResponseDataAuditFailedReasons';
export * from './product/V202309/GetProductResponseDataBrand';
export * from './product/V202309/GetProductResponseDataCategoryChains';
export * from './product/V202309/GetProductResponseDataCertifications';
export * from './product/V202309/GetProductResponseDataCertificationsFiles';
export * from './product/V202309/GetProductResponseDataCertificationsImages';
export * from './product/V202309/GetProductResponseDataDeliveryOptions';
export * from './product/V202309/GetProductResponseDataGlobalProductAssociation';
export * from './product/V202309/GetProductResponseDataGlobalProductAssociationSkuMappings';
export * from './product/V202309/GetProductResponseDataGlobalProductAssociationSkuMappingsSalesAttributeMappings';
export * from './product/V202309/GetProductResponseDataIntegratedPlatformStatuses';
export * from './product/V202309/GetProductResponseDataMainImages';
export * from './product/V202309/GetProductResponseDataPackageDimensions';
export * from './product/V202309/GetProductResponseDataPackageWeight';
export * from './product/V202309/GetProductResponseDataPrescriptionRequirement';
export * from './product/V202309/GetProductResponseDataProductAttributes';
export * from './product/V202309/GetProductResponseDataProductAttributesValues';
export * from './product/V202309/GetProductResponseDataProductFamilies';
export * from './product/V202309/GetProductResponseDataProductFamiliesProducts';
export * from './product/V202309/GetProductResponseDataRecommendedCategories';
export * from './product/V202309/GetProductResponseDataSizeChart';
export * from './product/V202309/GetProductResponseDataSizeChartImage';
export * from './product/V202309/GetProductResponseDataSizeChartTemplate';
export * from './product/V202309/GetProductResponseDataSkus';
export * from './product/V202309/GetProductResponseDataSkusCombinedSkus';
export * from './product/V202309/GetProductResponseDataSkusCombinedSkusBrand';
export * from './product/V202309/GetProductResponseDataSkusCombinedSkusCategories';
export * from './product/V202309/GetProductResponseDataSkusCombinedSkusInventory';
export * from './product/V202309/GetProductResponseDataSkusCombinedSkusPrice';
export * from './product/V202309/GetProductResponseDataSkusCombinedSkusProductMainImage';
export * from './product/V202309/GetProductResponseDataSkusCombinedSkusSalesAttributes';
export * from './product/V202309/GetProductResponseDataSkusCombinedSkusSalesAttributesSkuImg';
export * from './product/V202309/GetProductResponseDataSkusCombinedSkusSalesAttributesSupplementarySkuImages';
export * from './product/V202309/GetProductResponseDataSkusExternalListPrices';
export * from './product/V202309/GetProductResponseDataSkusGlobalListingPolicy';
export * from './product/V202309/GetProductResponseDataSkusGlobalListingPolicyReplicateSource';
export * from './product/V202309/GetProductResponseDataSkusIdentifierCode';
export * from './product/V202309/GetProductResponseDataSkusInventory';
export * from './product/V202309/GetProductResponseDataSkusListPrice';
export * from './product/V202309/GetProductResponseDataSkusPreSale';
export * from './product/V202309/GetProductResponseDataSkusPreSaleFulfillmentType';
export * from './product/V202309/GetProductResponseDataSkusPrice';
export * from './product/V202309/GetProductResponseDataSkusSalesAttributes';
export * from './product/V202309/GetProductResponseDataSkusSalesAttributesSkuImg';
export * from './product/V202309/GetProductResponseDataSkusSalesAttributesSupplementarySkuImages';
export * from './product/V202309/GetProductResponseDataSkusStatusInfo';
export * from './product/V202309/GetProductResponseDataSubscribeInfo';
export * from './product/V202309/GetProductResponseDataSubscribeInfoSubscribeDiscountDetails';
export * from './product/V202309/GetProductResponseDataSubscribeInfoSubscribePromotionConfig';
export * from './product/V202309/GetProductResponseDataVideo';
export * from './product/V202309/InventorySearchRequestBody';
export * from './product/V202309/InventorySearchResponse';
export * from './product/V202309/InventorySearchResponseData';
export * from './product/V202309/InventorySearchResponseDataInventory';
export * from './product/V202309/InventorySearchResponseDataInventorySkus';
export * from './product/V202309/InventorySearchResponseDataInventorySkusTotalAvailableInventoryDistribution';
export * from './product/V202309/InventorySearchResponseDataInventorySkusTotalAvailableInventoryDistributionCampaignInventory';
export * from './product/V202309/InventorySearchResponseDataInventorySkusTotalAvailableInventoryDistributionCreatorInventory';
export * from './product/V202309/InventorySearchResponseDataInventorySkusTotalAvailableInventoryDistributionInShopInventory';
export * from './product/V202309/InventorySearchResponseDataInventorySkusWarehouseInventory';
export * from './product/V202309/PartialEditProductRequestBody';
export * from './product/V202309/PartialEditProductRequestBodyCertifications';
export * from './product/V202309/PartialEditProductRequestBodyCertificationsFiles';
export * from './product/V202309/PartialEditProductRequestBodyCertificationsImages';
export * from './product/V202309/PartialEditProductRequestBodyMainImages';
export * from './product/V202309/PartialEditProductRequestBodyPackageDimensions';
export * from './product/V202309/PartialEditProductRequestBodyPackageWeight';
export * from './product/V202309/PartialEditProductRequestBodyProductAttributes';
export * from './product/V202309/PartialEditProductRequestBodyProductAttributesValues';
export * from './product/V202309/PartialEditProductRequestBodyReplicatedProducts';
export * from './product/V202309/PartialEditProductRequestBodyReplicatedProductsSkus';
export * from './product/V202309/PartialEditProductRequestBodyReplicatedProductsSkusInventory';
export * from './product/V202309/PartialEditProductRequestBodyReplicatedProductsSkusPrice';
export * from './product/V202309/PartialEditProductRequestBodySizeChart';
export * from './product/V202309/PartialEditProductRequestBodySizeChartImage';
export * from './product/V202309/PartialEditProductRequestBodySizeChartTemplate';
export * from './product/V202309/PartialEditProductRequestBodySkus';
export * from './product/V202309/PartialEditProductRequestBodySkusExternalListPrices';
export * from './product/V202309/PartialEditProductRequestBodySkusIdentifierCode';
export * from './product/V202309/PartialEditProductRequestBodySkusInventory';
export * from './product/V202309/PartialEditProductRequestBodySkusListPrice';
export * from './product/V202309/PartialEditProductRequestBodySkusPreSale';
export * from './product/V202309/PartialEditProductRequestBodySkusPreSaleFulfillmentType';
export * from './product/V202309/PartialEditProductRequestBodySkusPrice';
export * from './product/V202309/PartialEditProductRequestBodySkusSalesAttributes';
export * from './product/V202309/PartialEditProductRequestBodySkusSalesAttributesSkuImg';
export * from './product/V202309/PartialEditProductRequestBodySkusSalesAttributesSupplementarySkuImages';
export * from './product/V202309/PartialEditProductRequestBodySubscribeInfoEdit';
export * from './product/V202309/PartialEditProductRequestBodySubscribeInfoEditDiscountDetails';
export * from './product/V202309/PartialEditProductRequestBodyVideo';
export * from './product/V202309/PartialEditProductResponse';
export * from './product/V202309/PartialEditProductResponseData';
export * from './product/V202309/PartialEditProductResponseDataAudit';
export * from './product/V202309/PartialEditProductResponseDataSkus';
export * from './product/V202309/PartialEditProductResponseDataSkusSalesAttributes';
export * from './product/V202309/PublishGlobalProductRequestBody';
export * from './product/V202309/PublishGlobalProductRequestBodyPublishTarget';
export * from './product/V202309/PublishGlobalProductRequestBodyPublishTargetSkus';
export * from './product/V202309/PublishGlobalProductRequestBodyPublishTargetSkusInventory';
export * from './product/V202309/PublishGlobalProductRequestBodyPublishTargetSkusPrice';
export * from './product/V202309/PublishGlobalProductResponse';
export * from './product/V202309/PublishGlobalProductResponseData';
export * from './product/V202309/PublishGlobalProductResponseDataProducts';
export * from './product/V202309/PublishGlobalProductResponseDataProductsSkus';
export * from './product/V202309/PublishGlobalProductResponseDataProductsSkusSaleAttributes';
export * from './product/V202309/PublishGlobalProductResponseDataPublishResult';
export * from './product/V202309/PublishGlobalProductResponseDataPublishResultFailReasons';
export * from './product/V202309/RecommendCategoryRequestBody';
export * from './product/V202309/RecommendCategoryRequestBodyImages';
export * from './product/V202309/RecommendCategoryResponse';
export * from './product/V202309/RecommendCategoryResponseData';
export * from './product/V202309/RecommendCategoryResponseDataCategories';
export * from './product/V202309/RecommendGlobalCategoriesRequestBody';
export * from './product/V202309/RecommendGlobalCategoriesRequestBodyImages';
export * from './product/V202309/RecommendGlobalCategoriesResponse';
export * from './product/V202309/RecommendGlobalCategoriesResponseData';
export * from './product/V202309/RecommendGlobalCategoriesResponseDataCategories';
export * from './product/V202309/RecoverProductsRequestBody';
export * from './product/V202309/RecoverProductsResponse';
export * from './product/V202309/RecoverProductsResponseData';
export * from './product/V202309/RecoverProductsResponseDataErrors';
export * from './product/V202309/RecoverProductsResponseDataErrorsDetail';
export * from './product/V202309/SearchGlobalProductsRequestBody';
export * from './product/V202309/SearchGlobalProductsResponse';
export * from './product/V202309/SearchGlobalProductsResponseData';
export * from './product/V202309/SearchGlobalProductsResponseDataGlobalProducts';
export * from './product/V202309/SearchGlobalProductsResponseDataGlobalProductsSkus';
export * from './product/V202309/SearchProductsRequestBody';
export * from './product/V202309/SearchProductsResponse';
export * from './product/V202309/SearchProductsResponseData';
export * from './product/V202309/SearchProductsResponseDataProducts';
export * from './product/V202309/SearchProductsResponseDataProductsRecommendedCategories';
export * from './product/V202309/SearchProductsResponseDataProductsSkus';
export * from './product/V202309/SearchProductsResponseDataProductsSkusInventory';
export * from './product/V202309/SearchProductsResponseDataProductsSkusPrice';
export * from './product/V202309/UpdateGlobalInventoryRequestBody';
export * from './product/V202309/UpdateGlobalInventoryRequestBodyGlobalSkus';
export * from './product/V202309/UpdateGlobalInventoryRequestBodyGlobalSkusInventory';
export * from './product/V202309/UpdateGlobalInventoryResponse';
export * from './product/V202309/UpdateInventoryRequestBody';
export * from './product/V202309/UpdateInventoryRequestBodySkus';
export * from './product/V202309/UpdateInventoryRequestBodySkusInventory';
export * from './product/V202309/UpdateInventoryResponse';
export * from './product/V202309/UpdateInventoryResponseData';
export * from './product/V202309/UpdateInventoryResponseDataErrors';
export * from './product/V202309/UpdateInventoryResponseDataErrorsDetail';
export * from './product/V202309/UpdateInventoryResponseDataErrorsDetailExtraErrors';
export * from './product/V202309/UpdatePriceRequestBody';
export * from './product/V202309/UpdatePriceRequestBodySkus';
export * from './product/V202309/UpdatePriceRequestBodySkusExternalListPrices';
export * from './product/V202309/UpdatePriceRequestBodySkusListPrice';
export * from './product/V202309/UpdatePriceRequestBodySkusPrice';
export * from './product/V202309/UpdatePriceResponse';
export * from './product/V202309/UploadProductFileResponse';
export * from './product/V202309/UploadProductFileResponseData';
export * from './product/V202309/UploadProductImageResponse';
export * from './product/V202309/UploadProductImageResponseData';
export * from './product/V202502/SearchProductsRequestBody';
export * from './product/V202502/SearchProductsResponse';
export * from './product/V202502/SearchProductsResponseData';
export * from './product/V202502/SearchProductsResponseDataProducts';
export * from './product/V202502/SearchProductsResponseDataProductsAudit';
export * from './product/V202502/SearchProductsResponseDataProductsIntegratedPlatformStatuses';
export * from './product/V202502/SearchProductsResponseDataProductsProductFamilies';
export * from './product/V202502/SearchProductsResponseDataProductsProductFamiliesProducts';
export * from './product/V202502/SearchProductsResponseDataProductsRecommendedCategories';
export * from './product/V202502/SearchProductsResponseDataProductsSkus';
export * from './product/V202502/SearchProductsResponseDataProductsSkusExternalListPrices';
export * from './product/V202502/SearchProductsResponseDataProductsSkusInventory';
export * from './product/V202502/SearchProductsResponseDataProductsSkusListPrice';
export * from './product/V202502/SearchProductsResponseDataProductsSkusPreSale';
export * from './product/V202502/SearchProductsResponseDataProductsSkusPreSaleFulfillmentType';
export * from './product/V202502/SearchProductsResponseDataProductsSkusPrice';
export * from './product/V202502/SearchProductsResponseDataProductsSkusStatusInfo';
export * from './product/V202509/EditProductRequestBody';
export * from './product/V202509/EditProductRequestBodyCertifications';
export * from './product/V202509/EditProductRequestBodyCertificationsFiles';
export * from './product/V202509/EditProductRequestBodyCertificationsImages';
export * from './product/V202509/EditProductRequestBodyMainImages';
export * from './product/V202509/EditProductRequestBodyPackageDimensions';
export * from './product/V202509/EditProductRequestBodyPackageWeight';
export * from './product/V202509/EditProductRequestBodyProductAttributes';
export * from './product/V202509/EditProductRequestBodyProductAttributesValues';
export * from './product/V202509/EditProductRequestBodyReplicatedProducts';
export * from './product/V202509/EditProductRequestBodyReplicatedProductsSkus';
export * from './product/V202509/EditProductRequestBodyReplicatedProductsSkusInventory';
export * from './product/V202509/EditProductRequestBodyReplicatedProductsSkusPrice';
export * from './product/V202509/EditProductRequestBodySizeChart';
export * from './product/V202509/EditProductRequestBodySizeChartImage';
export * from './product/V202509/EditProductRequestBodySizeChartTemplate';
export * from './product/V202509/EditProductRequestBodySkus';
export * from './product/V202509/EditProductRequestBodySkusCombinedSkus';
export * from './product/V202509/EditProductRequestBodySkusExternalListPrices';
export * from './product/V202509/EditProductRequestBodySkusIdentifierCode';
export * from './product/V202509/EditProductRequestBodySkusInventory';
export * from './product/V202509/EditProductRequestBodySkusListPrice';
export * from './product/V202509/EditProductRequestBodySkusPreSale';
export * from './product/V202509/EditProductRequestBodySkusPreSaleFulfillmentType';
export * from './product/V202509/EditProductRequestBodySkusPrice';
export * from './product/V202509/EditProductRequestBodySkusSalesAttributes';
export * from './product/V202509/EditProductRequestBodySkusSalesAttributesSkuImg';
export * from './product/V202509/EditProductRequestBodySkusSalesAttributesSupplementarySkuImages';
export * from './product/V202509/EditProductRequestBodySubscribeInfoEdit';
export * from './product/V202509/EditProductRequestBodySubscribeInfoEditDiscountDetails';
export * from './product/V202509/EditProductRequestBodyVideo';
export * from './product/V202509/EditProductResponse';
export * from './product/V202509/EditProductResponseData';
export * from './product/V202509/EditProductResponseDataAudit';
export * from './product/V202509/EditProductResponseDataSkus';
export * from './product/V202509/EditProductResponseDataSkusSalesAttributes';
export * from './product/V202509/EditProductResponseDataWarnings';
export * from './product/V202509/PartialEditProductRequestBody';
export * from './product/V202509/PartialEditProductRequestBodyCertifications';
export * from './product/V202509/PartialEditProductRequestBodyCertificationsFiles';
export * from './product/V202509/PartialEditProductRequestBodyCertificationsImages';
export * from './product/V202509/PartialEditProductRequestBodyMainImages';
export * from './product/V202509/PartialEditProductRequestBodyPackageDimensions';
export * from './product/V202509/PartialEditProductRequestBodyPackageWeight';
export * from './product/V202509/PartialEditProductRequestBodyProductAttributes';
export * from './product/V202509/PartialEditProductRequestBodyProductAttributesValues';
export * from './product/V202509/PartialEditProductRequestBodyReplicatedProducts';
export * from './product/V202509/PartialEditProductRequestBodyReplicatedProductsSkus';
export * from './product/V202509/PartialEditProductRequestBodyReplicatedProductsSkusInventory';
export * from './product/V202509/PartialEditProductRequestBodyReplicatedProductsSkusPrice';
export * from './product/V202509/PartialEditProductRequestBodySizeChart';
export * from './product/V202509/PartialEditProductRequestBodySizeChartImage';
export * from './product/V202509/PartialEditProductRequestBodySizeChartTemplate';
export * from './product/V202509/PartialEditProductRequestBodySkus';
export * from './product/V202509/PartialEditProductRequestBodySkusExternalListPrices';
export * from './product/V202509/PartialEditProductRequestBodySkusIdentifierCode';
export * from './product/V202509/PartialEditProductRequestBodySkusInventory';
export * from './product/V202509/PartialEditProductRequestBodySkusListPrice';
export * from './product/V202509/PartialEditProductRequestBodySkusPreSale';
export * from './product/V202509/PartialEditProductRequestBodySkusPreSaleFulfillmentType';
export * from './product/V202509/PartialEditProductRequestBodySkusPrice';
export * from './product/V202509/PartialEditProductRequestBodySkusSalesAttributes';
export * from './product/V202509/PartialEditProductRequestBodySkusSalesAttributesSkuImg';
export * from './product/V202509/PartialEditProductRequestBodySkusSalesAttributesSupplementarySkuImages';
export * from './product/V202509/PartialEditProductRequestBodySubscribeInfoEdit';
export * from './product/V202509/PartialEditProductRequestBodySubscribeInfoEditDiscountDetails';
export * from './product/V202509/PartialEditProductRequestBodyVideo';
export * from './product/V202509/PartialEditProductResponse';
export * from './product/V202509/PartialEditProductResponseData';
export * from './product/V202509/PartialEditProductResponseDataAudit';
export * from './product/V202509/PartialEditProductResponseDataSkus';
export * from './product/V202509/PartialEditProductResponseDataSkusSalesAttributes';

export class ObjectSerializer {
    public static findCorrectType(data: any, expectedType: string) {
        if (data == undefined) {
            return expectedType;
        } else if (primitives.indexOf(expectedType.toLowerCase()) !== -1) {
            return expectedType;
        } else if (expectedType === "Date") {
            return expectedType;
        } else {
            if (enumsMap[expectedType]) {
                return expectedType;
            }

            if (!typeMap[expectedType]) {
                return expectedType; // w/e we don't know the type
            }

            // Check the discriminator
            let discriminatorProperty = typeMap[expectedType].discriminator;
            if (discriminatorProperty == null) {
                return expectedType; // the type does not have a discriminator. use it.
            } else {
                if (data[discriminatorProperty]) {
                    var discriminatorType = data[discriminatorProperty];
                    if(typeMap[discriminatorType]){
                        return discriminatorType; // use the type given in the discriminator
                    } else {
                        return expectedType; // discriminator did not map to a type
                    }
                } else {
                    return expectedType; // discriminator was not present (or an empty string)
                }
            }
        }
    }

    public static serialize(data: any, type: string) {
        if (data == undefined) {
            return data;
        } else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        } else if (type.lastIndexOf("Array<", 0) === 0) { // string.startsWith pre es6
            let subType: string = type.replace("Array<", ""); // Array<Type> => Type>
            subType = subType.substring(0, subType.length - 1); // Type> => Type
            let transformedData: any[] = [];
            for (let index = 0; index < data.length; index++) {
                let datum = data[index];
                transformedData.push(ObjectSerializer.serialize(datum, subType));
            }
            return transformedData;
        } else if (type === "Date") {
            return data.toISOString();
        } else {
            if (enumsMap[type]) {
                return data;
            }
            if (!typeMap[type]) { // in case we dont know the type
                return data;
            }

            // Get the actual type of this object
            type = this.findCorrectType(data, type);

            // get the map for the correct type.
            let attributeTypes = typeMap[type].getAttributeTypeMap();
            let instance: {[index: string]: any} = {};
            for (let index = 0; index < attributeTypes.length; index++) {
                let attributeType = attributeTypes[index];
                instance[attributeType.baseName] = ObjectSerializer.serialize(data[attributeType.name], attributeType.type);
            }
            return instance;
        }
    }

    public static deserialize(data: any, type: string) {
        // polymorphism may change the actual type.
        type = ObjectSerializer.findCorrectType(data, type);
        if (data == undefined) {
            return data;
        } else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        } else if (type.lastIndexOf("Array<", 0) === 0) { // string.startsWith pre es6
            let subType: string = type.replace("Array<", ""); // Array<Type> => Type>
            subType = subType.substring(0, subType.length - 1); // Type> => Type
            let transformedData: any[] = [];
            for (let index = 0; index < data.length; index++) {
                let datum = data[index];
                transformedData.push(ObjectSerializer.deserialize(datum, subType));
            }
            return transformedData;
        } else if (type === "Date") {
            return new Date(data);
        } else {
            if (enumsMap[type]) {// is Enum
                return data;
            }

            if (!typeMap[type]) { // dont know the type
                return data;
            }
            let instance = new typeMap[type]();
            let attributeTypes = typeMap[type].getAttributeTypeMap();
            for (let index = 0; index < attributeTypes.length; index++) {
                let attributeType = attributeTypes[index];
                instance[attributeType.name] = ObjectSerializer.deserialize(data[attributeType.baseName], attributeType.type);
            }
            return instance;
        }
    }
}

export interface Authentication {
    /**
    * Apply authentication settings to header and query params.
    */
    applyToRequest(requestOptions: localVarRequest.Options): Promise<void> | void;
}

export class HttpBasicAuth implements Authentication {
    public username: string = '';
    public password: string = '';

    applyToRequest(requestOptions: localVarRequest.Options): void {
        requestOptions.auth = {
            username: this.username, password: this.password
        }
    }
}

export class HttpBearerAuth implements Authentication {
    public accessToken: string | (() => string) = '';

    applyToRequest(requestOptions: localVarRequest.Options): void {
        if (requestOptions && requestOptions.headers) {
            const accessToken = typeof this.accessToken === 'function'
                            ? this.accessToken()
                            : this.accessToken;
            requestOptions.headers["Authorization"] = "Bearer " + accessToken;
        }
    }
}

export class ApiKeyAuth implements Authentication {
    public apiKey: string = '';

    constructor(private location: string, private paramName: string) {
    }

    applyToRequest(requestOptions: localVarRequest.Options): void {
        if (this.location == "query") {
            (<any>requestOptions.qs)[this.paramName] = this.apiKey;
        } else if (this.location == "header" && requestOptions && requestOptions.headers) {
            requestOptions.headers[this.paramName] = this.apiKey;
        } else if (this.location == 'cookie' && requestOptions && requestOptions.headers) {
            if (requestOptions.headers['Cookie']) {
                requestOptions.headers['Cookie'] += '; ' + this.paramName + '=' + encodeURIComponent(this.apiKey);
            }
            else {
                requestOptions.headers['Cookie'] = this.paramName + '=' + encodeURIComponent(this.apiKey);
            }
        }
    }
}

export class OAuth implements Authentication {
    public accessToken: string = '';

    applyToRequest(requestOptions: localVarRequest.Options): void {
        if (requestOptions && requestOptions.headers) {
            requestOptions.headers["Authorization"] = "Bearer " + this.accessToken;
        }
    }
}

export class VoidAuth implements Authentication {
    public username: string = '';
    public password: string = '';

    applyToRequest(_: localVarRequest.Options): void {
        // Do nothing
    }
}

export type Interceptor = (requestOptions: localVarRequest.Options) => (Promise<void> | void);
