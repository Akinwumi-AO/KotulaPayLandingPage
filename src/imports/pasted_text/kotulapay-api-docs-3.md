Introduction
Kotulapay is a simple, fast and reliable payment engine with open architecture. Founded back in 2018 now it is supported and constantly developing by the community of software engineers with bold background in payment and e-wallet systems.

Kotulapay Business API - a solution specifically designed for internet businesses in need of multicurrency payment processing. We support all major currencies.

Environments
There are two environments available for integration:

Production environment: https://business.kotulapay.com
Sandbox Environment
Sandbox provides full functionality but it only emulates processing, no actual bank transactions are made. You can use the following PAN for tests:

4617611794313933: CONFIRMED as 3-D Secure transaction
4626233193837898: DECLINED as 3-D Secure transaction
4392963203551251: CONFIRMED as non 3-D Secure transaction
4730198364688516: DECLINED as non 3-D Secure transaction
4627342642639018: APPROVED PAYOUT
4968357931420422: DECLINED PAYOUT
You can use any cardholder name, expiry date and CVV2/CVC2 with these PANs. 3-D Secure is also emulated with a page that doesn’t require any password but only shows you 2 buttons. One button is for successful authentication, another is for failed authentication. Note, that when you chose to fail authentication, order is always declined, no matter what PAN was used.

Don’t use real cards on Sandbox environment.
Production Environment
Once you complete integration with Sandbox environment you will be provided with Production credentials. These are completely different credentials, not related with the ones on Sandbox. Production always makes real bank transactions, cards from Sandbox are not supported on this environment.

Authentication
import http.client

conn = http.client.HTTPSConnection("...")

headers = {
    'authorization': "Bearer merchant_private_key",
    }
Authenticate your account when using the API, by including your secret API key which has been sent via email during registration. Management of your API keys can be done within the Backoffice. Your API keys carry importance and privileges, be sure to store them securely. Please do not share your secret API keys in publicly accessible areas such GitHub and client-side code areas.

Authentication to the API is performed via bearer auth keys (for cross-origin requests), use -H “Authorization: Bearer merchant_private_key”.

All API requests must be made through HTTPS. Calls made through plain HTTP will fail. API requests without authentication will also fail.

Payments
Kotulapay payment processing REST API.

Create
Code:
Copy

from django.http import HttpResponseRedirect, HttpResponse
import requests
import json

def pay(request) :

    MERCHANT_PRIVATE_KEY = 'merchant_private_key'
    LIVE_URL = 'https://business.kotulapay.com';
    SANDBOX_URL = 'https://business.kotulapay.com'

    payload = {
        "product" : request.POST['product_name'],
        "amount" : request.POST['order_amount'],
        "currency" : "CNY",
        "redirectSuccessUrl": request.POST['notify_url'],
        "redirectFailUrl" : request.POST['return_url'],
        "extraReturnParam" : request.POST['order_no'],
        "orderNumber" : request.POST['order_number'],
        "locale" : request.POST['locale']
    }

    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer %s' % (MERCHANT_PRIVATE_KEY)
    }

    resp = requests.post('%s/api/v1/payments' % (SANDBOX_URL), json=payload, headers=headers)

    if resp.status_code == 200:
        resp_payload = json.loads(resp.text)
        return HttpResponseRedirect(resp_payload['processingUrl'])
    else:
        return HttpResponse('<html><body><span>Something gone wrong: %s</span></body></html>' % (resp.status_code))
Return status 200 and JSON:
Copy

{
  "success": true | false,
  "errors": [],
  "token": "[payment token]",
  "processingUrl": "https://business.kotulapay.com/p/[payment token]",
  "payment": {
    "amount": "10020",
    "currency": "CNY",
    "status": "init"
  },
  "redirectRequest": {
    "url": "[redirect url, for example ACS URL for 3ds]",
    "params": {
      "PaReq": "[PaReq for current payment]",
      "TermUrl": "https://business.kotulapay.com/checkout_results/[payment token]/callback_3ds"
    },
    "type": "post"
  }
}
Initialize payments - to begin receiving payments, you must first call using the following script. This will enable you to obtain a payment token, which will be required later to complete API integration.

HTTP Request via SSL
POST '/api/v1/payments'

Query Parameters
Parameter	Mandatory	Description	Validation
product	yes	Product name (Service description) (example: 'iPhone').	minLength: 5, maxLength: 255
amount	yes	Payment amount in cents (10020), except JPY	minLength: 1, maxLength: 32
currency	yes	Currency code (CNY, EUR, USD, JPY).	minLength: 3, maxLength: 3
callbackUrl	yes	The server URL a merchant will be notified about a payment finalisation	Valid URI format
redirectSuccessUrl	no	The URL a customer will be redirected to in the case of successfull payment	Valid URI format
redirectFailUrl	no	The URL a customer will be redirected to in the case of payment error or failure	Valid URI format
pendingUrl	no	The URL a customer will be redirected to the specific page in the case of pending payment instead built-in checkout_resault_page	Valid URI format
extraReturnParam	no	Bank/Payment method list, description, etc	minLength: 1, maxLength: 1024
expires_at	no	Expired payment time for requests without a bank card	minLength: 1
orderNumber	no	The current order number from a company system.	minLength: 3, maxLength: 255 (string)
locale	no	The locale is used on a payment page by default. Currently supported locales: en, zh and jp from ISO 639-1.	minLength: 2, maxLength: 5 (string)
walletToken	no	Set this parameter when making recurring payment from a customer’s wallet. A customer will receive notification and has to confirm the payment.	returns by API for recurring payments only
recurring	no	Set this parameter to true when initializing recurring payment.	boolean
recurringToken	no	Set this parameter when making recurring payment previously initialized with recurring param.	returns by API for recurring payments only
needConfirmation	no	Set this parameter whe making payment in two steps (preAuth and confirm/decline)	
card	no	Card object for Host2Host payments.	
customer	no	Customer object for Host2Host payments.	
recurring_data	no	Recurring data object for Host2Host payments.	
merchantUrl	no	Param to control traffic from aggregators	
Card Object Parameters
Parameter	Mandatory	Description	Validation
pan	yes	Customer’s card number (PAN). Any valid card number, may contain spaces	Valid card number (16-19 digits)
expires	yes	Customer’s card expiration date. Format: mm/yyyy	mm/yyyy format
holder	yes	Customer’s cardholder name. Any valid cardholder name	minLength: 5, maxLength: 50
cvv	yes	Customer’s CVV2 / CVC2 / CAV2	minLength: 3, maxLength: 3 Only digits (\d+)
Customer Object Parameters (optional)
Parameter	Mandatory	Description	Validation
email	yes	Customer’s email, is mandatory if Customer object posted on a request	Valid email format
address	no	Customer's billing address	minLength: 5, maxLength: 55
country	no	Customer's billing country	ISO country code format "GB"
city	no	Customer's billing city	minLength: 4, maxLength: 55
region	no	Customer's billing region	minLength: 5, maxLength: 55
postcode	no	Customer's billing ZipCode	minLength: 4, maxLength: 55
phone	no	Customer's billing phone number	minLength: 6, maxLength: 20
ip	no	Customer IP address	Valid IP address format (XX.XX.XX.XX)
browser	no	Customer browser object for 3ds2 payments.	
Customer browser object for 3ds2 payments (optional)
Parameter	Mandatory	Description	Example
accept_header	no	Browser's content type	text/html
color_depth	no	Browser's color depth value	32
ip	no	Browser's ip	177.255.255.35
language	no	Browser's language	ru
screen_height	no	Browser's screen height	1080
screen_width	no	Browser's screen width	1920
tz	no	Browser's time zone	180
user_agent	no	Browser's user agent	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:96.0) Gecko/20100101 Firefox/96.0
java_enabled	no	Is java enabled	true
javascript_enabled	no	Is javascript enabled	true
window_width	no	Browser's window width	1920
window_height	no	Browser's bilwindowling height	1080
Recurring data object for payments (optional)
Parameter	Mandatory	Description	Validation
days	no	Customer days object for payments.	Number of days between authorizations from 1
exp_date	no	Customer exd_date object for payments.	Period of validity of periodic payments in format YYYYMMDD
Payments Providers
Code:
Copy

Return status 200 and JSON:
Copy

{
  "success": true | false,
  "errors": [],
  "token": "[payment token]",
  "processingUrl": [
        {
            "webmoney": "http://business.kotulapay.com/p/165998589a413b56ae72fbfdc15b016b/webmoney?locale=en"
        },
        {
            "bank_card": "http://business.kotulapay.com/p/165998589a413b56ae72fbfdc15b016b/bank_card?locale=en"
        },
        {
            "qiwi_wallet": "http://business.kotulapay.com/p/165998589a413b56ae72fbfdc15b016b/qiwi_wallet?locale=en"
        },
        {
            "skrill_wallet": "http://business.kotulapay.com/p/165998589a413b56ae72fbfdc15b016b/skrill_wallet?locale=en"
        }
  ],
  "selectorURL": "https://business.kotulapay.com/select/[payment token]/",
  "payment": {
    "amount": "10020",
    "currency": "CNY",
    "status": "init"
  },
  "redirectRequest": {
    "url": "[redirect url, for example ACS URL for 3ds]",
    "params": {
      "PaReq": "[PaReq for current payment]",
      "TermUrl": "https://business.kotulapay.com/checkout_results/[payment token]/callback_3ds"
    },
    "type": "post"
  }
}
In case multiple payment providers enabled to a merchant account, Create payment reponse JSON will have processingUrl object represented as an array of available payment providers (please refer to JSON response). Use those URLs to redirect your customer to a payment provider (method).

