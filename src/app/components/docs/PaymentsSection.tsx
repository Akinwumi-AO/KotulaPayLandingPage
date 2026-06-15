import { CodeBlock } from './CodeBlock';
import { ParamsTable } from './ParamsTable';

interface PaymentsSectionProps {
  isDarkMode: boolean;
  selectedLanguage: string;
}

export function PaymentsSection({ isDarkMode, selectedLanguage }: PaymentsSectionProps) {
  return (
    <section id="payments" className="mt-16 scroll-mt-24">
      <h1 className={`text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Payments
      </h1>
      <p className={`text-lg leading-relaxed mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        Kotulapay payment processing REST API.
      </p>

      {/* Create */}
      <div id="payments-create" className="scroll-mt-24 mt-12">
        <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Create
        </h2>

        {selectedLanguage === 'cURL' && (
          <>
            <CodeBlock
              code={`curl "https://business.kotulapay.com/api/v1/payments" \\
    -X POST \\
    -H "Authorization: Bearer merchant_private_key" \\
    -H "Content-Type: application/json" -d '{
        "product" : "Your Product",
        "amount" : "1000",
        "currency" : "CNY",
        "redirectSuccessUrl" : "https://your-site.com/success",
        "redirectFailUrl" : "https://your-site.com/fail",
        "extraReturnParam" : "your order id or other info",
        "pendingUrl" : "https://your-site.com/pending",
        "expires_at": 5,
        "orderNumber" : "your order number",
        "locale": "zh"
    }'`}
              language="bash"
              isDarkMode={isDarkMode}
            />

            <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Response (Status 200)
            </h3>
            <CodeBlock
              code={`{
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
}`}
              language="json"
              isDarkMode={isDarkMode}
            />
          </>
        )}

        {selectedLanguage === 'Python' && (
          <>
            <CodeBlock
              code={`from django.http import HttpResponseRedirect, HttpResponse
import requests
import json

def pay(request):
    MERCHANT_PRIVATE_KEY = 'merchant_private_key'
    LIVE_URL = 'https://business.kotulapay.com'
    SANDBOX_URL = 'https://business.kotulapay.com'

    payload = {
        "product": request.POST['product_name'],
        "amount": request.POST['order_amount'],
        "currency": "CNY",
        "redirectSuccessUrl": request.POST['notify_url'],
        "redirectFailUrl": request.POST['return_url'],
        "extraReturnParam": request.POST['order_no'],
        "orderNumber": request.POST['order_number'],
        "locale": request.POST['locale']
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
        return HttpResponse('<html><body><span>Something gone wrong: %s</span></body></html>' % (resp.status_code))`}
              language="python"
              isDarkMode={isDarkMode}
            />

            <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Response (Status 200)
            </h3>
            <CodeBlock
              code={`{
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
}`}
              language="json"
              isDarkMode={isDarkMode}
            />
          </>
        )}

        <p className={`mb-4 mt-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Initialize payments - to begin receiving payments, you must first call using the following script. This will enable you to obtain a payment token, which will be required later to complete API integration.
        </p>

        <p className={`mb-2 font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          HTTP Request via SSL
        </p>
        <p className={`mb-4 font-mono text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          POST '/api/v1/payments'
        </p>

        <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Query Parameters
        </h3>
        <ParamsTable
          headers={['Parameter', 'Mandatory', 'Description', 'Validation']}
          rows={[
            ['product', 'yes', 'Product name (Service description) (example: \'iPhone\').', 'minLength: 5, maxLength: 255'],
            ['amount', 'yes', 'Payment amount in cents (10020), except JPY', 'minLength: 1, maxLength: 32'],
            ['currency', 'yes', 'Currency code (CNY, EUR, USD, JPY).', 'minLength: 3, maxLength: 3'],
            ['callbackUrl', 'yes', 'The server URL a merchant will be notified about a payment finalisation', 'Valid URI format'],
            ['redirectSuccessUrl', 'no', 'The URL a customer will be redirected to in the case of successfull payment', 'Valid URI format'],
            ['redirectFailUrl', 'no', 'The URL a customer will be redirected to in the case of payment error or failure', 'Valid URI format'],
            ['pendingUrl', 'no', 'The URL a customer will be redirected to the specific page in the case of pending payment instead built-in checkout_result_page', 'Valid URI format'],
            ['extraReturnParam', 'no', 'Bank/Payment method list, description, etc', 'minLength: 1, maxLength: 1024'],
            ['expires_at', 'no', 'Expired payment time for requests without a bank card', 'minLength: 1'],
            ['orderNumber', 'no', 'The current order number from a company system.', 'minLength: 3, maxLength: 255 (string)'],
            ['locale', 'no', 'The locale is used on a payment page by default. Currently supported locales: en, zh and jp from ISO 639-1.', 'minLength: 2, maxLength: 5 (string)'],
            ['walletToken', 'no', 'Set this parameter when making recurring payment from a customer\'s wallet. A customer will receive notification and has to confirm the payment.', 'returns by API for recurring payments only'],
            ['recurring', 'no', 'Set this parameter to true when initializing recurring payment.', 'boolean'],
            ['recurringToken', 'no', 'Set this parameter when making recurring payment previously initialized with recurring param.', 'returns by API for recurring payments only'],
            ['needConfirmation', 'no', 'Set this parameter when making payment in two steps (preAuth and confirm/decline)', ''],
            ['card', 'no', 'Card object for Host2Host payments.', ''],
            ['customer', 'no', 'Customer object for Host2Host payments.', ''],
            ['recurring_data', 'no', 'Recurring data object for Host2Host payments.', ''],
            ['merchantUrl', 'no', 'Param to control traffic from aggregators', ''],
          ]}
          isDarkMode={isDarkMode}
        />

        <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Card Object Parameters
        </h3>
        <ParamsTable
          headers={['Parameter', 'Mandatory', 'Description', 'Validation']}
          rows={[
            ['pan', 'yes', 'Customer\'s card number (PAN). Any valid card number, may contain spaces', 'Valid card number (16-19 digits)'],
            ['expires', 'yes', 'Customer\'s card expiration date. Format: mm/yyyy', 'mm/yyyy format'],
            ['holder', 'yes', 'Customer\'s cardholder name. Any valid cardholder name', 'minLength: 5, maxLength: 50'],
            ['cvv', 'yes', 'Customer\'s CVV2 / CVC2 / CAV2', 'minLength: 3, maxLength: 3 Only digits (\\d+)'],
          ]}
          isDarkMode={isDarkMode}
        />

        <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Customer Object Parameters (optional)
        </h3>
        <ParamsTable
          headers={['Parameter', 'Mandatory', 'Description', 'Validation']}
          rows={[
            ['email', 'yes', 'Customer\'s email, is mandatory if Customer object posted on a request', 'Valid email format'],
            ['address', 'no', 'Customer\'s billing address', 'minLength: 5, maxLength: 55'],
            ['country', 'no', 'Customer\'s billing country', 'ISO country code format "GB"'],
            ['city', 'no', 'Customer\'s billing city', 'minLength: 4, maxLength: 55'],
            ['region', 'no', 'Customer\'s billing region', 'minLength: 5, maxLength: 55'],
            ['postcode', 'no', 'Customer\'s billing ZipCode', 'minLength: 4, maxLength: 55'],
            ['phone', 'no', 'Customer\'s billing phone number', 'minLength: 6, maxLength: 20'],
            ['ip', 'no', 'Customer IP address', 'Valid IP address format (XX.XX.XX.XX)'],
            ['browser', 'no', 'Customer browser object for 3ds2 payments.', ''],
          ]}
          isDarkMode={isDarkMode}
        />

        <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Customer browser object for 3ds2 payments (optional)
        </h3>
        <ParamsTable
          headers={['Parameter', 'Mandatory', 'Description', 'Example']}
          rows={[
            ['accept_header', 'no', 'Browser\'s content type', 'text/html'],
            ['color_depth', 'no', 'Browser\'s color depth value', '32'],
            ['ip', 'no', 'Browser\'s ip', '177.255.255.35'],
            ['language', 'no', 'Browser\'s language', 'ru'],
            ['screen_height', 'no', 'Browser\'s screen height', '1080'],
            ['screen_width', 'no', 'Browser\'s screen width', '1920'],
            ['tz', 'no', 'Browser\'s time zone', '180'],
            ['user_agent', 'no', 'Browser\'s user agent', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:96.0) Gecko/20100101 Firefox/96.0'],
            ['java_enabled', 'no', 'Is java enabled', 'true'],
            ['javascript_enabled', 'no', 'Is javascript enabled', 'true'],
            ['window_width', 'no', 'Browser\'s window width', '1920'],
            ['window_height', 'no', 'Browser\'s window height', '1080'],
          ]}
          isDarkMode={isDarkMode}
        />

        <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Recurring data object for payments (optional)
        </h3>
        <ParamsTable
          headers={['Parameter', 'Mandatory', 'Description', 'Validation']}
          rows={[
            ['days', 'no', 'Customer days object for payments.', 'Number of days between authorizations from 1'],
            ['exp_date', 'no', 'Customer exp_date object for payments.', 'Period of validity of periodic payments in format YYYYMMDD'],
          ]}
          isDarkMode={isDarkMode}
        />
      </div>

      {/* Payments Providers */}
      <div id="payments-providers" className="scroll-mt-24 mt-12">
        <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Payments Providers
        </h2>

        {selectedLanguage === 'cURL' && (
          <>
            <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Response (Status 200)
            </h3>
            <CodeBlock
              code={`{
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
}`}
              language="json"
              isDarkMode={isDarkMode}
            />
          </>
        )}

        <p className={`mb-4 mt-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          In case multiple payment providers enabled to a merchant account, Create payment response JSON will have processingUrl object represented as an array of available payment providers (please refer to JSON response). Use those URLs to redirect your customer to a payment provider (method).
        </p>

        <h3 className={`text-xl font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          List of payment providers
        </h3>
        <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          In case you want a customer to choose a payment provider (method) it might be convenient to use a specific page (widget) with payment provider list, which is available by "selectorURL" parameter in JSON response object
        </p>
      </div>

      {/* List */}
      <div id="payments-list" className="scroll-mt-24 mt-12">
        <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          List
        </h2>

        {selectedLanguage === 'cURL' && (
          <>
            <CodeBlock
              code={`curl "https://business.kotulapay.com/api/v1/payments?dateFrom=2016-05-11&page=1&perPage=1" \\
    -H "Authorization: Bearer merchant_private_key"`}
              language="bash"
              isDarkMode={isDarkMode}
            />

            <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Response (Status 200)
            </h3>
            <CodeBlock
              code={`{
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
}`}
              language="json"
              isDarkMode={isDarkMode}
            />
          </>
        )}

        <p className={`mb-4 mt-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Payments List - this is the method used to display the list of returned payments.
        </p>

        <p className={`mb-2 font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          HTTP Request via SSL
        </p>
        <p className={`mb-4 font-mono text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          GET '/api/v1/payments'
        </p>

        <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Query Parameters
        </h3>
        <ParamsTable
          headers={['Parameter', 'Description', 'Required']}
          rows={[
            ['dateFrom', 'Date from (example: \'2015-01-01\')', 'No'],
            ['dateTo', 'Date to (example: \'2015-01-02\')', 'No'],
            ['page', 'Page number (default: 1)', 'No'],
            ['perPage', 'Payment per page (max: 500, default: 20)', 'No'],
            ['operationType', 'Operation type (Available values: pays, payouts, all)', 'No'],
            ['orderNumber', 'Merchant\'s order number', 'No'],
          ]}
          isDarkMode={isDarkMode}
        />
      </div>

      {/* Get */}
      <div id="payments-get" className="scroll-mt-24 mt-12">
        <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Get
        </h2>

        {selectedLanguage === 'cURL' && (
          <>
            <CodeBlock
              code={`curl "https://business.kotulapay.com/api/v1/payments/[payment_token]" \\
    -H "Authorization: Bearer merchant_private_key"`}
              language="bash"
              isDarkMode={isDarkMode}
            />

            <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Response (Status 200)
            </h3>
            <CodeBlock
              code={`{
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
      "extra_return_param": "[extra params, can be use to payment identification in merchant system]",
      "operation_type": "pay | payout",
      "order_number": "[merchant's order number]",
      "commission_data": {
                  "commission_value": 0.0,
                  "commission_fee": 0.0,
                  "commission_amount": 0.0
              }
    }
}`}
              language="json"
              isDarkMode={isDarkMode}
            />
          </>
        )}

        <p className={`mb-4 mt-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Payment Get - this is the method used to retrieve information about single payment.
        </p>

        <p className={`mb-2 font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          HTTP Request via SSL
        </p>
        <p className={`mb-4 font-mono text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          GET '/api/v1/payments/[payment_token]'
        </p>
      </div>

      {/* Confirm Two-Step */}
      <div id="payments-confirm-two-step" className="scroll-mt-24 mt-12">
        <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Confirm Two-Step
        </h2>

        {selectedLanguage === 'cURL' && (
          <>
            <CodeBlock
              code={`curl "https://business.kotulapay.com/api/v1/payments/confirm" \\
    -X POST \\
    -H "Authorization: Bearer merchant_private_key" \\
    -H "Content-Type: application/json" -d '{
        "token" : "Your Product"
    }'`}
              language="bash"
              isDarkMode={isDarkMode}
            />

            <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Response (Status 200)
            </h3>
            <CodeBlock
              code={`{
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
}`}
              language="json"
              isDarkMode={isDarkMode}
            />
          </>
        )}

        {selectedLanguage === 'Python' && (
          <>
            <CodeBlock
              code={`from django.http import HttpResponseRedirect, HttpResponse
import requests
import json

def pay(request):
    MERCHANT_PRIVATE_KEY = 'merchant_private_key'
    LIVE_URL = 'https://business.kotulapay.com'
    SANDBOX_URL = 'https://business.kotulapay.com'

    payload = {
        "token": request.POST['token payment']
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
        return HttpResponse('<html><body><span>Something gone wrong: %s</span></body></html>' % (resp.status_code))`}
              language="python"
              isDarkMode={isDarkMode}
            />

            <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Response (Status 200)
            </h3>
            <CodeBlock
              code={`{
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
}`}
              language="json"
              isDarkMode={isDarkMode}
            />
          </>
        )}

        <p className={`mb-4 mt-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Confirm Two-Step payment by providing a payment token.
        </p>

        <p className={`mb-2 font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          HTTP Request via SSL
        </p>
        <p className={`mb-4 font-mono text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          POST '/api/v1/payments/confirm'
        </p>

        <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Query Parameters
        </h3>
        <ParamsTable
          headers={['Parameter', 'Mandatory', 'Description']}
          rows={[
            ['token', 'yes', 'Payment token.'],
          ]}
          isDarkMode={isDarkMode}
        />
      </div>

      {/* Decline Two-Step */}
      <div id="payments-decline-two-step" className="scroll-mt-24 mt-12">
        <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Decline Two-Step
        </h2>

        {selectedLanguage === 'cURL' && (
          <>
            <CodeBlock
              code={`curl "https://business.kotulapay.com/api/v1/payments/decline" \\
    -X POST \\
    -H "Authorization: Bearer merchant_private_key" \\
    -H "Content-Type: application/json" -d '{
        "token" : "Your Product"
    }'`}
              language="bash"
              isDarkMode={isDarkMode}
            />

            <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Response (Status 200)
            </h3>
            <CodeBlock
              code={`{
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
}`}
              language="json"
              isDarkMode={isDarkMode}
            />
          </>
        )}

        {selectedLanguage === 'Python' && (
          <>
            <CodeBlock
              code={`from django.http import HttpResponseRedirect, HttpResponse
import requests
import json

def pay(request):
    MERCHANT_PRIVATE_KEY = 'merchant_private_key'
    LIVE_URL = 'https://business.kotulapay.com'
    SANDBOX_URL = 'https://business.kotulapay.com'

    payload = {
        "token": request.POST['token payment']
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
        return HttpResponse('<html><body><span>Something gone wrong: %s</span></body></html>' % (resp.status_code))`}
              language="python"
              isDarkMode={isDarkMode}
            />

            <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Response (Status 200)
            </h3>
            <CodeBlock
              code={`{
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
}`}
              language="json"
              isDarkMode={isDarkMode}
            />
          </>
        )}

        <p className={`mb-4 mt-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Decline Two-Step payment by providing a payment token.
        </p>

        <p className={`mb-2 font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          HTTP Request via SSL
        </p>
        <p className={`mb-4 font-mono text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          POST '/api/v1/payments/decline'
        </p>

        <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Query Parameters
        </h3>
        <ParamsTable
          headers={['Parameter', 'Mandatory', 'Description']}
          rows={[
            ['token', 'yes', 'Payment token.'],
          ]}
          isDarkMode={isDarkMode}
        />
      </div>

      {/* Get/Order */}
      <div id="payments-get-order" className="scroll-mt-24 mt-12">
        <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Get/Order
        </h2>

        {selectedLanguage === 'cURL' && (
          <>
            <CodeBlock
              code={`curl "https://business.kotulapay.com/api/v1/payments/order/[order_number]" \\
    -H "Authorization: Bearer merchant_private_key"`}
              language="bash"
              isDarkMode={isDarkMode}
            />

            <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Response (Status 200)
            </h3>
            <CodeBlock
              code={`{
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
            "extra_return_param": "[extra params, can be use to payment identification in merchat system]",
            "operation_type": "pay | payout",
            "order_number": "[merchant's order number]"
        }
    ]
}`}
              language="json"
              isDarkMode={isDarkMode}
            />
          </>
        )}

        <p className={`mb-4 mt-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Payment Get/Order - this is the method used to retrieve information about payments by order_number.
        </p>

        <p className={`mb-2 font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          HTTP Request via SSL
        </p>
        <p className={`mb-4 font-mono text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          GET '/api/v1/payments/order/[order_number]'
        </p>
      </div>

      {/* Otp */}
      <div id="payments-otp" className="scroll-mt-24 mt-12">
        <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Otp
        </h2>

        {selectedLanguage === 'cURL' && (
          <>
            <CodeBlock
              code={`curl "https://business.kotulapay.com/api/v1/otp" \\
    -X POST \\
    -H "Authorization: Bearer merchant_private_key" \\
    -H "Content-Type: application/json" -d '{
        "token" : "YP741BPPRuDYSAPJG6ErFyoofWYReZWA",
        "otp" : "443443"
    }'`}
              language="bash"
              isDarkMode={isDarkMode}
            />

            <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Response (Status 200)
            </h3>
            <CodeBlock
              code={`{
    "success": true | false,
    "errors": [],
    "status": 200
}`}
              language="json"
              isDarkMode={isDarkMode}
            />
          </>
        )}

        <p className={`mb-4 mt-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Otp - this is the method used to confirm mobile payment.
        </p>

        <p className={`mb-2 font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          HTTP Request via SSL
        </p>
        <p className={`mb-4 font-mono text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          POST '/api/v1/otp'
        </p>

        <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Query Parameters
        </h3>
        <ParamsTable
          headers={['Parameter', 'Mandatory', 'Description', 'Validation']}
          rows={[
            ['token', 'yes', 'Payment token', ''],
            ['otp', 'yes', 'Otp code', ''],
          ]}
          isDarkMode={isDarkMode}
        />
      </div>

      {/* Otp resend */}
      <div id="payments-otp-resend" className="scroll-mt-24 mt-12">
        <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Otp resend
        </h2>

        {selectedLanguage === 'cURL' && (
          <>
            <CodeBlock
              code={`curl "https://business.kotulapay.com/api/v1/otp-resend?token=YP741BPPRuDYSAPJG6ErFyoofWYReZWA" \\
    -H "Authorization: Bearer merchant_private_key"`}
              language="bash"
              isDarkMode={isDarkMode}
            />

            <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Response (Status 200)
            </h3>
            <CodeBlock
              code={`{
    "success": true | false,
    "errors": [],
    "status": 200
}`}
              language="json"
              isDarkMode={isDarkMode}
            />
          </>
        )}

        <p className={`mb-4 mt-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Otp resend - this is the method used to resend the OTP code.
        </p>

        <p className={`mb-2 font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          HTTP Request via SSL
        </p>
        <p className={`mb-4 font-mono text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          GET '/api/v1/otp-resend'
        </p>
      </div>
    </section>
  );
}