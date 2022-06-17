import shajs from 'sha.js';
import axios from "axios";

export class UnitellerHelper {
    private readonly upid: string;
    private readonly login: string;
    private readonly password: string;
    private readonly url: string;
    private readonly debug: boolean;

    constructor(
        upid: string,
        login: string,
        password: string,
        url: string,
        debug: boolean
    ) {
        this.upid = upid
        this.login = login;
        this.password = password
        this.url = url
        this.debug = debug
    }

    createPaymentLink(amount: number) {
        if (amount < 0 || !amount || typeof amount != typeof String) throw new Error('Amount have not to be zero and must be.')

        const OrderID = ''
        const UPID = this.upid
        const OrderLifeTime = ''
        const CurrentDate = new Date()
        const Preauth = '1'
        const Subtotal = amount
        const password = this.password

        const Signature = (shajs(`${shajs(OrderID)}`) +
            '&' + shajs(UPID) +
            '&' + shajs(OrderLifeTime) +
            '&' + shajs(`${CurrentDate}`) +
            '&' + shajs(Preauth) +
            '&' + shajs(`${Subtotal}`) +
            '&' + shajs(password))

        const data = {
            OrderID: OrderID,
            UPID: UPID,
            OrderLifeTime: OrderLifeTime,
            CurrentDate: CurrentDate,
            Preauth: Preauth,
            Subtotal: Subtotal,
            Signature: Signature
        }

        return axios.post(
            'https://https://fpay.uniteller.ru/v1/api/register',
            data,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then((response) => {
            return console.log((response))
        })
    }

    checkPaymentStatus(orderId: string) {
        const postData = {
            Shop_ID: this.upid,
            Login: this.login,
            Password: this.password,
            Format: 1,
            ShopOrderNumber: orderId
        }

        return axios.post('https://wpay.uniteller.ru/results/', postData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            if(this.debug){console.log(response.data)}
            return response.data
        })
    }
}