List of payment providers
In case you want a customer to choose a payment provider (method) it might be convenient to use a specific page (widget) with payment provider list, which is availabe by "selectorURL" parameter in JSON response object

List
Code:
Copy

Return status 200 and JSON:
Copy

{
  "success": true | false,
  "errors": [],
  "status": 200,
  "totalCount": 10,
  "curentPage": 1,
  "perPage": 1,
  "totalPage": 10,
  "payments": [
    {
      "id": 1,
      "status": "sent",
      "token": "[payment token]",
      "currency": "CNY",
      "product": "Your Product",
      "redirect_success_url": "https://your-site.com/success",
      "redirect_fail_url": "https://your-site.com/fail",
      "amount": 10000,
      "created_at": "2016-06-27T14:13:00.273Z",
      "updated_at": "2016-06-27T14:15:44.715Z",
      "extra_return_param": "your order id or other info",
      "operation_type": "pay",
      "order_number": 1
    }
  ]
}
Payments List - this is the method used to display the list of returned payments.

HTTP Request via SSL
GET '/api/v1/payments'

Query Parameters
Parameter	Description	Required
dateFrom	Date from (example: '2015-01-01')	No
dateTo	Date to (example: '2015-01-02')	No
page	Page number (default: 1)	No
perPage	Payment per page (max: 500, default: 20)	No
operationType	Operation type (Available values: pays, payouts, all)	No
orderNumber	Merchant's order number	No
Get
Code:
Copy

Return status 200 and JSON:
Copy

{
    "success": true | false,
    "errors": [],
    "status": 200,
    "payment": {
      "id": 2599,
      "status": "pending | approved | declined",
      "token": "[payment token]",
      "currency": "[payment currency]",
      "product": "[product description]",
      "callback_url": "[callback/notification url]",
      "redirect_success_url": "success redirection url",
      "redirect_fail_url": "fail redirection url",
      "amount": 0,
      "created_at": "[creation date]",
      "updated_at": "[last status update date]",
      "extra_return_param": "[extra params, can be use to payment identification in merchat system]",
      "operation_type": "pay | payout",
      "order_number": "[merchant's order number]",
      "commission_data": {
                  "commission_value": 0.0,
                  "commission_fee": 0.0,
                  "commission_amount": 0.0
              }
    }
}
Payment Get - this is the method used to retrieve information about single payment.

HTTP Request via SSL
GET '/api/v1/payments/[payment_token]'

Confirm Two-Step
Code:
Copy

from django.http import HttpResponseRedirect, HttpResponse
import requests
import json

def pay(request) :

    MERCHANT_PRIVATE_KEY = 'merchant_private_key'
    LIVE_URL = 'https://business.kotulapay.com';
    SANDBOX_URL = 'https://business.kotulapay.com'

    payload = {
        "token" : request.POST['token payment']
    }

    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer %s' % (MERCHANT_PRIVATE_KEY)
    }

    resp = requests.post('%s/api/v1/payments/confirm' % (SANDBOX_URL), json=payload, headers=headers)

    if resp.status_code == 200:
        resp_payload = json.loads(resp.text)
        return HttpResponseRedirect(resp_payload['processingUrl'])
    else:
        return HttpResponse('<html><body><span>Something gone wrong: %s</span></body></html>' % (resp.status_code))
Return status 200 and JSON:
Copy

{
  "success": true | false,
  "result": 0,
  "status": 200,
  "payment": {
    "amount": 100,
    "gateway_amount": 100,
    "currency": "USD",
    "status": "approved|declined",
    "two_stage_mode": true
  }
}
Confirm Two-Step payment by providing a payment token.

HTTP Request via SSL
POST '/api/v1/payments/confirm'

Query Parameters
Parameter	Mandatory	Description
token	yes	Payment token.
Decline Two-Step
Code:
Copy

from django.http import HttpResponseRedirect, HttpResponse
import requests
import json

def pay(request) :

    MERCHANT_PRIVATE_KEY = 'merchant_private_key'
    LIVE_URL = 'https://business.kotulapay.com';
    SANDBOX_URL = 'https://business.kotulapay.com'

    payload = {
        "token" : request.POST['token payment']
    }

    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer %s' % (MERCHANT_PRIVATE_KEY)
    }

    resp = requests.post('%s/api/v1/payments/decline' % (SANDBOX_URL), json=payload, headers=headers)

    if resp.status_code == 200:
        resp_payload = json.loads(resp.text)
        return HttpResponseRedirect(resp_payload['processingUrl'])
    else:
        return HttpResponse('<html><body><span>Something gone wrong: %s</span></body></html>' % (resp.status_code))
Return status 200 and JSON:
Copy

{
  "success": true | false,
  "result": 0,
  "status": 200,
  "payment": {
    "amount": 100,
    "gateway_amount": 100,
    "currency": "USD",
    "status": "approved|declined",
    "two_stage_mode": true
  }
}
Decline Two-Step payment by providing a payment token.

HTTP Request via SSL
POST '/api/v1/payments/decline'

Query Parameters
Parameter	Mandatory	Description
token	yes	Payment token.
Get/Order
Code:
Copy

Return status 200 and JSON:
Copy

{
    "success":  true | false,
    "result": 0,
    "status": 200,
    "totalCount": 1,
    "curentPage": 1,
    "perPage": 100,
    "totalPage": 1,
    "payments": [
        {
            "id": 123,
            "status": "pending | approved | declined | expired",
            "token": "[payment token]",
            "currency": "[payment currency]",
            "product": "[payment currency]",
            "callback_url": "[callback/notification url]",
            "redirect_success_url": "success redirection url",
            "redirect_fail_url": "fail redirection url",
            "amount": 100,
            "created_at": "[creation date]",
            "updated_at": "[last status update date]",
            "extra_return_param": "[extra params, can be use to payment identification in merchant system]",
            "operation_type": "pay | payout",
            "order_number": "[merchant's order number]"
        }
    ]
}
Payment Get/Order - this is the method used to retrieve information about payments by order_number.

HTTP Request via SSL
GET '/api/v1/payments/order/[order_number]'

Otp
Code:
Copy

Return status 200 and JSON:
Copy

{
    "success": true | false,
    "errors": [],
    "status": 200
}
Otp - this is the method used to confirm mobile payment.

HTTP Request via SSL
POST '/api/v1/otp'

Query Parameters
Parameter	Mandatory	Description	Validation
token	yes	Payment token	
otp	yes	Otp code	
Otp resend
Code:
Copy

Return status 200 and JSON:
Copy

{
    "success": true | false,
    "errors": [],
    "status": 200
}
Otp resend - this is the method used to resend the OTP code.

HTTP Request via SSL
GET '/api/v1/otp-resend'

Refunds
Kotulapay refunds processing REST API.

Create refund
Code:
Copy

from django.http import HttpResponseRedirect, HttpResponse
import requests
import json

def pay(request) :

    MERCHANT_PRIVATE_KEY = 'merchant_private_key'
    LIVE_URL = 'https://business.kotulapay.com';
    SANDBOX_URL = 'https://business.kotulapay.com'

    payload = {
        "token" : request.POST['token payment'],
    "amount": 100
    }

    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer %s' % (MERCHANT_PRIVATE_KEY)
    }

    resp = requests.post('%s/api/v1/refunds' % (SANDBOX_URL), json=payload, headers=headers)

    if resp.status_code == 200:
        resp_payload = json.loads(resp.text)
        return HttpResponseRedirect(resp_payload['processingUrl'])
    else:
        return HttpResponse('<html><body><span>Something gone wrong: %s</span></body></html>' % (resp.status_code))
Return status 200 and JSON:
Copy

{
  "success": true | false,
  "errors": [],
  "token": "[payment token]",
  "processingUrl": "https://business.kotulapay.com/p/[payment token]",
  "refund": {
    "token": "3a1a4fc8f975eb022a1c0ddb3abcded9",
    "amount": "10020",
    "currency": "USD",
    "status": "approved|declined"
  }
}
Create refunds by providing a payment token.

HTTP Request via SSL
POST '/api/v1/refunds'

Query Parameters
Parameter	Mandatory	Description
token	yes	Payment token.
amount	no	Refund amount in cents.
Payouts
Transferring money from a business account to a client account.

Make a payout
Code:
Copy

from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse, HttpResponseNotFound
from django.views.decorators.csrf import csrf_exempt
import requests
import json

