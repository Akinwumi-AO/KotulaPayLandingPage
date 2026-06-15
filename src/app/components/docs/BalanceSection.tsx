import { CodeBlock } from './CodeBlock';

interface BalanceSectionProps {
  isDarkMode: boolean;
  selectedLanguage: string;
}

export function BalanceSection({ isDarkMode, selectedLanguage }: BalanceSectionProps) {
  return (
    <section id="balance" className="mt-16 scroll-mt-24">
      <h1 className={`text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Balance
      </h1>
      <p className={`text-lg leading-relaxed mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        Check your account balance.
      </p>

      {/* Receive Balance */}
      <div id="balance-receive" className="scroll-mt-24 mt-12">
        <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Receive Balance
        </h2>

        {selectedLanguage === 'cURL' && (
          <>
            <CodeBlock
              code={`curl "https://business.kotulapay.com/api/v1/balance?currency=CNY" \\
    -X GET \\
    -H "Authorization: Bearer merchant_private_key" \\
    -H "Content-Type: application/json"`}
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
  "errors": [],
  "wallet": {
    "available": 0,
    "hold": 0,
    "currency": "CNY"
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

def balance(request):
    MERCHANT_PRIVATE_KEY = 'merchant_private_key'
    LIVE_URL = 'https://business.kotulapay.com'
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
        return HttpResponse('<html><body><span>Something gone wrong: %s</span> : %s</body></html>' % (resp.status_code, resp.text))`}
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
  "errors": [],
  "wallet": {
    "available": 0,
    "hold": 0,
    "currency": "CNY"
  }
}`}
              language="json"
              isDarkMode={isDarkMode}
            />
          </>
        )}

        <p className={`mb-4 mt-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Retrieve your current account balance across all currencies.
        </p>

        <p className={`mb-2 font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          HTTP Request via SSL
        </p>
        <p className={`mb-4 font-mono text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          GET '/api/v1/balance'
        </p>

        <h3 className={`text-lg font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Response Fields
        </h3>
        <div className={`rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} overflow-hidden`}>
          <table className="w-full">
            <thead className={isDarkMode ? 'bg-[#161b22]' : 'bg-gray-50'}>
              <tr>
                <th className={`px-4 py-3 text-left text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Field</th>
                <th className={`px-4 py-3 text-left text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Description</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
              <tr>
                <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>currency</td>
                <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Currency code</td>
              </tr>
              <tr>
                <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>amount</td>
                <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Available balance in cents</td>
              </tr>
              <tr>
                <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>blocked</td>
                <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Blocked amount in cents</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}