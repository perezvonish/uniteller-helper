# UnitellerHelper

Simple package for helping integrate [Uniteller](https://www.uniteller.ru/) in your application.

### Env:
<ul>
    <li>UNITELLER_UPID: string</li>
    <li>UNITELLER_LOGIN: string</li>
    <li>UNITELLER_PASSWORD: string</li>
    <li>UNITELLER_URL: string</li>
</ul>

## At initialization must be these parameters:
<ul>
    <li>orderId: string | null (can be empty string, uniteller will generate it)</li>
    <li>upid: string</li>
    <li>login: string</li>
    <li>password: string</li>
    <li>url: string</li>
    <li>debug: boolean</li>
</ul>

## Methods
<ol>
    <li>createPaymentLink</li>
    <li>checkPaymentStatus</li>
</ol>
<b>createPaymentLink</b> - create the payment link for your store. You have to give method these parameters: 
<ul>
    <li>amount: number</li>
</ul>

<b>checkPaymentStatus</b> - check the payment's status code. You have to give method these parameters:
<ol>
    <li>orderId: string</li>
</ol>

# Stay safe! 2022