def payout(request) :

    MERCHANT_PRIVATE_KEY = 'your-merchant-private-key'
    LIVE_URL = 'https://business.kotulapay.com';
    SANDBOX_URL = 'https://business.kotulapay.com'

    payload = {
        "amount" : 10000,
        "currency" : "EUR",
        "orderNumber": "10001",
        "card": {
            "pan" : "4276111152393643",
            "expires" : "08/2022"
        },

        "customer": {
            "first_name" : "Mike",
            "last_name" : "Green",
            "email" : "test@kotulapay.com",
            "address" : "test test",
            "ip" : "1.1.1.1"
        }
    }

    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer %s' % (MERCHANT_PRIVATE_KEY)
    }

    resp = requests.post('%s/api/v1/payouts' % (SANDBOX_URL), json=payload, headers=headers)

    if resp.status_code == 200:
        resp_o = json.loads(resp.text)
        return HttpResponseRedirect(resp_o['status'])
    else:
        return HttpResponse('<html><body><span>Something gone wrong: %s</span> : %s</body></html>' % (resp.status_code, resp.text))
Return status 200 and JSON:
Copy

{
  "success": true | false,
  "errors": [],
  "payout": {
      "token": "[payment token]",
      "status": "[payment status]",
      "timestamp": "2016-06-09T03:46:45Z"
  }
}
Create a payout operation.

HTTP Request via SSL
POST '/api/v1/payouts'

Query Parameters
Parameter	Mandatory	Description
amount	yes	Payment amount in minimal values as of; USD and EUR / Cents, for JPY / Yen, for CNY / Fen.
currency	yes	Currency code (CNY, EUR, USD, JPY)
orderNumber	yes	Kotulapay's client inner order number
card	yes	Card object for Host2Host payouts.
customer	yes	Customer object for Host2Host payouts.
Card Payout Object Parameters
Parameter	Mandatory	Description
pan	yes	Customer’s card number (PAN). Any valid card number, may contain spaces
expires	yes	Customer’s card expiration date. Format: mm/yyyy
Customer Object Parameters (optional)
Parameter	Mandatory	Description
email	yes	Customer’s email, is mandatory if Customer object posted on a request
address	no	Customer's billing address in the full format like "725 5th Ave, New York, NY 10022, United States"
ip	yes	Customer IP address
first_name	no	Customer name
last_name	no	Customer surname
Providers
Code:
Copy

from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse, HttpResponseNotFound
from django.views.decorators.csrf import csrf_exempt
import requests
import json

def payout(request) :

    MERCHANT_PRIVATE_KEY = 'your-merchant-private-key'
    LIVE_URL = 'https://business.kotulapay.com';
    SANDBOX_URL = 'https://business.kotulapay.com'

    payload = {
        "amount" : 10000,
        "currency" : "EUR",
        "orderNumber": "10001",
        "card": {
            "pan" : "4276111152393643",
            "expires" : "08/2022"
        },

        "customer": {
            "first_name" : "Mike",
            "last_name" : "Green",
            "email" : "test@kotulapay.com",
            "address" : "test test",
            "ip" : "1.1.1.1"
        }
    }

    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer %s' % (MERCHANT_PRIVATE_KEY)
    }

    resp = requests.post('%s/api/v1/payouts' % (SANDBOX_URL), json=payload, headers=headers)

    if resp.status_code == 200:
        resp_o = json.loads(resp.text)
        return HttpResponseRedirect(resp_o['status'])
    else:
        return HttpResponse('<html><body><span>Something gone wrong: %s</span> : %s</body></html>' % (resp.status_code, resp.text))
Return status 200 and JSON:
Copy

{
  "success": true | false,
  "errors": [],
  "token": "[payment token]",
  "processingUrl": [
        {
            "webmoney": "http://business.kotulapay.com/pout/165998589a413b56ae72fbfdc15b016b/webmoney?locale=en"
        },
        {
            "bank_card": "http://business.kotulapay.com/pout/165998589a413b56ae72fbfdc15b016b/bank_card?locale=en"
        },
        {
            "qiwi_wallet": "http://business.kotulapay.com/pout/165998589a413b56ae72fbfdc15b016b/qiwi_wallet?locale=en"
        },
        {
            "skrill_wallet": "http://business.kotulapay.com/pout/165998589a413b56ae72fbfdc15b016b/skrill_wallet?locale=en"
        }
  ],
  "selectorURL": "https://business.kotulapay.com/select/pout/[payment token]/",
  "payment": {
    "amount": "10020",
    "currency": "CNY",
    "status": "init"
  }
}
In case multiple payout providers enabled to a merchant account, Create payout reponse JSON will have processingUrl object represented as an array of available payout providers (please refer to JSON response). Use those URLs to redirect your customer to a payout provider (method).

List of payout providers
In case you want a customer to choose a payout provider (method) it might be convenient to use a specific page (widget) with payout provider list, which is availabe by "selectorURL" parameter in JSON response object

P2P
Kotulapay p2p payment processing REST API.

Payment
Code:
Copy

from django.http import HttpResponseRedirect, HttpResponse
import requests
import json

def pay(request) :

    MERCHANT_PRIVATE_KEY = 'merchant_private_key'
    LIVE_URL = 'https://business.kotulapay.com';
    SANDBOX_URL = 'https://business.kotulapay.com'

    payload = {
      "product": "Tests",
      "amount": 100300,
      "currency": "RUB",
      "callbackUrl": "https://test.com",
      "redirectSuccessUrl": "https://success.test.com/",
      "redirectFailUrl": "https://declined.test.com/",
      "bank_account": {
          "bank_name": "sber",
          "requisite_type": "sbp/card/account/link"
      },
      "customer": {
          "email": "test@test.com",
          "ip": "178.175.50.34"
      }
    }

    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer %s' % (MERCHANT_PRIVATE_KEY)
    }

    resp = requests.post('%s/api/v1/payments' % (SANDBOX_URL), json=payload, headers=headers)

    if resp.status_code == 200:
        resp_payload = json.loads(resp.text)
        return HttpResponseRedirect(resp_payload['processingUrl'])
    else:
        return HttpResponse('<html><body><span>Something gone wrong: %s</span></body></html>' % (resp.status_code))
Return status 200 and JSON:
Copy

{
    "success": true,
    "result": 0,
    "status": 200,
    "token": "K9doc43HAPnqSuGdvN5RMX42tE54331",
    "processingUrl": [
        {
            "trader": "https://business.kotulapay.com/p/K9doc43HAPnqSuGdvN5RMX42tE54331?..."
        }
    ],
    "selectorUrl": "https://business.kotulapay.com/select/K9doc43HAPnqSuGdvN5RMX42tE54331?...",
    "payment": {
        "amount": 1000,
        "gateway_amount": 1000,
        "currency": "RUB",
        "status": "init",
        "two_stage_mode": false,
        "commission": 0
    }
}
Initialize payments - to begin receiving payments, you must first call using the following script. This will enable you to obtain a payment token, which will be required later to complete API integration. Use redirect/GET to processingUrl after request.

HTTP Request via SSL
POST '/api/v1/payments'

Query Parameters
Parameter	Mandatory	Description	Validation
product	yes	Product name (Service description) (example: 'iPhone').	minLength: 5, maxLength: 255
amount	yes	Payment amount in cents (10020), except JPY	minLength: 1, maxLength: 32
currency	yes	Currency code (CNY, EUR, USD, JPY).	minLength: 3, maxLength: 3
callbackUrl	yes	The server URL a merchant will be notified about a payment finalisation	Valid URI format
redirectSuccessUrl	no	The URL a customer will be redirected to in the case of successfull payment	Valid URI format
redirectFailUrl	no	The URL a customer will be redirected to in the case of payment error or failure	Valid URI format
extraReturnParam	no	Bank/Payment method list, description, etc	minLength: 1, maxLength: 1024
orderNumber	no	The current order number from a company system.	minLength: 3, maxLength: 255 (string)
locale	no	The locale is used on a payment page by default. Currently supported locales: en, zh and jp from ISO 639-1.	minLength: 2, maxLength: 5 (string)
bank_account	no	Bank details object for p2p payments.	
customer	yes	Customer object for Host2Host payments.	
Bank account Payment Object Parameters
Parameter	Mandatory	Description
bank_name	no	Customer bank name: sberbank/tbank/raiffeisen/uralsib/alfabank/sovcombank/humo/uzcard
requisite_type	no	Requisite type for payment: sbp/card/account/link
Customer Object Parameters (optional)
Parameter	Mandatory	Description	Validation
email	yes	Customer’s email, is mandatory if Customer object posted on a request	Valid email format
ip	no	Customer IP address	Valid IP address format (XX.XX.XX.XX)
Payout Card
Code:
Copy

from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse, HttpResponseNotFound
from django.views.decorators.csrf import csrf_exempt
import requests
import json

