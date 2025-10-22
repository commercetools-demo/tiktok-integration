"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_OPERATION_NAME_MAP = exports.API_OBJECT = exports.API_ENUM = exports.APIS = exports.HttpError = void 0;
__exportStar(require("./affiliateCreatorV202405Api"), exports);
const affiliateCreatorV202405Api_1 = require("./affiliateCreatorV202405Api");
__exportStar(require("./affiliateCreatorV202409Api"), exports);
const affiliateCreatorV202409Api_1 = require("./affiliateCreatorV202409Api");
__exportStar(require("./affiliateCreatorV202410Api"), exports);
const affiliateCreatorV202410Api_1 = require("./affiliateCreatorV202410Api");
__exportStar(require("./affiliateCreatorV202412Api"), exports);
const affiliateCreatorV202412Api_1 = require("./affiliateCreatorV202412Api");
__exportStar(require("./affiliateCreatorV202501Api"), exports);
const affiliateCreatorV202501Api_1 = require("./affiliateCreatorV202501Api");
__exportStar(require("./affiliateCreatorV202508Api"), exports);
const affiliateCreatorV202508Api_1 = require("./affiliateCreatorV202508Api");
__exportStar(require("./affiliateCreatorV202509Api"), exports);
const affiliateCreatorV202509Api_1 = require("./affiliateCreatorV202509Api");
__exportStar(require("./affiliateV202309Api"), exports);
const affiliateV202309Api_1 = require("./affiliateV202309Api");
__exportStar(require("./affiliateV202402Api"), exports);
const affiliateV202402Api_1 = require("./affiliateV202402Api");
__exportStar(require("./affiliateV202403Api"), exports);
const affiliateV202403Api_1 = require("./affiliateV202403Api");
__exportStar(require("./analyticsV202405Api"), exports);
const analyticsV202405Api_1 = require("./analyticsV202405Api");
__exportStar(require("./analyticsV202406Api"), exports);
const analyticsV202406Api_1 = require("./analyticsV202406Api");
__exportStar(require("./analyticsV202409Api"), exports);
const analyticsV202409Api_1 = require("./analyticsV202409Api");
__exportStar(require("./analyticsV202508Api"), exports);
const analyticsV202508Api_1 = require("./analyticsV202508Api");
__exportStar(require("./authorizationV202309Api"), exports);
const authorizationV202309Api_1 = require("./authorizationV202309Api");
__exportStar(require("./authorizationV202312Api"), exports);
const authorizationV202312Api_1 = require("./authorizationV202312Api");
__exportStar(require("./authorizationV202401Api"), exports);
const authorizationV202401Api_1 = require("./authorizationV202401Api");
__exportStar(require("./authorizationV202403Api"), exports);
const authorizationV202403Api_1 = require("./authorizationV202403Api");
__exportStar(require("./dataReconciliationV202309Api"), exports);
const dataReconciliationV202309Api_1 = require("./dataReconciliationV202309Api");
__exportStar(require("./dataReconciliationV202310Api"), exports);
const dataReconciliationV202310Api_1 = require("./dataReconciliationV202310Api");
__exportStar(require("./dataReconciliationV202401Api"), exports);
const dataReconciliationV202401Api_1 = require("./dataReconciliationV202401Api");
__exportStar(require("./eventV202309Api"), exports);
const eventV202309Api_1 = require("./eventV202309Api");
__exportStar(require("./fbtV202408Api"), exports);
const fbtV202408Api_1 = require("./fbtV202408Api");
__exportStar(require("./fbtV202409Api"), exports);
const fbtV202409Api_1 = require("./fbtV202409Api");
__exportStar(require("./fbtV202410Api"), exports);
const fbtV202410Api_1 = require("./fbtV202410Api");
__exportStar(require("./financeV202309Api"), exports);
const financeV202309Api_1 = require("./financeV202309Api");
__exportStar(require("./financeV202501Api"), exports);
const financeV202501Api_1 = require("./financeV202501Api");
__exportStar(require("./financeV202507Api"), exports);
const financeV202507Api_1 = require("./financeV202507Api");
__exportStar(require("./fulfillmentV202309Api"), exports);
const fulfillmentV202309Api_1 = require("./fulfillmentV202309Api");
__exportStar(require("./fulfillmentV202407Api"), exports);
const fulfillmentV202407Api_1 = require("./fulfillmentV202407Api");
__exportStar(require("./fulfillmentV202502Api"), exports);
const fulfillmentV202502Api_1 = require("./fulfillmentV202502Api");
__exportStar(require("./fulfillmentV202508Api"), exports);
const fulfillmentV202508Api_1 = require("./fulfillmentV202508Api");
__exportStar(require("./logisticsV202309Api"), exports);
const logisticsV202309Api_1 = require("./logisticsV202309Api");
__exportStar(require("./orderV202309Api"), exports);
const orderV202309Api_1 = require("./orderV202309Api");
__exportStar(require("./orderV202406Api"), exports);
const orderV202406Api_1 = require("./orderV202406Api");
__exportStar(require("./orderV202407Api"), exports);
const orderV202407Api_1 = require("./orderV202407Api");
__exportStar(require("./orderV202507Api"), exports);
const orderV202507Api_1 = require("./orderV202507Api");
__exportStar(require("./productV202309Api"), exports);
const productV202309Api_1 = require("./productV202309Api");
__exportStar(require("./productV202312Api"), exports);
const productV202312Api_1 = require("./productV202312Api");
__exportStar(require("./productV202401Api"), exports);
const productV202401Api_1 = require("./productV202401Api");
__exportStar(require("./productV202404Api"), exports);
const productV202404Api_1 = require("./productV202404Api");
__exportStar(require("./productV202405Api"), exports);
const productV202405Api_1 = require("./productV202405Api");
__exportStar(require("./productV202407Api"), exports);
const productV202407Api_1 = require("./productV202407Api");
__exportStar(require("./productV202409Api"), exports);
const productV202409Api_1 = require("./productV202409Api");
__exportStar(require("./productV202411Api"), exports);
const productV202411Api_1 = require("./productV202411Api");
__exportStar(require("./productV202501Api"), exports);
const productV202501Api_1 = require("./productV202501Api");
__exportStar(require("./productV202502Api"), exports);
const productV202502Api_1 = require("./productV202502Api");
__exportStar(require("./productV202505Api"), exports);
const productV202505Api_1 = require("./productV202505Api");
__exportStar(require("./productV202506Api"), exports);
const productV202506Api_1 = require("./productV202506Api");
__exportStar(require("./productV202507Api"), exports);
const productV202507Api_1 = require("./productV202507Api");
__exportStar(require("./productV202509Api"), exports);
const productV202509Api_1 = require("./productV202509Api");
__exportStar(require("./promotionV202309Api"), exports);
const promotionV202309Api_1 = require("./promotionV202309Api");
__exportStar(require("./promotionV202406Api"), exports);
const promotionV202406Api_1 = require("./promotionV202406Api");
__exportStar(require("./returnRefundV202309Api"), exports);
const returnRefundV202309Api_1 = require("./returnRefundV202309Api");
__exportStar(require("./sellerV202309Api"), exports);
const sellerV202309Api_1 = require("./sellerV202309Api");
__exportStar(require("./supplyChainV202309Api"), exports);
const supplyChainV202309Api_1 = require("./supplyChainV202309Api");
class HttpError extends Error {
    constructor(response, body, statusCode) {
        super('HTTP request failed');
        this.response = response;
        this.body = body;
        this.statusCode = statusCode;
        this.name = 'HttpError';
    }
}
exports.HttpError = HttpError;
exports.APIS = [affiliateCreatorV202405Api_1.AffiliateCreatorV202405Api, affiliateCreatorV202409Api_1.AffiliateCreatorV202409Api, affiliateCreatorV202410Api_1.AffiliateCreatorV202410Api, affiliateCreatorV202412Api_1.AffiliateCreatorV202412Api, affiliateCreatorV202501Api_1.AffiliateCreatorV202501Api, affiliateCreatorV202508Api_1.AffiliateCreatorV202508Api, affiliateCreatorV202509Api_1.AffiliateCreatorV202509Api, affiliateV202309Api_1.AffiliateV202309Api, affiliateV202402Api_1.AffiliateV202402Api, affiliateV202403Api_1.AffiliateV202403Api, analyticsV202405Api_1.AnalyticsV202405Api, analyticsV202406Api_1.AnalyticsV202406Api, analyticsV202409Api_1.AnalyticsV202409Api, analyticsV202508Api_1.AnalyticsV202508Api, authorizationV202309Api_1.AuthorizationV202309Api, authorizationV202312Api_1.AuthorizationV202312Api, authorizationV202401Api_1.AuthorizationV202401Api, authorizationV202403Api_1.AuthorizationV202403Api, dataReconciliationV202309Api_1.DataReconciliationV202309Api, dataReconciliationV202310Api_1.DataReconciliationV202310Api, dataReconciliationV202401Api_1.DataReconciliationV202401Api, eventV202309Api_1.EventV202309Api, fbtV202408Api_1.FbtV202408Api, fbtV202409Api_1.FbtV202409Api, fbtV202410Api_1.FbtV202410Api, financeV202309Api_1.FinanceV202309Api, financeV202501Api_1.FinanceV202501Api, financeV202507Api_1.FinanceV202507Api, fulfillmentV202309Api_1.FulfillmentV202309Api, fulfillmentV202407Api_1.FulfillmentV202407Api, fulfillmentV202502Api_1.FulfillmentV202502Api, fulfillmentV202508Api_1.FulfillmentV202508Api, logisticsV202309Api_1.LogisticsV202309Api, orderV202309Api_1.OrderV202309Api, orderV202406Api_1.OrderV202406Api, orderV202407Api_1.OrderV202407Api, orderV202507Api_1.OrderV202507Api, productV202309Api_1.ProductV202309Api, productV202312Api_1.ProductV202312Api, productV202401Api_1.ProductV202401Api, productV202404Api_1.ProductV202404Api, productV202405Api_1.ProductV202405Api, productV202407Api_1.ProductV202407Api, productV202409Api_1.ProductV202409Api, productV202411Api_1.ProductV202411Api, productV202501Api_1.ProductV202501Api, productV202502Api_1.ProductV202502Api, productV202505Api_1.ProductV202505Api, productV202506Api_1.ProductV202506Api, productV202507Api_1.ProductV202507Api, productV202509Api_1.ProductV202509Api, promotionV202309Api_1.PromotionV202309Api, promotionV202406Api_1.PromotionV202406Api, returnRefundV202309Api_1.ReturnRefundV202309Api, sellerV202309Api_1.SellerV202309Api, supplyChainV202309Api_1.SupplyChainV202309Api];
var API_ENUM;
(function (API_ENUM) {
    API_ENUM["AffiliateCreatorV202405Api"] = "AffiliateCreatorV202405Api";
    API_ENUM["AffiliateCreatorV202409Api"] = "AffiliateCreatorV202409Api";
    API_ENUM["AffiliateCreatorV202410Api"] = "AffiliateCreatorV202410Api";
    API_ENUM["AffiliateCreatorV202412Api"] = "AffiliateCreatorV202412Api";
    API_ENUM["AffiliateCreatorV202501Api"] = "AffiliateCreatorV202501Api";
    API_ENUM["AffiliateCreatorV202508Api"] = "AffiliateCreatorV202508Api";
    API_ENUM["AffiliateCreatorV202509Api"] = "AffiliateCreatorV202509Api";
    API_ENUM["AffiliateV202309Api"] = "AffiliateV202309Api";
    API_ENUM["AffiliateV202402Api"] = "AffiliateV202402Api";
    API_ENUM["AffiliateV202403Api"] = "AffiliateV202403Api";
    API_ENUM["AnalyticsV202405Api"] = "AnalyticsV202405Api";
    API_ENUM["AnalyticsV202406Api"] = "AnalyticsV202406Api";
    API_ENUM["AnalyticsV202409Api"] = "AnalyticsV202409Api";
    API_ENUM["AnalyticsV202508Api"] = "AnalyticsV202508Api";
    API_ENUM["AuthorizationV202309Api"] = "AuthorizationV202309Api";
    API_ENUM["AuthorizationV202312Api"] = "AuthorizationV202312Api";
    API_ENUM["AuthorizationV202401Api"] = "AuthorizationV202401Api";
    API_ENUM["AuthorizationV202403Api"] = "AuthorizationV202403Api";
    API_ENUM["DataReconciliationV202309Api"] = "DataReconciliationV202309Api";
    API_ENUM["DataReconciliationV202310Api"] = "DataReconciliationV202310Api";
    API_ENUM["DataReconciliationV202401Api"] = "DataReconciliationV202401Api";
    API_ENUM["EventV202309Api"] = "EventV202309Api";
    API_ENUM["FbtV202408Api"] = "FbtV202408Api";
    API_ENUM["FbtV202409Api"] = "FbtV202409Api";
    API_ENUM["FbtV202410Api"] = "FbtV202410Api";
    API_ENUM["FinanceV202309Api"] = "FinanceV202309Api";
    API_ENUM["FinanceV202501Api"] = "FinanceV202501Api";
    API_ENUM["FinanceV202507Api"] = "FinanceV202507Api";
    API_ENUM["FulfillmentV202309Api"] = "FulfillmentV202309Api";
    API_ENUM["FulfillmentV202407Api"] = "FulfillmentV202407Api";
    API_ENUM["FulfillmentV202502Api"] = "FulfillmentV202502Api";
    API_ENUM["FulfillmentV202508Api"] = "FulfillmentV202508Api";
    API_ENUM["LogisticsV202309Api"] = "LogisticsV202309Api";
    API_ENUM["OrderV202309Api"] = "OrderV202309Api";
    API_ENUM["OrderV202406Api"] = "OrderV202406Api";
    API_ENUM["OrderV202407Api"] = "OrderV202407Api";
    API_ENUM["OrderV202507Api"] = "OrderV202507Api";
    API_ENUM["ProductV202309Api"] = "ProductV202309Api";
    API_ENUM["ProductV202312Api"] = "ProductV202312Api";
    API_ENUM["ProductV202401Api"] = "ProductV202401Api";
    API_ENUM["ProductV202404Api"] = "ProductV202404Api";
    API_ENUM["ProductV202405Api"] = "ProductV202405Api";
    API_ENUM["ProductV202407Api"] = "ProductV202407Api";
    API_ENUM["ProductV202409Api"] = "ProductV202409Api";
    API_ENUM["ProductV202411Api"] = "ProductV202411Api";
    API_ENUM["ProductV202501Api"] = "ProductV202501Api";
    API_ENUM["ProductV202502Api"] = "ProductV202502Api";
    API_ENUM["ProductV202505Api"] = "ProductV202505Api";
    API_ENUM["ProductV202506Api"] = "ProductV202506Api";
    API_ENUM["ProductV202507Api"] = "ProductV202507Api";
    API_ENUM["ProductV202509Api"] = "ProductV202509Api";
    API_ENUM["PromotionV202309Api"] = "PromotionV202309Api";
    API_ENUM["PromotionV202406Api"] = "PromotionV202406Api";
    API_ENUM["ReturnRefundV202309Api"] = "ReturnRefundV202309Api";
    API_ENUM["SellerV202309Api"] = "SellerV202309Api";
    API_ENUM["SupplyChainV202309Api"] = "SupplyChainV202309Api";
})(API_ENUM || (exports.API_ENUM = API_ENUM = {}));
exports.API_OBJECT = {
    AffiliateCreatorV202405Api: affiliateCreatorV202405Api_1.AffiliateCreatorV202405Api,
    AffiliateCreatorV202409Api: affiliateCreatorV202409Api_1.AffiliateCreatorV202409Api,
    AffiliateCreatorV202410Api: affiliateCreatorV202410Api_1.AffiliateCreatorV202410Api,
    AffiliateCreatorV202412Api: affiliateCreatorV202412Api_1.AffiliateCreatorV202412Api,
    AffiliateCreatorV202501Api: affiliateCreatorV202501Api_1.AffiliateCreatorV202501Api,
    AffiliateCreatorV202508Api: affiliateCreatorV202508Api_1.AffiliateCreatorV202508Api,
    AffiliateCreatorV202509Api: affiliateCreatorV202509Api_1.AffiliateCreatorV202509Api,
    AffiliateV202309Api: affiliateV202309Api_1.AffiliateV202309Api,
    AffiliateV202402Api: affiliateV202402Api_1.AffiliateV202402Api,
    AffiliateV202403Api: affiliateV202403Api_1.AffiliateV202403Api,
    AnalyticsV202405Api: analyticsV202405Api_1.AnalyticsV202405Api,
    AnalyticsV202406Api: analyticsV202406Api_1.AnalyticsV202406Api,
    AnalyticsV202409Api: analyticsV202409Api_1.AnalyticsV202409Api,
    AnalyticsV202508Api: analyticsV202508Api_1.AnalyticsV202508Api,
    AuthorizationV202309Api: authorizationV202309Api_1.AuthorizationV202309Api,
    AuthorizationV202312Api: authorizationV202312Api_1.AuthorizationV202312Api,
    AuthorizationV202401Api: authorizationV202401Api_1.AuthorizationV202401Api,
    AuthorizationV202403Api: authorizationV202403Api_1.AuthorizationV202403Api,
    DataReconciliationV202309Api: dataReconciliationV202309Api_1.DataReconciliationV202309Api,
    DataReconciliationV202310Api: dataReconciliationV202310Api_1.DataReconciliationV202310Api,
    DataReconciliationV202401Api: dataReconciliationV202401Api_1.DataReconciliationV202401Api,
    EventV202309Api: eventV202309Api_1.EventV202309Api,
    FbtV202408Api: fbtV202408Api_1.FbtV202408Api,
    FbtV202409Api: fbtV202409Api_1.FbtV202409Api,
    FbtV202410Api: fbtV202410Api_1.FbtV202410Api,
    FinanceV202309Api: financeV202309Api_1.FinanceV202309Api,
    FinanceV202501Api: financeV202501Api_1.FinanceV202501Api,
    FinanceV202507Api: financeV202507Api_1.FinanceV202507Api,
    FulfillmentV202309Api: fulfillmentV202309Api_1.FulfillmentV202309Api,
    FulfillmentV202407Api: fulfillmentV202407Api_1.FulfillmentV202407Api,
    FulfillmentV202502Api: fulfillmentV202502Api_1.FulfillmentV202502Api,
    FulfillmentV202508Api: fulfillmentV202508Api_1.FulfillmentV202508Api,
    LogisticsV202309Api: logisticsV202309Api_1.LogisticsV202309Api,
    OrderV202309Api: orderV202309Api_1.OrderV202309Api,
    OrderV202406Api: orderV202406Api_1.OrderV202406Api,
    OrderV202407Api: orderV202407Api_1.OrderV202407Api,
    OrderV202507Api: orderV202507Api_1.OrderV202507Api,
    ProductV202309Api: productV202309Api_1.ProductV202309Api,
    ProductV202312Api: productV202312Api_1.ProductV202312Api,
    ProductV202401Api: productV202401Api_1.ProductV202401Api,
    ProductV202404Api: productV202404Api_1.ProductV202404Api,
    ProductV202405Api: productV202405Api_1.ProductV202405Api,
    ProductV202407Api: productV202407Api_1.ProductV202407Api,
    ProductV202409Api: productV202409Api_1.ProductV202409Api,
    ProductV202411Api: productV202411Api_1.ProductV202411Api,
    ProductV202501Api: productV202501Api_1.ProductV202501Api,
    ProductV202502Api: productV202502Api_1.ProductV202502Api,
    ProductV202505Api: productV202505Api_1.ProductV202505Api,
    ProductV202506Api: productV202506Api_1.ProductV202506Api,
    ProductV202507Api: productV202507Api_1.ProductV202507Api,
    ProductV202509Api: productV202509Api_1.ProductV202509Api,
    PromotionV202309Api: promotionV202309Api_1.PromotionV202309Api,
    PromotionV202406Api: promotionV202406Api_1.PromotionV202406Api,
    ReturnRefundV202309Api: returnRefundV202309Api_1.ReturnRefundV202309Api,
    SellerV202309Api: sellerV202309Api_1.SellerV202309Api,
    SupplyChainV202309Api: supplyChainV202309Api_1.SupplyChainV202309Api
};
exports.API_OPERATION_NAME_MAP = {
    AffiliateCreatorV202405Api: affiliateCreatorV202405Api_1.AffiliateCreatorV202405ApiOperationNames,
    AffiliateCreatorV202409Api: affiliateCreatorV202409Api_1.AffiliateCreatorV202409ApiOperationNames,
    AffiliateCreatorV202410Api: affiliateCreatorV202410Api_1.AffiliateCreatorV202410ApiOperationNames,
    AffiliateCreatorV202412Api: affiliateCreatorV202412Api_1.AffiliateCreatorV202412ApiOperationNames,
    AffiliateCreatorV202501Api: affiliateCreatorV202501Api_1.AffiliateCreatorV202501ApiOperationNames,
    AffiliateCreatorV202508Api: affiliateCreatorV202508Api_1.AffiliateCreatorV202508ApiOperationNames,
    AffiliateCreatorV202509Api: affiliateCreatorV202509Api_1.AffiliateCreatorV202509ApiOperationNames,
    AffiliateV202309Api: affiliateV202309Api_1.AffiliateV202309ApiOperationNames,
    AffiliateV202402Api: affiliateV202402Api_1.AffiliateV202402ApiOperationNames,
    AffiliateV202403Api: affiliateV202403Api_1.AffiliateV202403ApiOperationNames,
    AnalyticsV202405Api: analyticsV202405Api_1.AnalyticsV202405ApiOperationNames,
    AnalyticsV202406Api: analyticsV202406Api_1.AnalyticsV202406ApiOperationNames,
    AnalyticsV202409Api: analyticsV202409Api_1.AnalyticsV202409ApiOperationNames,
    AnalyticsV202508Api: analyticsV202508Api_1.AnalyticsV202508ApiOperationNames,
    AuthorizationV202309Api: authorizationV202309Api_1.AuthorizationV202309ApiOperationNames,
    AuthorizationV202312Api: authorizationV202312Api_1.AuthorizationV202312ApiOperationNames,
    AuthorizationV202401Api: authorizationV202401Api_1.AuthorizationV202401ApiOperationNames,
    AuthorizationV202403Api: authorizationV202403Api_1.AuthorizationV202403ApiOperationNames,
    DataReconciliationV202309Api: dataReconciliationV202309Api_1.DataReconciliationV202309ApiOperationNames,
    DataReconciliationV202310Api: dataReconciliationV202310Api_1.DataReconciliationV202310ApiOperationNames,
    DataReconciliationV202401Api: dataReconciliationV202401Api_1.DataReconciliationV202401ApiOperationNames,
    EventV202309Api: eventV202309Api_1.EventV202309ApiOperationNames,
    FbtV202408Api: fbtV202408Api_1.FbtV202408ApiOperationNames,
    FbtV202409Api: fbtV202409Api_1.FbtV202409ApiOperationNames,
    FbtV202410Api: fbtV202410Api_1.FbtV202410ApiOperationNames,
    FinanceV202309Api: financeV202309Api_1.FinanceV202309ApiOperationNames,
    FinanceV202501Api: financeV202501Api_1.FinanceV202501ApiOperationNames,
    FinanceV202507Api: financeV202507Api_1.FinanceV202507ApiOperationNames,
    FulfillmentV202309Api: fulfillmentV202309Api_1.FulfillmentV202309ApiOperationNames,
    FulfillmentV202407Api: fulfillmentV202407Api_1.FulfillmentV202407ApiOperationNames,
    FulfillmentV202502Api: fulfillmentV202502Api_1.FulfillmentV202502ApiOperationNames,
    FulfillmentV202508Api: fulfillmentV202508Api_1.FulfillmentV202508ApiOperationNames,
    LogisticsV202309Api: logisticsV202309Api_1.LogisticsV202309ApiOperationNames,
    OrderV202309Api: orderV202309Api_1.OrderV202309ApiOperationNames,
    OrderV202406Api: orderV202406Api_1.OrderV202406ApiOperationNames,
    OrderV202407Api: orderV202407Api_1.OrderV202407ApiOperationNames,
    OrderV202507Api: orderV202507Api_1.OrderV202507ApiOperationNames,
    ProductV202309Api: productV202309Api_1.ProductV202309ApiOperationNames,
    ProductV202312Api: productV202312Api_1.ProductV202312ApiOperationNames,
    ProductV202401Api: productV202401Api_1.ProductV202401ApiOperationNames,
    ProductV202404Api: productV202404Api_1.ProductV202404ApiOperationNames,
    ProductV202405Api: productV202405Api_1.ProductV202405ApiOperationNames,
    ProductV202407Api: productV202407Api_1.ProductV202407ApiOperationNames,
    ProductV202409Api: productV202409Api_1.ProductV202409ApiOperationNames,
    ProductV202411Api: productV202411Api_1.ProductV202411ApiOperationNames,
    ProductV202501Api: productV202501Api_1.ProductV202501ApiOperationNames,
    ProductV202502Api: productV202502Api_1.ProductV202502ApiOperationNames,
    ProductV202505Api: productV202505Api_1.ProductV202505ApiOperationNames,
    ProductV202506Api: productV202506Api_1.ProductV202506ApiOperationNames,
    ProductV202507Api: productV202507Api_1.ProductV202507ApiOperationNames,
    ProductV202509Api: productV202509Api_1.ProductV202509ApiOperationNames,
    PromotionV202309Api: promotionV202309Api_1.PromotionV202309ApiOperationNames,
    PromotionV202406Api: promotionV202406Api_1.PromotionV202406ApiOperationNames,
    ReturnRefundV202309Api: returnRefundV202309Api_1.ReturnRefundV202309ApiOperationNames,
    SellerV202309Api: sellerV202309Api_1.SellerV202309ApiOperationNames,
    SupplyChainV202309Api: supplyChainV202309Api_1.SupplyChainV202309ApiOperationNames
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwaXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrREFBNkM7QUFDN0MsNkVBQThKO0FBQzlKLCtEQUE2QztBQUM3Qyw2RUFBOEo7QUFDOUosK0RBQTZDO0FBQzdDLDZFQUE4SjtBQUM5SiwrREFBNkM7QUFDN0MsNkVBQThKO0FBQzlKLCtEQUE2QztBQUM3Qyw2RUFBOEo7QUFDOUosK0RBQTZDO0FBQzdDLDZFQUE4SjtBQUM5SiwrREFBNkM7QUFDN0MsNkVBQThKO0FBQzlKLHdEQUFzQztBQUN0QywrREFBa0k7QUFDbEksd0RBQXNDO0FBQ3RDLCtEQUFrSTtBQUNsSSx3REFBc0M7QUFDdEMsK0RBQWtJO0FBQ2xJLHdEQUFzQztBQUN0QywrREFBa0k7QUFDbEksd0RBQXNDO0FBQ3RDLCtEQUFrSTtBQUNsSSx3REFBc0M7QUFDdEMsK0RBQWtJO0FBQ2xJLHdEQUFzQztBQUN0QywrREFBa0k7QUFDbEksNERBQTBDO0FBQzFDLHVFQUFrSjtBQUNsSiw0REFBMEM7QUFDMUMsdUVBQWtKO0FBQ2xKLDREQUEwQztBQUMxQyx1RUFBa0o7QUFDbEosNERBQTBDO0FBQzFDLHVFQUFrSjtBQUNsSixpRUFBK0M7QUFDL0MsaUZBQXNLO0FBQ3RLLGlFQUErQztBQUMvQyxpRkFBc0s7QUFDdEssaUVBQStDO0FBQy9DLGlGQUFzSztBQUN0SyxvREFBa0M7QUFDbEMsdURBQWtIO0FBQ2xILGtEQUFnQztBQUNoQyxtREFBMEc7QUFDMUcsa0RBQWdDO0FBQ2hDLG1EQUEwRztBQUMxRyxrREFBZ0M7QUFDaEMsbURBQTBHO0FBQzFHLHNEQUFvQztBQUNwQywyREFBMEg7QUFDMUgsc0RBQW9DO0FBQ3BDLDJEQUEwSDtBQUMxSCxzREFBb0M7QUFDcEMsMkRBQTBIO0FBQzFILDBEQUF3QztBQUN4QyxtRUFBMEk7QUFDMUksMERBQXdDO0FBQ3hDLG1FQUEwSTtBQUMxSSwwREFBd0M7QUFDeEMsbUVBQTBJO0FBQzFJLDBEQUF3QztBQUN4QyxtRUFBMEk7QUFDMUksd0RBQXNDO0FBQ3RDLCtEQUFrSTtBQUNsSSxvREFBa0M7QUFDbEMsdURBQWtIO0FBQ2xILG9EQUFrQztBQUNsQyx1REFBa0g7QUFDbEgsb0RBQWtDO0FBQ2xDLHVEQUFrSDtBQUNsSCxvREFBa0M7QUFDbEMsdURBQWtIO0FBQ2xILHNEQUFvQztBQUNwQywyREFBMEg7QUFDMUgsc0RBQW9DO0FBQ3BDLDJEQUEwSDtBQUMxSCxzREFBb0M7QUFDcEMsMkRBQTBIO0FBQzFILHNEQUFvQztBQUNwQywyREFBMEg7QUFDMUgsc0RBQW9DO0FBQ3BDLDJEQUEwSDtBQUMxSCxzREFBb0M7QUFDcEMsMkRBQTBIO0FBQzFILHNEQUFvQztBQUNwQywyREFBMEg7QUFDMUgsc0RBQW9DO0FBQ3BDLDJEQUEwSDtBQUMxSCxzREFBb0M7QUFDcEMsMkRBQTBIO0FBQzFILHNEQUFvQztBQUNwQywyREFBMEg7QUFDMUgsc0RBQW9DO0FBQ3BDLDJEQUEwSDtBQUMxSCxzREFBb0M7QUFDcEMsMkRBQTBIO0FBQzFILHNEQUFvQztBQUNwQywyREFBMEg7QUFDMUgsc0RBQW9DO0FBQ3BDLDJEQUEwSDtBQUMxSCx3REFBc0M7QUFDdEMsK0RBQWtJO0FBQ2xJLHdEQUFzQztBQUN0QywrREFBa0k7QUFDbEksMkRBQXlDO0FBQ3pDLHFFQUE4STtBQUM5SSxxREFBbUM7QUFDbkMseURBQXNIO0FBQ3RILDBEQUF3QztBQUN4QyxtRUFBMEk7QUFHMUksTUFBYSxTQUFVLFNBQVEsS0FBSztJQUNwQyxZQUFvQixRQUE4QixFQUFTLElBQVMsRUFBUyxVQUFtQjtRQUNoRyxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQURULGFBQVEsR0FBUixRQUFRLENBQXNCO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBSztRQUFTLGVBQVUsR0FBVixVQUFVLENBQVM7UUFFaEcsSUFBSSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUM7SUFDeEIsQ0FBQztDQUNBO0FBTEQsOEJBS0M7QUFJWSxRQUFBLElBQUksR0FBRyxDQUFDLHVEQUEwQixFQUFFLHVEQUEwQixFQUFFLHVEQUEwQixFQUFFLHVEQUEwQixFQUFFLHVEQUEwQixFQUFFLHVEQUEwQixFQUFFLHVEQUEwQixFQUFFLHlDQUFtQixFQUFFLHlDQUFtQixFQUFFLHlDQUFtQixFQUFFLHlDQUFtQixFQUFFLHlDQUFtQixFQUFFLHlDQUFtQixFQUFFLHlDQUFtQixFQUFFLGlEQUF1QixFQUFFLGlEQUF1QixFQUFFLGlEQUF1QixFQUFFLGlEQUF1QixFQUFFLDJEQUE0QixFQUFFLDJEQUE0QixFQUFFLDJEQUE0QixFQUFFLGlDQUFlLEVBQUUsNkJBQWEsRUFBRSw2QkFBYSxFQUFFLDZCQUFhLEVBQUUscUNBQWlCLEVBQUUscUNBQWlCLEVBQUUscUNBQWlCLEVBQUUsNkNBQXFCLEVBQUUsNkNBQXFCLEVBQUUsNkNBQXFCLEVBQUUsNkNBQXFCLEVBQUUseUNBQW1CLEVBQUUsaUNBQWUsRUFBRSxpQ0FBZSxFQUFFLGlDQUFlLEVBQUUsaUNBQWUsRUFBRSxxQ0FBaUIsRUFBRSxxQ0FBaUIsRUFBRSxxQ0FBaUIsRUFBRSxxQ0FBaUIsRUFBRSxxQ0FBaUIsRUFBRSxxQ0FBaUIsRUFBRSxxQ0FBaUIsRUFBRSxxQ0FBaUIsRUFBRSxxQ0FBaUIsRUFBRSxxQ0FBaUIsRUFBRSxxQ0FBaUIsRUFBRSxxQ0FBaUIsRUFBRSxxQ0FBaUIsRUFBRSxxQ0FBaUIsRUFBRSx5Q0FBbUIsRUFBRSx5Q0FBbUIsRUFBRSwrQ0FBc0IsRUFBRSxtQ0FBZ0IsRUFBRSw2Q0FBcUIsQ0FBQyxDQUFDO0FBRTNzQyxJQUFZLFFBeURYO0FBekRELFdBQVksUUFBUTtJQUNoQixxRUFBdUQsQ0FBQTtJQUN2RCxxRUFBdUQsQ0FBQTtJQUN2RCxxRUFBdUQsQ0FBQTtJQUN2RCxxRUFBdUQsQ0FBQTtJQUN2RCxxRUFBdUQsQ0FBQTtJQUN2RCxxRUFBdUQsQ0FBQTtJQUN2RCxxRUFBdUQsQ0FBQTtJQUN2RCx1REFBeUMsQ0FBQTtJQUN6Qyx1REFBeUMsQ0FBQTtJQUN6Qyx1REFBeUMsQ0FBQTtJQUN6Qyx1REFBeUMsQ0FBQTtJQUN6Qyx1REFBeUMsQ0FBQTtJQUN6Qyx1REFBeUMsQ0FBQTtJQUN6Qyx1REFBeUMsQ0FBQTtJQUN6QywrREFBaUQsQ0FBQTtJQUNqRCwrREFBaUQsQ0FBQTtJQUNqRCwrREFBaUQsQ0FBQTtJQUNqRCwrREFBaUQsQ0FBQTtJQUNqRCx5RUFBMkQsQ0FBQTtJQUMzRCx5RUFBMkQsQ0FBQTtJQUMzRCx5RUFBMkQsQ0FBQTtJQUMzRCwrQ0FBaUMsQ0FBQTtJQUNqQywyQ0FBNkIsQ0FBQTtJQUM3QiwyQ0FBNkIsQ0FBQTtJQUM3QiwyQ0FBNkIsQ0FBQTtJQUM3QixtREFBcUMsQ0FBQTtJQUNyQyxtREFBcUMsQ0FBQTtJQUNyQyxtREFBcUMsQ0FBQTtJQUNyQywyREFBNkMsQ0FBQTtJQUM3QywyREFBNkMsQ0FBQTtJQUM3QywyREFBNkMsQ0FBQTtJQUM3QywyREFBNkMsQ0FBQTtJQUM3Qyx1REFBeUMsQ0FBQTtJQUN6QywrQ0FBaUMsQ0FBQTtJQUNqQywrQ0FBaUMsQ0FBQTtJQUNqQywrQ0FBaUMsQ0FBQTtJQUNqQywrQ0FBaUMsQ0FBQTtJQUNqQyxtREFBcUMsQ0FBQTtJQUNyQyxtREFBcUMsQ0FBQTtJQUNyQyxtREFBcUMsQ0FBQTtJQUNyQyxtREFBcUMsQ0FBQTtJQUNyQyxtREFBcUMsQ0FBQTtJQUNyQyxtREFBcUMsQ0FBQTtJQUNyQyxtREFBcUMsQ0FBQTtJQUNyQyxtREFBcUMsQ0FBQTtJQUNyQyxtREFBcUMsQ0FBQTtJQUNyQyxtREFBcUMsQ0FBQTtJQUNyQyxtREFBcUMsQ0FBQTtJQUNyQyxtREFBcUMsQ0FBQTtJQUNyQyxtREFBcUMsQ0FBQTtJQUNyQyxtREFBcUMsQ0FBQTtJQUNyQyx1REFBeUMsQ0FBQTtJQUN6Qyx1REFBeUMsQ0FBQTtJQUN6Qyw2REFBK0MsQ0FBQTtJQUMvQyxpREFBbUMsQ0FBQTtJQUNuQywyREFBNkMsQ0FBQTtBQUNqRCxDQUFDLEVBekRXLFFBQVEsd0JBQVIsUUFBUSxRQXlEbkI7QUFFWSxRQUFBLFVBQVUsR0FBRztJQUN0QiwwQkFBMEIsRUFBQyx1REFBMEI7SUFDckQsMEJBQTBCLEVBQUMsdURBQTBCO0lBQ3JELDBCQUEwQixFQUFDLHVEQUEwQjtJQUNyRCwwQkFBMEIsRUFBQyx1REFBMEI7SUFDckQsMEJBQTBCLEVBQUMsdURBQTBCO0lBQ3JELDBCQUEwQixFQUFDLHVEQUEwQjtJQUNyRCwwQkFBMEIsRUFBQyx1REFBMEI7SUFDckQsbUJBQW1CLEVBQUMseUNBQW1CO0lBQ3ZDLG1CQUFtQixFQUFDLHlDQUFtQjtJQUN2QyxtQkFBbUIsRUFBQyx5Q0FBbUI7SUFDdkMsbUJBQW1CLEVBQUMseUNBQW1CO0lBQ3ZDLG1CQUFtQixFQUFDLHlDQUFtQjtJQUN2QyxtQkFBbUIsRUFBQyx5Q0FBbUI7SUFDdkMsbUJBQW1CLEVBQUMseUNBQW1CO0lBQ3ZDLHVCQUF1QixFQUFDLGlEQUF1QjtJQUMvQyx1QkFBdUIsRUFBQyxpREFBdUI7SUFDL0MsdUJBQXVCLEVBQUMsaURBQXVCO0lBQy9DLHVCQUF1QixFQUFDLGlEQUF1QjtJQUMvQyw0QkFBNEIsRUFBQywyREFBNEI7SUFDekQsNEJBQTRCLEVBQUMsMkRBQTRCO0lBQ3pELDRCQUE0QixFQUFDLDJEQUE0QjtJQUN6RCxlQUFlLEVBQUMsaUNBQWU7SUFDL0IsYUFBYSxFQUFDLDZCQUFhO0lBQzNCLGFBQWEsRUFBQyw2QkFBYTtJQUMzQixhQUFhLEVBQUMsNkJBQWE7SUFDM0IsaUJBQWlCLEVBQUMscUNBQWlCO0lBQ25DLGlCQUFpQixFQUFDLHFDQUFpQjtJQUNuQyxpQkFBaUIsRUFBQyxxQ0FBaUI7SUFDbkMscUJBQXFCLEVBQUMsNkNBQXFCO0lBQzNDLHFCQUFxQixFQUFDLDZDQUFxQjtJQUMzQyxxQkFBcUIsRUFBQyw2Q0FBcUI7SUFDM0MscUJBQXFCLEVBQUMsNkNBQXFCO0lBQzNDLG1CQUFtQixFQUFDLHlDQUFtQjtJQUN2QyxlQUFlLEVBQUMsaUNBQWU7SUFDL0IsZUFBZSxFQUFDLGlDQUFlO0lBQy9CLGVBQWUsRUFBQyxpQ0FBZTtJQUMvQixlQUFlLEVBQUMsaUNBQWU7SUFDL0IsaUJBQWlCLEVBQUMscUNBQWlCO0lBQ25DLGlCQUFpQixFQUFDLHFDQUFpQjtJQUNuQyxpQkFBaUIsRUFBQyxxQ0FBaUI7SUFDbkMsaUJBQWlCLEVBQUMscUNBQWlCO0lBQ25DLGlCQUFpQixFQUFDLHFDQUFpQjtJQUNuQyxpQkFBaUIsRUFBQyxxQ0FBaUI7SUFDbkMsaUJBQWlCLEVBQUMscUNBQWlCO0lBQ25DLGlCQUFpQixFQUFDLHFDQUFpQjtJQUNuQyxpQkFBaUIsRUFBQyxxQ0FBaUI7SUFDbkMsaUJBQWlCLEVBQUMscUNBQWlCO0lBQ25DLGlCQUFpQixFQUFDLHFDQUFpQjtJQUNuQyxpQkFBaUIsRUFBQyxxQ0FBaUI7SUFDbkMsaUJBQWlCLEVBQUMscUNBQWlCO0lBQ25DLGlCQUFpQixFQUFDLHFDQUFpQjtJQUNuQyxtQkFBbUIsRUFBQyx5Q0FBbUI7SUFDdkMsbUJBQW1CLEVBQUMseUNBQW1CO0lBQ3ZDLHNCQUFzQixFQUFDLCtDQUFzQjtJQUM3QyxnQkFBZ0IsRUFBQyxtQ0FBZ0I7SUFDakMscUJBQXFCLEVBQUMsNkNBQXFCO0NBQ3JDLENBQUM7QUFFRSxRQUFBLHNCQUFzQixHQUFHO0lBQ2xDLDBCQUEwQixFQUFDLHFFQUF3QztJQUNuRSwwQkFBMEIsRUFBQyxxRUFBd0M7SUFDbkUsMEJBQTBCLEVBQUMscUVBQXdDO0lBQ25FLDBCQUEwQixFQUFDLHFFQUF3QztJQUNuRSwwQkFBMEIsRUFBQyxxRUFBd0M7SUFDbkUsMEJBQTBCLEVBQUMscUVBQXdDO0lBQ25FLDBCQUEwQixFQUFDLHFFQUF3QztJQUNuRSxtQkFBbUIsRUFBQyx1REFBaUM7SUFDckQsbUJBQW1CLEVBQUMsdURBQWlDO0lBQ3JELG1CQUFtQixFQUFDLHVEQUFpQztJQUNyRCxtQkFBbUIsRUFBQyx1REFBaUM7SUFDckQsbUJBQW1CLEVBQUMsdURBQWlDO0lBQ3JELG1CQUFtQixFQUFDLHVEQUFpQztJQUNyRCxtQkFBbUIsRUFBQyx1REFBaUM7SUFDckQsdUJBQXVCLEVBQUMsK0RBQXFDO0lBQzdELHVCQUF1QixFQUFDLCtEQUFxQztJQUM3RCx1QkFBdUIsRUFBQywrREFBcUM7SUFDN0QsdUJBQXVCLEVBQUMsK0RBQXFDO0lBQzdELDRCQUE0QixFQUFDLHlFQUEwQztJQUN2RSw0QkFBNEIsRUFBQyx5RUFBMEM7SUFDdkUsNEJBQTRCLEVBQUMseUVBQTBDO0lBQ3ZFLGVBQWUsRUFBQywrQ0FBNkI7SUFDN0MsYUFBYSxFQUFDLDJDQUEyQjtJQUN6QyxhQUFhLEVBQUMsMkNBQTJCO0lBQ3pDLGFBQWEsRUFBQywyQ0FBMkI7SUFDekMsaUJBQWlCLEVBQUMsbURBQStCO0lBQ2pELGlCQUFpQixFQUFDLG1EQUErQjtJQUNqRCxpQkFBaUIsRUFBQyxtREFBK0I7SUFDakQscUJBQXFCLEVBQUMsMkRBQW1DO0lBQ3pELHFCQUFxQixFQUFDLDJEQUFtQztJQUN6RCxxQkFBcUIsRUFBQywyREFBbUM7SUFDekQscUJBQXFCLEVBQUMsMkRBQW1DO0lBQ3pELG1CQUFtQixFQUFDLHVEQUFpQztJQUNyRCxlQUFlLEVBQUMsK0NBQTZCO0lBQzdDLGVBQWUsRUFBQywrQ0FBNkI7SUFDN0MsZUFBZSxFQUFDLCtDQUE2QjtJQUM3QyxlQUFlLEVBQUMsK0NBQTZCO0lBQzdDLGlCQUFpQixFQUFDLG1EQUErQjtJQUNqRCxpQkFBaUIsRUFBQyxtREFBK0I7SUFDakQsaUJBQWlCLEVBQUMsbURBQStCO0lBQ2pELGlCQUFpQixFQUFDLG1EQUErQjtJQUNqRCxpQkFBaUIsRUFBQyxtREFBK0I7SUFDakQsaUJBQWlCLEVBQUMsbURBQStCO0lBQ2pELGlCQUFpQixFQUFDLG1EQUErQjtJQUNqRCxpQkFBaUIsRUFBQyxtREFBK0I7SUFDakQsaUJBQWlCLEVBQUMsbURBQStCO0lBQ2pELGlCQUFpQixFQUFDLG1EQUErQjtJQUNqRCxpQkFBaUIsRUFBQyxtREFBK0I7SUFDakQsaUJBQWlCLEVBQUMsbURBQStCO0lBQ2pELGlCQUFpQixFQUFDLG1EQUErQjtJQUNqRCxpQkFBaUIsRUFBQyxtREFBK0I7SUFDakQsbUJBQW1CLEVBQUMsdURBQWlDO0lBQ3JELG1CQUFtQixFQUFDLHVEQUFpQztJQUNyRCxzQkFBc0IsRUFBQyw2REFBb0M7SUFDM0QsZ0JBQWdCLEVBQUMsaURBQThCO0lBQy9DLHFCQUFxQixFQUFDLDJEQUFtQztDQUNuRCxDQUFDIn0=