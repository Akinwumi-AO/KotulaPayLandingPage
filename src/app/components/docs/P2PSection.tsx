import { CodeBlock } from './CodeBlock';
import { ParamsTable } from './ParamsTable';

interface P2PSectionProps {
  isDarkMode: boolean;
  selectedLanguage: string;
}

export function P2PSection({ isDarkMode, selectedLanguage }: P2PSectionProps) {
  return (
    <section id="p2p" className="mt-16 scroll-mt-24">
      <h1 className={`text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        P2P
      </h1>
      <p className={`text-lg leading-relaxed mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        Peer-to-peer payment processing.
      </p>

      {/* Payment */}
      <div id="p2p-payment" className="scroll-mt-24 mt-12">
        <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Payment
        </h2>

        {selectedLanguage === 'cURL' && (
          <>
            <CodeBlock
              code={`curl "https://business.kotulapay.com/api/v1/p2p/payment" \\
    -X POST \\
    -H "Authorization: Bearer merchant_private_key" \\
    -H "Content-Type: application/json" -d '{
        "amount": 1000,
        "currency": "RUB",
        "card": {
            "pan": "4111111111111111",
            "expires": "01/2025",
            "holder": "cardholder name",
            "cvv": "123"
        },
        "callbackUrl": "https://example.com/callback",
        "extraReturnParam": "param",
        "customer": {
            "email": "customer@example.com"
        }
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
  "payment": {
    "amount": "1000",
    "currency": "RUB",
    "status": "init|pending|approved|declined"
  },
  "redirectRequest": {
    "url": "[redirect url]",
    "params": {},
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
        return HttpResponse('<html><body><span>Something gone wrong: %s</span></body></html>' % (resp.status_code))`}
              language="python"
              isDarkMode={isDarkMode}
            />

            <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Response (Status 200)
            </h3>
            <CodeBlock
              code={`{
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
}`}
              language="json"
              isDarkMode={isDarkMode}
            />
          </>
        )}

        <p className={`mb-4 mt-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Initialize P2P payment.
        </p>

        <p className={`mb-2 font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          HTTP Request via SSL
        </p>
        <p className={`mb-4 font-mono text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          POST '/api/v1/p2p/payment'
        </p>

        <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Query Parameters
        </h3>
        <ParamsTable
          headers={['Parameter', 'Mandatory', 'Description']}
          rows={[
            ['amount', 'yes', 'Payment amount in cents'],
            ['currency', 'yes', 'Currency code (RUB, etc)'],
            ['card', 'yes', 'Card object'],
            ['callbackUrl', 'no', 'Callback URL'],
            ['extraReturnParam', 'no', 'Extra return parameters'],
            ['customer', 'no', 'Customer object'],
          ]}
          isDarkMode={isDarkMode}
        />
      </div>

      {/* Payout Card */}
      <div id="p2p-payout-card" className="scroll-mt-24 mt-12">
        <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Payout Card
        </h2>

        {selectedLanguage === 'cURL' && (
          <>
            <CodeBlock
              code={`curl "https://business.kotulapay.com/api/v1/p2p/payout/card" \\
    -X POST \\
    -H "Authorization: Bearer merchant_private_key" \\
    -H "Content-Type: application/json" -d '{
        "amount": 1000,
        "currency": "RUB",
        "card": {
            "pan": "4111111111111111"
        },
        "callbackUrl": "https://example.com/callback"
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
  "token": "[payout token]",
  "payout": {
    "amount": "1000",
    "currency": "RUB",
    "status": "pending|approved|declined"
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
              code={`from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse, HttpResponseNotFound
from django.views.decorators.csrf import csrf_exempt
import requests
import json

def payout(request):
    MERCHANT_PRIVATE_KEY = 'your-merchant-private-key'
    LIVE_URL = 'https://business.kotulapay.com'
    SANDBOX_URL = 'https://business.kotulapay.com'

    payload = {
        "amount": 1000,
        "currency": "RUB",
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
        return HttpResponse('<html><body><span>Something gone wrong: %s</span> : %s</body></html>' % (resp.status_code, resp.text))`}
              language="python"
              isDarkMode={isDarkMode}
            />

            <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Response (Status 200)
            </h3>
            <CodeBlock
              code={`{
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
}`}
              language="json"
              isDarkMode={isDarkMode}
            />
          </>
        )}

        <p className={`mb-4 mt-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Initialize P2P payout to card.
        </p>

        <p className={`mb-2 font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          HTTP Request via SSL
        </p>
        <p className={`mb-4 font-mono text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          POST '/api/v1/p2p/payout/card'
        </p>
      </div>

      {/* Payout SBP */}
      <div id="p2p-payout-sbp" className="scroll-mt-24 mt-12">
        <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Payout SBP
        </h2>

        {selectedLanguage === 'cURL' && (
          <>
            <CodeBlock
              code={`curl "https://business.kotulapay.com/api/v1/p2p/payout/sbp" \\
    -X POST \\
    -H "Authorization: Bearer merchant_private_key" \\
    -H "Content-Type: application/json" -d '{
        "amount": 1000,
        "currency": "RUB",
        "phone": "+79001234567",
        "callbackUrl": "https://example.com/callback"
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
  "token": "[payout token]",
  "payout": {
    "amount": "1000",
    "currency": "RUB",
    "status": "pending|approved|declined"
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
              code={`from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse, HttpResponseNotFound
from django.views.decorators.csrf import csrf_exempt
import requests
import json

def payout(request):
    MERCHANT_PRIVATE_KEY = 'your-merchant-private-key'
    LIVE_URL = 'https://business.kotulapay.com'
    SANDBOX_URL = 'https://business.kotulapay.com'

    payload = {
        "amount": 1000,
        "currency": "RUB",
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
        return HttpResponse('<html><body><span>Something gone wrong: %s</span> : %s</body></html>' % (resp.status_code, resp.text))`}
              language="python"
              isDarkMode={isDarkMode}
            />

            <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Response (Status 200)
            </h3>
            <CodeBlock
              code={`{
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
}`}
              language="json"
              isDarkMode={isDarkMode}
            />
          </>
        )}

        <p className={`mb-4 mt-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Initialize P2P payout via SBP (Sistema Bystrykh Platezhey - Fast Payment System).
        </p>

        <p className={`mb-2 font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          HTTP Request via SSL
        </p>
        <p className={`mb-4 font-mono text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          POST '/api/v1/p2p/payout/sbp'
        </p>

        <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Query Parameters
        </h3>
        <ParamsTable
          headers={['Parameter', 'Mandatory', 'Description']}
          rows={[
            ['amount', 'yes', 'Payout amount in cents'],
            ['currency', 'yes', 'Currency code (RUB)'],
            ['phone', 'yes', 'Phone number'],
            ['callbackUrl', 'no', 'Callback URL'],
          ]}
          isDarkMode={isDarkMode}
        />
      </div>

      {/* Payout Account */}
      <div id="p2p-payout-account" className="scroll-mt-24 mt-12">
        <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Payout Account
        </h2>

        {selectedLanguage === 'cURL' && (
          <>
            <CodeBlock
              code={`curl "https://business.kotulapay.com/api/v1/p2p/payout/account" \\
    -X POST \\
    -H "Authorization: Bearer merchant_private_key" \\
    -H "Content-Type: application/json" -d '{
        "amount": 1000,
        "currency": "RUB",
        "account": "40817810099910004312",
        "bankCode": "044525225",
        "callbackUrl": "https://example.com/callback"
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
  "token": "[payout token]",
  "payout": {
    "amount": "1000",
    "currency": "RUB",
    "status": "pending|approved|declined"
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
              code={`from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse, HttpResponseNotFound
from django.views.decorators.csrf import csrf_exempt
import requests
import json

def payout(request):
    MERCHANT_PRIVATE_KEY = 'your-merchant-private-key'
    LIVE_URL = 'https://business.kotulapay.com'
    SANDBOX_URL = 'https://business.kotulapay.com'

    payload = {
        "amount": 1000,
        "currency": "RUB",
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
        return HttpResponse('<html><body><span>Something gone wrong: %s</span> : %s</body></html>' % (resp.status_code, resp.text))`}
              language="python"
              isDarkMode={isDarkMode}
            />

            <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Response (Status 200)
            </h3>
            <CodeBlock
              code={`{
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
}`}
              language="json"
              isDarkMode={isDarkMode}
            />
          </>
        )}

        <p className={`mb-4 mt-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Initialize P2P payout to bank account.
        </p>

        <p className={`mb-2 font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          HTTP Request via SSL
        </p>
        <p className={`mb-4 font-mono text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          POST '/api/v1/p2p/payout/account'
        </p>

        <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Query Parameters
        </h3>
        <ParamsTable
          headers={['Parameter', 'Mandatory', 'Description']}
          rows={[
            ['amount', 'yes', 'Payout amount in cents'],
            ['currency', 'yes', 'Currency code (RUB)'],
            ['account', 'yes', 'Bank account number'],
            ['bankCode', 'yes', 'Bank code (BIC)'],
            ['callbackUrl', 'no', 'Callback URL'],
          ]}
          isDarkMode={isDarkMode}
        />
      </div>
    </section>
  );
}