def payout(request) :

    MERCHANT_PRIVATE_KEY = 'your-merchant-private-key'
    LIVE_URL = 'https://business.kotulapay.com';
    SANDBOX_URL = 'https://business.kotulapay.com'

    payload = {
        "amount" : 1000,
        "currency" : "RUB",
        "orderNumber": "10001",
        "callbackUrl": "https://test.com",
        "bank_account": {
            "bank_name": "sber",
            "requisite_type": "card"
        },
        "card": {
            "pan": "4627342642639018"
        },
        "customer": {
            "email": "test@test.com",
            "ip": "178.175.20.33",
            "first_name": "Иванов",
            "last_name": "Иван",
            "middle_name": "Иванович",
            "phone": "79998889900"
        }
    }

    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer %s' % (MERCHANT_PRIVATE_KEY)
    }

    resp = requests.post('%s/api/v1/payouts' % (SANDBOX_URL), json=payload, headers=headers)

    if resp.status_code == 200:
        resp_o = json.loads(resp.text)
        return HttpResponseRedirect(resp_o['status'])
    else:
        return HttpResponse('<html><body><span>Something gone wrong: %s</span> : %s</body></html>' % (resp.status_code, resp.text))
Return status 200 and JSON:
Copy

{
    "success": true,
    "result": 0,
    "status": 200,
    "token": "c3452f792233e43aeaa819c68766043",
    "processingUrl": [
        {
            "trader": "https://business.kotulapay.com/payout/..."
        }
    ],
    "selectorUrl": "https://business.kotulapay.com/select/payout/c3452f792233e43aeaa819c68766043",
    "payment": {
        "amount": 30000,
        "currency": "RUB",
        "gateway_amount": 30000,
        "gateway_currency": "RUB",
        "status": "init"
    }
}

Create a payout operation. Use GET to processingUrl after request.

HTTP Request via SSL
POST '/api/v1/payouts'

Query Parameters
Parameter	Mandatory	Description
amount	yes	Payment amount in minimal values. ex: 123 RUB = 1.23 RUB.
currency	yes	Currency code
orderNumber	yes	Kotulapay's client inner order number
callbackUrl	no	merchat notification url
bank_account	yes	Bank details object for p2p payouts.
card	yes	Card object for card p2p payouts.
customer	yes	Customer object for payouts.
Card Payout Object Parameters
Parameter	Mandatory	Description
pan	yes	Customer’s card number (PAN). Any valid card number
Bank account Payout Object Parameters
Parameter	Mandatory	Description
bank_name	no	Customer bank name: sberbank/tbank/raiffeisen/uralsib/alfabank/sovcombank/humo/uzcard
requisite_type	yes	card
Customer Object Parameters
Parameter	Mandatory	Description
email	yes	Valid email format
ip	yes	Customer IP address
first_name	no	Customer name
last_name	no	Customer surname
middle_name	no	Customer middle name
phone	no	Customer phone for sbp
Payout SBP
Code:
Copy

from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse, HttpResponseNotFound
from django.views.decorators.csrf import csrf_exempt
import requests
import json

def payout(request) :

    MERCHANT_PRIVATE_KEY = 'your-merchant-private-key'
    LIVE_URL = 'https://business.kotulapay.com';
    SANDBOX_URL = 'https://business.kotulapay.com'

    payload = {
        "amount" : 1000,
        "currency" : "RUB",
        "orderNumber": "10001",
        "callbackUrl": "https://test.com",
        "bank_account": {
            "bank_name": "sber",
            "requisite_type": "sbp"
        },
        "customer": {
            "email": "test@test.com",
            "ip": "178.175.20.33",
            "first_name": "Иванов",
            "last_name": "Иван",
            "middle_name": "Иванович",
            "phone": "79998889900"
        }
    }

    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer %s' % (MERCHANT_PRIVATE_KEY)
    }

    resp = requests.post('%s/api/v1/payouts' % (SANDBOX_URL), json=payload, headers=headers)

    if resp.status_code == 200:
        resp_o = json.loads(resp.text)
        return HttpResponseRedirect(resp_o['status'])
    else:
        return HttpResponse('<html><body><span>Something gone wrong: %s</span> : %s</body></html>' % (resp.status_code, resp.text))
Return status 200 and JSON:
Copy

{
    "success": true,
    "result": 0,
    "status": 200,
    "token": "c3452f792233e43aeaa819c68766043",
    "processingUrl": [
        {
            "trader": "https://business.kotulapay.com/payout/..."
        }
    ],
    "selectorUrl": "https://business.kotulapay.com/select/payout/c3452f792233e43aeaa819c68766043",
    "payment": {
        "amount": 30000,
        "currency": "RUB",
        "gateway_amount": 30000,
        "gateway_currency": "RUB",
        "status": "init"
    }
}

Create a payout operation. Use GET to processingUrl after request.

HTTP Request via SSL
POST '/api/v1/payouts'

Query Parameters
Parameter	Mandatory	Description
amount	yes	Payment amount in minimal values. ex: 123 RUB = 1.23 RUB.
currency	yes	Currency code
orderNumber	yes	Kotulapay's client inner order number
callbackUrl	no	merchat notification url
bank_account	yes	Bank details object for p2p payouts.
customer	yes	Customer object for payouts.
Bank account Payout Object Parameters
Parameter	Mandatory	Description
bank_name	yes	Customer bank name: sberbank/tbank/raiffeisen/uralsib/alfabank/sovcombank/humo/uzcard
requisite_type	yes	sbp
Customer Object Parameters
Parameter	Mandatory	Description
email	yes	Valid email format
ip	yes	Customer IP address
first_name	no	Customer name
last_name	no	Customer surname
middle_name	no	Customer middle name
phone	yes	Customer phone for sbp
Payout Account
Code:
Copy

from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse, HttpResponseNotFound
from django.views.decorators.csrf import csrf_exempt
import requests
import json

def payout(request) :

    MERCHANT_PRIVATE_KEY = 'your-merchant-private-key'
    LIVE_URL = 'https://business.kotulapay.com';
    SANDBOX_URL = 'https://business.kotulapay.com'

    payload = {
        "amount" : 1000,
        "currency" : "RUB",
        "orderNumber": "10001",
        "callbackUrl": "https://test.com",
        "bank_account": {
            "bank_name": "sber",
            "requisite_type": "account",
            "account_number": "1234567891123456"
        },
        "customer": {
            "email": "test@test.com",
            "ip": "178.175.20.33",
            "first_name": "Иванов",
            "last_name": "Иван",
            "middle_name": "Иванович",
            "phone": "79998889900"
        }
    }

    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer %s' % (MERCHANT_PRIVATE_KEY)
    }

    resp = requests.post('%s/api/v1/payouts' % (SANDBOX_URL), json=payload, headers=headers)

    if resp.status_code == 200:
        resp_o = json.loads(resp.text)
        return HttpResponseRedirect(resp_o['status'])
    else:
        return HttpResponse('<html><body><span>Something gone wrong: %s</span> : %s</body></html>' % (resp.status_code, resp.text))
Return status 200 and JSON:
Copy

{
    "success": true,
    "result": 0,
    "status": 200,
    "token": "c3452f792233e43aeaa819c68766043",
    "processingUrl": [
        {
            "trader": "https://business.kotulapay.com/payout/..."
        }
    ],
    "selectorUrl": "https://business.kotulapay.com/select/payout/c3452f792233e43aeaa819c68766043",
    "payment": {
        "amount": 30000,
        "currency": "RUB",
        "gateway_amount": 30000,
        "gateway_currency": "RUB",
        "status": "init"
    }
}

Create a payout operation. Use GET to processingUrl after request.

HTTP Request via SSL
POST '/api/v1/payouts'

Query Parameters
Parameter	Mandatory	Description
amount	yes	Payment amount in minimal values. ex: 123 RUB = 1.23 RUB.
currency	yes	Currency code
orderNumber	yes	Kotulapay's client inner order number
callbackUrl	no	merchat notification url
bank_account	yes	Bank details object for p2p payouts.
customer	yes	Customer object for payouts.
Bank account Payout Object Parameters
Parameter	Mandatory	Description
bank_name	yes	Customer bank name: sberbank/tbank/raiffeisen/uralsib/alfabank/sovcombank/humo/uzcard
account_number	yes	Customer’s account number. Any valid account number
requisite_type	yes	account
Customer Object Parameters
Parameter	Mandatory	Description
email	yes	Valid email format
ip	yes	Customer IP address
first_name	no	Customer name
last_name	no	Customer surname
middle_name	no	Customer middle name
phone	no	Customer phone for sbp
Balance
Request current Kotulapay balance.

Receive Balance
Code:
Copy

from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse, HttpResponseNotFound
from django.views.decorators.csrf import csrf_exempt
import requests
import json

def balance(request) :

    MERCHANT_PRIVATE_KEY = 'merchant_private_key'
    LIVE_URL = 'https://business.kotulapay.com';
    SANDBOX_URL = 'https://business.kotulapay.com'

    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer %s' % (MERCHANT_PRIVATE_KEY)
    }
    resp = requests.get('%s/api/v1/balance' % (SANDBOX_URL), params = {'currency':'CNY'}, headers=headers)

    if resp.success:
        resp_o = json.loads(resp.text)
        return HttpResponse('<html><body><span>Your balance %s</body></html>' % (resp_o['wallet']['available']))
    else:
        return HttpResponse('<html><body><span>Something gone wrong: %s</span> : %s</body></html>' % (resp.status_code, resp.text))

