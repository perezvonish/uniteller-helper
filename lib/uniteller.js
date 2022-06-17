"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitellerHelper = void 0;
const sha_js_1 = __importDefault(require("sha.js"));
const axios_1 = __importDefault(require("axios"));
class UnitellerHelper {
    constructor(orderId, upid, login, password, url, debug) {
        this.orderId = orderId || '';
        this.upid = upid;
        this.login = login;
        this.password = password;
        this.url = url;
        this.debug = debug;
    }
    createPaymentLink(amount) {
        if (amount < 0 || !amount || typeof amount != typeof String)
            throw new Error('Amount have not to be zero and must be.');
        const OrderID = '';
        const UPID = this.upid;
        const OrderLifeTime = '';
        const CurrentDate = new Date();
        const Preauth = '1';
        const Subtotal = amount;
        const password = this.password;
        const Signature = ((0, sha_js_1.default)(`${(0, sha_js_1.default)(OrderID)}`) +
            '&' + (0, sha_js_1.default)(UPID) +
            '&' + (0, sha_js_1.default)(OrderLifeTime) +
            '&' + (0, sha_js_1.default)(`${CurrentDate}`) +
            '&' + (0, sha_js_1.default)(Preauth) +
            '&' + (0, sha_js_1.default)(`${Subtotal}`) +
            '&' + (0, sha_js_1.default)(password));
        const data = {
            OrderID: OrderID,
            UPID: UPID,
            OrderLifeTime: OrderLifeTime,
            CurrentDate: CurrentDate,
            Preauth: Preauth,
            Subtotal: Subtotal,
            Signature: Signature
        };
        return axios_1.default.post('https://https://fpay.uniteller.ru/v1/api/register', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            return console.log((response));
        });
    }
    checkPaymentStatus(orderId) {
        const postData = {
            Shop_ID: this.upid,
            Login: this.login,
            Password: this.password,
            Format: 1,
            ShopOrderNumber: orderId
        };
        return axios_1.default.post('https://wpay.uniteller.ru/results/', postData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            if (this.debug) {
                console.log(response.data);
            }
            return response.data;
        });
    }
}
exports.UnitellerHelper = UnitellerHelper;