Return status 200 and JSON:
Copy

{
  "success": true | false,
  "result": 0,
  "status": 200,
  "errors": [],
  "wallet": {
    "available": 0,
    "hold": 0,
    "currency": "CNY"
  }
}
Receiving the balance for a business account. Balance is returned as an object displaying available and pending amounts. Balances shown may be not be released and/or processed.

The `errors` field may not be present in the response
HTTP Request via SSL
GET '/api/v1/balance'

Query Parameters
Parameter	Description
currency	Currency code (CNY)
Disputes
Request current Kotulapay dispute list.

Dispute list
Code:
Copy

from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse, HttpResponseNotFound
from django.views.decorators.csrf import csrf_exempt
import requests
import json

def disputes(request) :

    MERCHANT_PRIVATE_KEY = 'merchant_private_key'
    LIVE_URL = 'https://business.kotulapay.com';
    SANDBOX_URL = 'https://business.kotulapay.com'

    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer %s' % (MERCHANT_PRIVATE_KEY)
    }
    resp = requests.get('%s/api/v1/disputes' % (SANDBOX_URL), headers=headers)

Return status 200 and JSON:
Copy

{
    "success": true,
    "status": 200,
    "disputes": [
        {
            "id": 27,
            "amount": 2,
            "currency": "USD",
            "investigation_report": null,
            "status": "processing",
            "merchant_profile_id": 3,
            "user_profile_id": 3,
            "feed_id": 330,
            "created_at": "2019-09-13T08:46:21.302Z",
            "updated_at": "2019-09-13T08:46:21.343Z",
            "dispute_type": 2,
            "reason_code": "123",
            "comment": "some comment"
        }
    ]
}
Getting a list of last disputes for a business account.

HTTP Request via SSL
GET '/api/v1/disputes'

Query Parameters
Returns 100 latest records

Parameter	Mandatory	Description
status	no	Dispute status for filter [approved/pending/declined]
date	no	Date for filter
requisite	no	Requisite for filter
device	no	Device for filter
Create a dispute
Code:
Copy

from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse, HttpResponseNotFound
from django.views.decorators.csrf import csrf_exempt
import requests
import json

def payout(request) :

    MERCHANT_PRIVATE_KEY = 'your-merchant-private-key'
    LIVE_URL = 'https://business.kotulapay.com';
    SANDBOX_URL = 'https://business.kotulapay.com'

    payload = {
        "token" : "XsKkj4kmSjNATwoJdoiwwCmEKbT5efZX",
        "description" : "test description",
        "document": ""/home/test/Pictures/Screenshot from 2024-04-12 17-38-19.png""
    }

    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer %s' % (MERCHANT_PRIVATE_KEY)
    }

    resp = requests.post('%s/api/v1/disputes' % (SANDBOX_URL), json=payload, headers=headers)

    if resp.status_code == 200:
        resp_o = json.loads(resp.text)
        return HttpResponseRedirect(resp_o['status'])
    else:
        return HttpResponse('<html><body><span>Something gone wrong: %s</span> : %s</body></html>' % (resp.status_code, resp.text))
Return status 200 and JSON:
Copy

{
  "success": true | false,
  "result": 0,
  "status": 200
}
Create a dispute.

HTTP Request via SSL
POST '/api/v1/disputes'

Query Parameters
Parameter	Mandatory	Description
token	yes	Payment token
description	yes	Description for dispute
document	yes	Payment receipt for dispute
amount	no	Amount for dispute
Notifications
Notifications with the payment or payout status are sent to your callback URL using POST methods. In case payment or payout status changed (pending/approved/declined) -- notification type is sent accordingly.

Code:
Copy

from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponseRedirect, HttpResponse, HttpResponseNotFound

@csrf_exempt
def notifyme(request) :
    req_o = json.loads(request.read());
    return HttpResponse('Status is:%s' % (req_o['status']))
Params:
Copy

{

  "token": "payment token",
  "type": "payment type: payment | payout",
  "status" : "payment status: pending | approved | declined ",
  "extraReturnParam" : "extra params",
  "orderNumber" : "merchant order number",
  "walletToken": "payer's Kotulapay wallet unique identifier, only for reactivepay payments",
  "recurringToken": "payer's previously initialized recurring token, for making recurrent payment repeatedly",
  "sanitizedMask": "payer's sanitized card, if it was provided",
  "amount": "payment amount in cents",
  "currency": "payment currency",
  "gatewayAmount": "exchanged amount in cents",
  "gatewayCurrency": "exchanged currency"
}
`callback` can be configured in the company's back office.
We define a notification as “successfully being sent” only in the case that your server responded with a 200 HTTP status code. If your server responded any error codes, we schedule recursive callbacks within a 1 hour interval, but not more than 9 times.
Banking notifications
Notifications with the account or transfer status are sent to your callback URL using POST methods. In case account status's changed notification will be sent accordingly.

Code:
Copy

from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponseRedirect, HttpResponse, HttpResponseNotFound

@csrf_exempt
def notifyme(request) :
    req_o = json.loads(request.read());
    return HttpResponse('Status is:%s' % (req_o['status']))
Params:
Copy

{
  "subject": "account | transfer | compliance",
  "token": "transfer token | profile token",
  "status": "approved | pending | declined",
  "message" : "any comments from the system operator",
  "data" : {
      "account": {
          "number" : "IBAN or account number",
          "swift" : "valid SWIFT code"
      }, //or
      "transfer": {
            "token": "payment token",
            "updated-at": "2020-01-01 00:00:01",
            "created-at": "2020-01-01 00:00:00",
            "status": "pending",
            "name_from": "Mike Z.",
            "name_to": "Johny Depp",
            "operation_type": "payout",
            "payload": {
                "amount": "10000",
                "currency": "USD",
                "account_from": "account number",
                "account_to": "account number"
            },
            "bank_info": {
                "ref_number": "bank ref number",
                "extra_data": "some bank data"
            }
      }, //or
      "compliance": {
          "compliance_status":"documents_required | pending | approved  | declined"
      }
  }
}
`callback` can be configured in the company's back office or sent as a value of callback_url parameter.
We define a notification as “successfully being sent” only in the case that your server responded with a 200 HTTP status code. If your server responded any error codes, we schedule recursive callbacks within a 1 hour interval, but not more than 9 times.
Dictionaries
Errors
If any method failed, the JSON response with status code 403/502 returned that specified the problem.

Return status 403 and JSON:
Copy

{'success': false, 'result': 1, 'status': 403, 'errors': [{'code': 'merchant_not_found', 'kind': 'api_error'}]}

{'success': false, 'result': 1, 'status': 403, 'errors': [{'code': 'user_not_found', 'kind': 'api_error'}]}

{'success': false, 'result': 1, 'status': 502, 'errors': [{'code': 'fetch_processing_url_error', 'kind': 'api_error'}]}

{'success': false, 'result': 1, 'status': 502, 'errors': [{'code': 'invalid_json', 'kind': 'api_error'}]}

{'success': false, 'result': 1, 'status': 403, 'errors': [{'code': 'balance_less_than_amount', 'kind': 'processing_error'}]}

{'success': false, 'result': 1, 'status': 403, 'errors': [{'code': 'absent_keys:pay/payout', 'kind': 'settings_error'}]}

{'success': false, 'result': 1, 'status': 403, 'errors': [{'code': 'absent_keys:currency', 'kind': 'settings_error'}]}

{'success': false, 'result': 1, 'status': 403, 'errors': [{'code': 'auth_header_not_found', 'kind': 'authentication_error'}]}

{'success': false, 'result': 1, 'status': 403, 'errors': [{'code': 'unknown_auth_header', 'kind': 'authentication_error'}]}

{'success': false, 'result': 1, 'status': 403, 'errors': [{'code': 'amount_less_than_minimum', 'kind': 'invalid_request_error'}]}

{'success': false, 'result': 1, 'status': 403, 'errors': [{'code': 'customer_email_not_found', 'kind': 'invalid_request_error'}]}

{'success': false, 'result': 1, 'status': 403, 'errors': [{'code': 'absent_host2host_mode', 'kind': 'invalid_request_error'}]}

{'success': false, 'result': 1, 'status': 403, 'errors': [{'code': 'payment_in_final_state', 'kind': 'invalid_request_error'}]}

{'success': false, 'result': 1, 'status': 403, 'errors': [{'code': 'payment_not_found', 'kind': 'invalid_request_error'}]}

{'success': false, 'result': 1, 'status': 403, 'errors': [{'code': 'settings_are_absent', 'kind': 'invalid_request_error'}]}
Payment states
State	Final	Description
init	no	Request to API will initiate payments.
pending	no	User redirected to the ReactivePay Checkout facility during processing.
approved	yes	Successfully completed payment.
declined	yes	Unsuccessful payment.
expired	no	The transaction has expired due to timeout but may still be processed.
Kinds of errors
Kind	Description
api_error	Indicate rare occasions such as an ReactivePay API server technicality.
authentication_error	Authentication request failure.
invalid_request_error	Invalid parameters which produce invalid requests.
processing_error	Processing the payment generated an error.
settings_error	Incorrect settings.
gateway_error	Gateway responded with an error.
http_error	HTTP/HTTPS error.
Codes of errors
Api errors
State	Final	Description
merchant_not_found	yes	No merchant found with this token.
fetch_processing_url_error	no	Failed to fetch processing URL.
invalid_json	no	Invalid JSON from provider.
user_not_found	yes	No information found about the merchant with merchant_private_key.
card_token_is_blank	no	Card token is blank.
payment_already_has_pending_dispute	yes	Payment already has a pending dispute.
content_type_not_allowed	no	Request content_type not allowed.
requisite_not_found	yes	Required requisite not found.
action_skipped_due_to_debounce	no	Action skipped due to debounce.
core_api_error	no	Core API returned error.
no_route_match	yes	No route match for request.
order_number_already_exists	yes	Repeating an order of already identified order number.
Settings errors
State	Final	Description
absent_keys:pay/payout	no	Absent pay or payout key.
absent_keys:currency	no	Absent or incorrect currency value.
settings_are_absent	yes	Absent settings.
settings_for_placeholder_are_absent	yes	Settings for <...> are absent (placeholder for provider-specific key).
Authentication errors
State	Final	Description
auth_header_not_found	no	Absent Authorization key.
unknown_auth_header	no	Unknown or invalid Authorization header.
incorrect_private_key	no	The current private key cannot identify the user.
Invalid request errors
State	Final	Description
amount_less_than_minimum	no	Minimum payout amount has not been requested.
customer_email_not_found	no	Absent customer email.
absent_host2host_mode	no	Absent allow_host2host=true in settings when making request without card.
payment_in_final_state	yes	Payment has final status.
payment_not_found	yes	Payment not found.
token_description_document_are_required	no	Required params [:token, :description, :document] are missing.
filtered_traders_is_missing	no	Required param filtered_traders is missing.
bank_name_is_not_valid_choice	no	bank_name value not in allowed list.
Processing errors
State	Final	Description
balance_less_than_amount	no	Payout cannot be completed due to insufficient funds.
cant_create_dispute	yes	Cannot create dispute.
amount_no_money	yes	Insufficient funds.
no_money_available_on_refund	yes	No money available on refund.
commission_not_received	yes	Commission not received.
incorrect_amount	no	Absent or incorrect amount value.
Gateway errors
State	Final	Description
gateway_response_error: error	no	General gateway error.
gateway_response_error: unsupported_traffic	yes	Unsupported traffic type by gateway.
gateway_response_error: type_pay_card_is_not_a_valid_choice	yes	Invalid value for type_pay / card choice.
gateway_response_error: not_found_rate	yes	Rate not found in gateway.
gateway_response_error: trader_not_found	yes	Trader not found in gateway.
gateway_response_error: change_of_amount_is_not_supported	yes	Change of amount not supported by gateway.
HTTP errors
State	Final	Description
http_422_filtered_traders_is_missing	no	422 response: filtered_traders is missing.
http_422_bank_name_is_not_in_allowed_list	no	422 response: bank_name not in allowed list.
Operators
Operator
Code:
Copy

from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse, HttpResponseNotFound
from django.views.decorators.csrf import csrf_exempt
import requests
import json

def operator(request) :

    MERCHANT_PRIVATE_KEY = 'merchant-private-key'
    LIVE_URL = 'https://business.kotulapay.com';
    SANDBOX_URL = 'https://business.kotulapay.com'

    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer %s' % (MERCHANT_PRIVATE_KEY)
    }
    resp = requests.get('%s/api/v1/operator?phone=77775415544' % (SANDBOX_URL), headers=headers)

Return status 200 and JSON:
Copy

{
  "success": true | false,
  "status": 200,
  "operator": "beeline"
}
Return operator by phone

HTTP Request via SSL
GET '/api/v1/operator'

Query Parameters
Parameter	Mandatory	Description
phone	yes	Phone number.
Gateway.Connect
This document describes the structure and function of gateway.connect integration settings for H2H (Host-to-Host) and P2P (Peer-to-Peer) payments. These settings govern parameter formatting, define permitted fields, and specify behavior for each payment method

H2H: Flow of Payments
payment flow

H2H: Diagram of Payment Flow
payment flow

H2H: Required Endpoints
The external service must respond to the following endpoints:

Path	Method	Description
/pay	POST	Payment initiation
/payout	POST	Payout
/refund	POST	Refund
/status	POST	Transaction status
/confirm_secure_code	POST	3DS confirmation
/resend_otp	POST	OTP confirmation
/next_payment_step	POST	Additional async steps in 3DS
H2H: Payment
Request structure.

The params object contains the following keys:

settings: general gateway or environment settings
params: payment method data (e.g. cardholder info, browser data, etc.)
payment: payment-specific information (amount, currency, redirect URLs, token)
processing_url: internal redirect URL after 3DS
callback_url: URL where the payment result callback will be sent
callback_3ds_url: 3DS-specific callback URL after challenge or fingerprinting
method_name: action to be performed (e.g. "pay")
{
  "settings": {
    "sandbox": true
  },
  "params": {
    "pan": "4392963203551251",
    "expires": "08/2025",
    "holder": "John Doe",
    "cvv": "196",
    "email": "50-18@gmail.com",
    "country": "AU",
    "city": "Transmetropolitan",
    "state": "AU",
    "phone": "+77022579074",
    "browser": {
      "accept_header": "application/json, text/plain, */*",
      "color_depth": "32",
      "ip": "109.48.0.1",
      "language": "us-US",
      "screen_height": "1080",
      "screen_width": "1920",
      "tz": "-180",
      "user_agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:92.0)",
      "java_enabled": "true",
      "window_width": "1240",
      "window_height": "560"
    },
    "first_name": "Test",
    "last_name": "Test2",
    "extra_return_param": "_blank_"
  },
  "payment": {
    "redirect_success_url": "https://success.com/?token=4gbk3dVf8QbdVp7KWCbKvHtgfXKtSWCk&type=pay&status=approve...",
    "redirect_fail_url": "https://declined.com/?token=4gbk3dVf8QbdVp7KWCbKvHtgfXKtSWCk&type=pay&status=declined...",
    "token": "4gbk3dVf8QbdVp7KWCbKvHtgfXKtSWCk",
    "gateway_amount": 100000,
    "gateway_currency": "EUR"
  },
  "processing_url": "http://business:4000/checkout_results/<token>/processing",
  "callback_url": "http://business:4000/callbacks/v2/gateway_callbacks/<token>",
  "callback_3ds_url": "http://business:4000/checkout_results/<token>/callback_3ds",
  "method_name": "pay"
}
Available parameter fields
Below is a list of possible parameters and their results that may be suitable for an external application.

Field	Type	Description
pan	String	Card PAN
expires	String	Card expiration date
holder	String	Card holder name
cvv	String	Card CVV code
email	String	Customer email
country	String	Customer country
city	String	Customer city
state	String	Customer state
postcode	String	Customer postal code
street	String	Customer street address
address	String	Customer address
region	String	Customer region
phone	String	Customer phone number
otp	String	One-time password
pin	String	Personal identification number
bank_code	String	Bank code
bank_account_number	String	Bank account number
identify_type	String	Identification type
identify_number	String	Identification number
recurring	Boolean	Recurring payment flag
need_confirmation	Boolean	Confirmation requirement
browser	Object	Browser data (JSON object)
country_code	String	Customer country code
first_name	String	Customer first name
father_name	String	Customer father's name
last_name	String	Customer last name
website	String	Customer website
birthday	String	Customer birthday
state	String	Customer state
recurring_data	Object	Recurring payment data
pending_url	String	URL for pending payments
extra_return_param	String	Extra return parameter
Available payment fields
Field	Type	Description
id	Integer	Payment ID (we don't use it field)
status	String	Payment status
token	String	Internal payment token
currency	String	Origin payment currency
product	String	Product name
callback_url	String	Merchant callback URL
redirect_success_url	String	URL for successful payment redirect
redirect_fail_url	String	URL for failed payment redirect
redirect_request	String	URL for redirect request (non used)
merchant_private_key	String	Private key for Merchant record
amount	Integer	Payment amount
gatewayable_type	String	Name of gateway (e.g., `Gateway::TestpayPayment)
gatewayable_id	Integer	ID of gateway record
created_at	Datetime	Payment creation date
updated_at	Datetime	Payment update date
extra_return_param	String	Extra return parameter
operation_type	String	Payment operation type (e.g., pay, refund, payout)
order_number	String	Merchant order number
declination_reason	String	Reason for payment declination
lead_id	Integer	ID of the lead record
ip	String	Customer IP address
browser_info	String	Browser information
bank_card_id	Integer	ID of the bank card record
kind	String	Payment kind (e.g., wallet, direct)
refund_id	Integer	ID of the refund payment record
scoring_remark	String	Scoring remark
country_code_by_BIN	String	Country code by BIN (e.g., US)
country_code_by_phone	String	Country code by phone (e.g., US)
country_code_by_IP	String	Country code by IP (e.g., US)
business_account_legal_name	String	Business account legal name from merchant core settings
business_account_profileID	String	Business account profile ID from merchant core settings
card_masked_number	String	Masked card number (e.g., 1234****234)
gateway_details	JSON	Gateway-specific details (containts gateway_ids, redirect_request and other data`)
gateway_currency	String	Gateway currency after conversion
gateway_amount	Integer	Gateway amount after conversion
details	JSON	Additional details (e.g., request data, error data etc.)
scoring_action	String	Scoring action (e.g., success)
scoring_action_log	JSON	Scoring action log (e.g., {riskscore: {...}})
gateway_alias	String	Gateway alias (e.g., testpay)
card_brand_name	String	Card brand name (e.g., Visa, MasterCard)
routing_logs	JSON	Routing logs (e.g., {prev_route: null {next_route...}})
gateway_token	String	External gateway ID (e.g., 123456789)
two_stage_mode	Boolean	Indicates if the payment is in two-stage mode
settings	JSON	Payment settings (e.g., {status_checker_time_rates: {...}})
rrn	String	RRN (Retrieval Reference Number)
commission_data	JSON	Commission data (e.g., {commission_fee: 10, commission_amount: 10})
notification_settings	JSON	Notification settings (e.g., {"recipient"=>"test@test.tt", "allow_notification"=>true})
customer_country	String	Customer country (e.g., US)
trader_id	Integer	Trader ID (e.g., 123456)
merchant_url	String	Merchant URL (e.g., http://example.com)
reference	String	Reference (e.g., 123456789)
locale	String	Locale (e.g., en-US)
result must be either success or declined
If status: approved is returned, the transaction is still not finalized until a callback is received or status is polled
Response Fields:
{
  "status": "approved",
  "gateway_token": "4409b224-b1a7-41e5-8216-7c98560f4f08",
  "result": "success",
  "card_3ds_enrolled": true,
  "processingUrl": "http://business:4000/checkout_results/<token>/processing",
  "redirect_request": {
    "url": "http://business:4000/checkout_results/<token>/processing",
    "type": "post_iframes",
    "iframes": [
      {
        "url": "http://test:9090/3ds",
        "data": {
          "creq": "<creq-token>",
          "token": "<token>"
        }
      }
    ]
  },
  "logs": [
    {
      "gateway": "testing",
      "request": {
        "url": "https://some.site",
        "params": {
          "callback_url": "https://test.com",
          "amount": 1234,
          "currency": "USD",
          "extra_return_param": "Tinkoff",
          "order_number": "AutoTest#Payout-5264998"
        }
      },
      "status": 200,
      "response": "{status: \"OK\"}",
      "kind": "request",
      "created_at": "2025-05-15T18:21:55+02:00",
      "duration": 0.5
    }
  ]
}
Response structure:

gateway_token: External token or ID of the payment
card_enrolled: Indicates if the card requires 3DS flow
redirect_request: Redirect info required for 3DS payments
logs: Request/response logs from the integration
redirect_request
Field	Type	Description	Notes
redirect_request.url	String	Redirect or iframe processing URL	For post_iframes: always /checkout_requests/<token>/processing
redirect_request.type	String	Determines the redirect logic	One of: post_iframes, get_with_processing, get, post, redirect_html
redirect_request.wait_milliseconds	Integer	Delay before marking payment as processed and triggering next_payment_step asynchronously	Optional
redirect_request.params	Object	Form data (used in all types except post_iframes)	Optional
redirect_request.iframes	Object	Used for post_iframes type only	Required for iframe flows
redirect_request.iframes.url	String	ACS backend URL	Required
redirect_request.iframes.data	Object	Parameters used for fingerprinting and rendering the ACS form	Required
logs
Field	Type	Description	Notes
logs.request	Object	Outgoing request sent to the provider	Includes headers, body, etc.
logs.response	Object	Response received from the provider	Includes body, status, etc.
logs.status	String	HTTP status code	e.g. "200", "400"
logs.created_at	Datetime	Timestamp of request creation	ISO 8601
logs.updated_at	Datetime	Timestamp of latest update to the request lifecycle	ISO 8601
logs.kind	String	Name of the endpoint or request type	e.g. "pay", "status"
logs.gateway	String	Name of the integration/gateway	Optional
logs.duration	Float	Duration of the request in seconds	Optional
logs.direction	String	Direction: out for external request, in for callback	Required
Declined response:
HTTP status: Anything but 200
Error field:
error (String)
or errors (Array<String>)
H2H: Payout
Request structure.
{
    "params": {
        "card": {
            "pan": "4627342642639018",
            "expires": "04/2022"
        },
        "customer": {
            "email": "test@test.com",
            "address": "Earth",
            "ip": "1.1.1.1"
        },
        "extra_return_param": "123",
        "order_number": "Payout-5264998"
    },
    "payment": {
        "token": "TE8ovE9Bngh8XVzozoLdXwNhQ2F9774L",
        "gateway_amount": 100,
        "gateway_currency": "EUR"
    },
    "settings": {
      "sandbox": true
    },
    "processing_url": "http://business:4000/checkout_results/TE8ovE9Bngh8XVzozoLdXwNhQ2F9774L/processing",
    "callback_url": "http://business:4000/callbacks/v2/gateway_callbacks/TE8ovE9Bngh8XVzozoLdXwNhQ2F9774L",
    "method_name": "payout"
}
Payout fields mostly mirror the payment request (see above).

The params object contains the following keys:

settings: general gateway or environment settings
params: payment method data (e.g. cardholder info, browser data, etc.)
payment: payment-specific information (amount, currency, redirect URLs, token)
processing_url: internal redirect URL after 3DS
callback_url: URL where the payment result callback will be sent
callback_3ds_url: 3DS-specific callback URL after challenge or fingerprinting
method_name: action to be performed (e.g. "payout")
Available parameter fields
Below is a list of possible parameters and their results that may be suitable for an external application.

Field	Type	Description
card	String	Card object
customer	String	Customer object
order_number	String	Merchant order number
extra_return_param	String	Extra return parameter
Available payment fields
Field	Type	Description
id	Integer	Payment ID (we don't use it field)
status	String	Payment status
token	String	Internal payment token
currency	String	Origin payment currency
product	String	Product name
callback_url	String	Merchant callback URL
redirect_success_url	String	URL for successful payment redirect
redirect_fail_url	String	URL for failed payment redirect
redirect_request	String	URL for redirect request (non used)
merchant_private_key	String	Private key for Merchant record
amount	Integer	Payment amount
gatewayable_type	String	Name of gateway (e.g., `Gateway::TestpayPayment)
gatewayable_id	Integer	ID of gateway record
created_at	Datetime	Payment creation date
updated_at	Datetime	Payment update date
extra_return_param	String	Extra return parameter
operation_type	String	Payment operation type (e.g., pay, refund, payout)
order_number	String	Merchant order number
declination_reason	String	Reason for payment declination
lead_id	Integer	ID of the lead record
ip	String	Customer IP address
kind	String	Payment kind (e.g., wallet, direct)
refund_id	Integer	ID of the refund payment record
scoring_remark	String	Scoring remark
country_code_by_BIN	String	Country code by BIN (e.g., US)
country_code_by_phone	String	Country code by phone (e.g., US)
country_code_by_IP	String	Country code by IP (e.g., US)
business_account_legal_name	String	Business account legal name from merchant core settings
business_account_profileID	String	Business account profile ID from merchant core settings
card_masked_number	String	Masked card number (e.g., 1234****234)
gateway_details	JSON	Gateway-specific details (containts gateway_ids, redirect_request and other data`)
gateway_currency	String	Gateway currency after conversion
gateway_amount	Integer	Gateway amount after conversion
details	JSON	Additional details (e.g., request data, error data etc.)
gateway_alias	String	Gateway alias (e.g., testpay)
card_brand_name	String	Card brand name (e.g., Visa, MasterCard)
gateway_token	String	External gateway ID (e.g., 123456789)
two_stage_mode	Boolean	Indicates if the payment is in two-stage mode
settings	JSON	Payment settings (e.g., {status_checker_time_rates: {...}})
rrn	String	RRN (Retrieval Reference Number)
commission_data	JSON	Commission data (e.g., {commission_fee: 10, commission_amount: 10})
notification_settings	JSON	Notification settings (e.g., {"recipient"=>"test@test.tt", "allow_notification"=>true})
customer_country	String	Customer country (e.g., US)
merchant_url	String	Merchant URL (e.g., http://example.com)
reference	String	Reference (e.g., 123456789)
locale	String	Locale (e.g., en-US)
Payout Response
{
  "status": "approved",
  "gateway_token": "f268ae4e-e5b4-451d-a46c-7c7b44d47195",
  "result": "success",
  "processingUrl": "http://business:4000/checkout_results/<token>/processing",
  "logs": [...]
}
The response object contains the following keys:

status: response status (e.g. "ok")
gateway_token: unique transaction identifier from the external gateway
result: outcome of the transaction (e.g. "success", "declined")
processingUrl: internal redirect URL used during processing
logs: array of request/response logs related to the transaction
P2P: Flow of Payments
payment flow

P2P: Diagram of Payment Flow
payment flow

P2P: Required Endpoints
The external service must respond to the following endpoints:

Path	Method	Description
/pay	POST	Pay request
/status	POST	Check status
/payout	POST	Payout request
/refund	POST	Refund request
/confirm_secure_code	POST	Confirm OTP secret key
/p2p_redirect	GET	Redirect to charge page
/pay_by_form	POST	Approve payment by form
P2P: Payment
The format of the P2P request, to the application, has a similar structure, as host2host mode E-Com (described above). However, a new block is added - bank_account, which contains information about requisites details.

{
    "product": "Tests",
    "order_number": "1234566789",
    "amount": 22200,
    "currency": "EUR",
    "redirect_success_url": "https://success.com/",
    "redirect_fail_url": "https://declined.com/",
    "callback_url": "https://test.io/callback",
    "bank_account": {
        "requisite_type": "card"
    },
    "customer": {
        "email": "dog@gmail.com"
    }
}
Section: customer
Field	Type	Description
customer.ip	String	Client's IP address
customer.phone	String	Client's phone number
customer.name	String	Client's full name
customer.email	String	Client's email address
customer.client_id	String	Client's internal ID
customer.first_name	String	Client's first name
customer.last_name	String	Client's last name
customer.middle_name	String	Client's middle name
customer.address	String	Client's address
customer.city	String	Client's city
customer.state	String	Client's state or region
customer.postcode	String	Client's postal code
customer.country	String	Client's country
customer.locale	String	Client's language locale
customer.userid	String	Client's user ID in the merchant system
customer.mode_of_payment	String	Mode of payment
customer.coin	String	Currency
customer.payment_system_id	String	ID of the payment system
customer.card_bin	String	BIN of the card
customer.birthday	String	Client's date of birth
Section: bank_account
Field	Type	Description
bank_account.bank_account	String	Bank account number
bank_account.account_holder	String	Account holder's name
bank_account.bank_state	String	Bank's state
bank_account.bank_city	String	Bank's city
bank_account.ifsc_code	String	IFSC code (India specific)
bank_account.bank_address	String	Bank's address
bank_account.account_number	String	Account number
bank_account.account_name	String	Account holder name
bank_account.requisite_type	String	Type of requisite
bank_account.bank_name	String	Bank name
Section: default
Field	Type	Description
default.recurring	Boolean	Indicates if the payment is recurring
default.website	String	Website of the merchant
default.extra_return_param	String	Additional return parameters
default.pending_url	String	Immediate redirect URL for waiting page
default.need_confirmation	Boolean	Indicates two-step payment requirement
Server Response for P2P Payments
{
  "status": "approved",
  "gateway_token": "539VLCBtWfKsJcU4SJH3gVqHNXsaGbfC",
  "result": "pending",
  "requisites": {
    "card": "4617611794313933",
    "holder": "Clark Kent",
    "bank_name": "dogbank"
  },
  "redirectRequest": {
    "url": null,
    "type": "post_iframes",
    "iframes": [
      {
        "url": null,
        "data": {
          "token": "539VLCBtWfKsJcU4SJH3gVqHNXsaGbfC"
        }
      }
    ]
  },
  "logs": [...]
}
Field	Type	Description
redirect_request	Object	Contains the URL to redirect the user to the P2P payment page. Usually excluded when wrapped_to_json is enabled in settings.
result	String	approved / declined / pending
requisites	Object	Contains trader's requisites, displayed on the form or returned in JSON.
gateway_token	String	Token from the external gateway
logs	Array	Logs of the operation. Refer to the standard logs structure.
Callbacks
ReactivePay receives asynchronous notifications (callbacks) about payment events. These callbacks must be authenticated, validated, and follow specific payload and security requirements.

Callback Endpoint
Endpoint format:

POST /callbacks/v2/gateway_callbacks/:token

Where token is the Payment.token of the current transaction.

Authentication & JWT Format
Callbacks are authenticated using a JWT token in the Authorization header:

Authorization: Bearer <JWT_TOKEN>

JWT Header:
Encryption algorithm: "HS512"
JWT Payload:
{
  "status": "approved",
  "currency": "USD",
  "amount": 100,
  "secure": {
    "encrypted_data": "<base64-string>",
    "iv_value": "<base64-string>"
  }
}
secure contains the encrypted merchant_key (AES-256-CBC).
HS512 signature uses settings['sign_key'] as the secret.
Encrypting the Merchant Key
Use AES-256-CBC encryption with the system master key
openssl enc -aes-256-cbc -in merchant_key.txt -out encrypted_key.bin -K <master_token> -iv <iv_value>

function processJwt(jwt_token, sign_key):
    # Step 1: Decode JWT and extract 'secure' block
    base64_payload = jwt_token.split('.')[1]
    decoded_payload = Base64Decode(base64_payload)
    json_payload = ParseJSON(decoded_payload)
    secure_block = json_payload["secure"]

    # Step 2: Decrypt merchant key
    encrypted_data = secure_block["encrypted_data"]
    iv = secure_block["iv_value"]
    master_key = GetConfig("master_token")[0:32]

    merchant_private_key = AES256Decrypt(
        key = master_key,
        iv = iv,
        data = encrypted_data
    )

    # Step 3: Validate signature
    is_valid = JwtVerify(token = jwt_token, secret = sign_key, algorithm = "HS512")

    return {
        "merchant_private_key": merchant_private_key,
        "secure_block": secure_block,
        "jwt_valid": is_valid
    }
import base64
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes

def pad(data):
    pad_len = 16 - (len(data) % 16)
    return data + bytes([pad_len] * pad_len)

def encrypt_merchant_key(merchant_key: str, master_token: str):
    key = master_token.encode('utf-8')[:32]
    iv = get_random_bytes(16)

    cipher = AES.new(key, AES.MODE_CBC, iv)
    padded_data = pad(merchant_key.encode('utf-8'))
    encrypted = cipher.encrypt(padded_data)

    return {
        "encrypted_data": base64.b64encode(encrypted).decode('utf-8'),
        "iv_value": base64.b64encode(iv).decode('utf-8')
    }
Example Output
{ "encrypted_data": "<Base64>", "iv_value": "<Base64>" }

Server-side Validation Steps
Payload Schema Validation
Field	Type	Constraints / Pattern	Required	Description
token	String	Length: 32	Yes	Unique token identifying the payment
gateway_token	String	—	No	Token from the external gateway
status	String	approved / declined / refunded	Yes	Result status of the payment
refund	Boolean	—	No	Indicates if this is a refund
reason	String	Min length: 5	No	Decline or refund reason
currency	String	Length: 3–4	Yes	ISO currency code (e.g. USD, EUR)
amount	Integer	—	Yes	Payment amount in minor units
gateway_callback	Object	—	No	Full provider response (if needed)
Example CURL Request
Success:
HTTP 200
Response: { success: true }
Errors:
Code	Message
401	Authorization token is missing
422	Invalid JWT signature
422	Invalid payload schema
Logs and Debugging
Each callback is logged via InteractionLogger with: - request (raw & parsed) - response - direction: "in" - timestamps and duration

Common Pitfalls
Incorrect master token for AES key
Missing fields in secure payload
Expired or mismatched JWT tokens
Schema violations (e.g. short token, missing currency)
Useful References
JWT.io
AES encryption Wiki
Status
Reactivepay also has a transaction status polling functionality. The endpoint on the application side should respond to the /status path.

Request body
{
    "settings": {
        "bearer_token": "cd6fb795fd41348df8f0"
    },
    "payment": {
        "gateway_token": "H97UakuQMh17THitGy3Bzu9bX1YSfCEv"
    },
    "method_name": "status"
}
Field	Type	Description
settings	Object	General gateway or environment settings
settings.bearer_token	String	Authorization bearer token
payment	Object	Payment-specific information
payment.gateway_token	String	Unique identifier for the transaction
method_name	String	Name of the method to be executed (e.g., 'status')
Response body
{
    "result": "OK",
    "status": "pending",
    "details": "Transaction is pending",
    "amount": 22200,
    "currency": "RUB",
    "logs": [...]
}
Field	Type	Description
result	String	Result status of the transaction (e.g. OK, ERROR)
status	String	Current status of the transaction (e.g. pending, approved)
details	String	Additional status details or message
amount	Integer	Amount of the transaction in minor units
currency	String	Currency of the transaction
logs	Array	Logs of the transaction process