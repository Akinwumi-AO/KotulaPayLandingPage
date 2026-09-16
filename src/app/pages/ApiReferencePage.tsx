import { useState } from 'react';
import { motion } from 'motion/react';
import { Copy, Check, Code2, Zap, Lock, ArrowRight } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 rounded px-2 py-1 text-xs text-[#8b9eb0] hover:text-[#c5e063] hover:bg-white/5 transition-colors"
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

const JAVA_CODE = `import com.google.gson.Gson;
import okhttp3.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {

    public static void main(String[] args) {
        MediaType JSON = MediaType.parse("application/json; charset=utf-8");

        Map<String, Object> params = new HashMap<>();
        params.put("product", "Tests");
        params.put("amount", 100300);
        params.put("currency", "RUB");
        params.put("callbackUrl", "https://test.com");
        params.put("redirectSuccessUrl", "https://success.test.com/");
        params.put("redirectFailUrl", "https://declined.test.com/");

        Map<String, String> bankAccount = new HashMap<>();
        bankAccount.put("bank_name", "sber");
        bankAccount.put("requisite_type", "sbp/card/account/link");
        params.put("bank_account", bankAccount);

        Map<String, String> customer = new HashMap<>();
        customer.put("email", "test@test.com");
        customer.put("ip", "178.175.50.34");
        params.put("customer", customer);

        OkHttpClient client = new OkHttpClient();

        Request request = new Request.Builder()
                .url("https://business.kotulapay.com/api/v1/payments")
                .post(RequestBody.create(JSON, new Gson().toJson(params)))
                .addHeader("content-type", "application/json")
                .addHeader("authorization", "Bearer merchant_private_key")
                .build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                e.printStackTrace();
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                System.out.println(response.body().string());
            }
        });
    }
}`;

const PHP_CODE = `<?php

$curl = curl_init();

$data = [
    "product" => "Tests",
    "amount" => 100300,
    "currency" => "RUB",
    "callbackUrl" => "https://test.com",
    "redirectSuccessUrl" => "https://success.test.com/",
    "redirectFailUrl" => "https://declined.test.com/",
    "bank_account" => [
        "bank_name" => "sber",
        "requisite_type" => "sbp/card/account/link"
    ],
    "customer" => [
        "email" => "test@test.com",
        "ip" => "178.175.50.34"
    ]
];

curl_setopt_array($curl, array(
    CURLOPT_URL => "https://business.kotulapay.com/api/v1/payments",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "POST",
    CURLOPT_POSTFIELDS => json_encode($data),
    CURLOPT_HTTPHEADER => array(
        "authorization: Bearer merchant_private_key",
        "content-type: application/json"
    ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
    echo "cURL Error #:" . $err;
} else {
    echo $response;
}
?>`;

const PYTHON_CODE = `from django.http import HttpResponseRedirect, HttpResponse
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

    resp = requests.post(
        '%s/api/v1/payments' % (SANDBOX_URL),
        json=payload,
        headers=headers
    )

    if resp.status_code == 200:
        resp_payload = json.loads(resp.text)
        return HttpResponseRedirect(resp_payload['processingUrl'])
    else:
        return HttpResponse(
            '<html><body><span>Something gone wrong: %s</span></body></html>'
            % (resp.status_code)
        )`;

const RESPONSE_JSON = `{
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
}`;

const mainParams = [
  { param: 'product', mandatory: true, description: "Product name (Service description) (example: 'iPhone').", validation: 'minLength: 5, maxLength: 255' },
  { param: 'amount', mandatory: true, description: 'Payment amount in cents (10020), except JPY.', validation: 'minLength: 1, maxLength: 32' },
  { param: 'currency', mandatory: true, description: 'Currency code (CNY, EUR, USD, JPY).', validation: 'minLength: 3, maxLength: 3' },
  { param: 'callbackUrl', mandatory: true, description: 'The server URL a merchant will be notified about a payment finalisation.', validation: 'Valid URI format' },
  { param: 'redirectSuccessUrl', mandatory: false, description: 'The URL a customer will be redirected to in the case of successful payment.', validation: 'Valid URI format' },
  { param: 'redirectFailUrl', mandatory: false, description: 'The URL a customer will be redirected to in the case of payment error or failure.', validation: 'Valid URI format' },
  { param: 'extraReturnParam', mandatory: false, description: 'Bank/Payment method list, description, etc.', validation: 'minLength: 1, maxLength: 1024' },
  { param: 'orderNumber', mandatory: false, description: 'The current order number from a company system.', validation: 'minLength: 3, maxLength: 255 (string)' },
  { param: 'locale', mandatory: false, description: 'The locale used on a payment page. Currently supported: en, zh, jp (ISO 639-1).', validation: 'minLength: 2, maxLength: 5 (string)' },
  { param: 'bank_account', mandatory: false, description: 'Bank details object for p2p payments.', validation: '—' },
  { param: 'customer', mandatory: true, description: 'Customer object for Host2Host payments.', validation: '—' },
];

const bankParams = [
  { param: 'bank_name', mandatory: false, description: 'Customer bank name: sberbank / tbank / raiffeisen / uralsib / alfabank / sovcombank / humo / uzcard' },
  { param: 'requisite_type', mandatory: false, description: 'Requisite type for payment: sbp / card / account / link' },
];

const customerParams = [
  { param: 'email', mandatory: true, description: "Customer's email. Mandatory if Customer object is posted.", validation: 'Valid email format' },
  { param: 'ip', mandatory: false, description: 'Customer IP address.', validation: 'Valid IP address format (XX.XX.XX.XX)' },
];

const PAYOUT_JAVA_CODE = `import com.google.gson.Gson;
import okhttp3.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {

    public static void main(String[] args) {
        MediaType JSON = MediaType.parse("application/json; charset=utf-8");

        Map<String, Object> params = new HashMap<>();
        params.put("amount", 1000);
        params.put("currency", "RUB");
        params.put("orderNumber", "10001");
        params.put("callbackUrl", "https://test.com");

        Map<String, String> bankAccount = new HashMap<>();
        bankAccount.put("bank_name", "sber");
        bankAccount.put("requisite_type", "card");
        params.put("bank_account", bankAccount);

        Map<String, String> card = new HashMap<>();
        card.put("pan", "4627342642639018");
        params.put("card", card);

        Map<String, String> customer = new HashMap<>();
        customer.put("email", "test@test.com");
        customer.put("ip", "178.175.20.33");
        customer.put("first_name", "Иванов");
        customer.put("last_name", "Иван");
        customer.put("middle_name", "Иванович");
        customer.put("phone", "79998889900");
        params.put("customer", customer);

        OkHttpClient client = new OkHttpClient();

        // Создаем запрос
        Request request = new Request.Builder()
                .url("https://business.kotulapay.com/api/v1/payouts")
                .post(RequestBody.create(JSON, new Gson().toJson(params)))
                .addHeader("content-type", "application/json")
                .addHeader("authorization", "Bearer merchant_private_key")
                .build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                System.err.println("onFailure(): " + e.getMessage());
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                String resp = response.body().string();
                System.out.println("onResponse(): " + resp);
            }
        });
    }
}`;

const PAYOUT_PHP_CODE = `<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://business.kotulapay.com/api/v1/payouts",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => json_encode([
    "amount" => 1000,
    "currency" => "RUB",
    "orderNumber" => "10001",
    "extraReturnParam" => "test payout",
    "bank_account" => [
      "bank_name" => "sber",
      "requisite_type" => "card"
    ],
    "card" => [
      "pan" => "4276111152393643"
    ],
    "customer" => [
      "email" => "test@kotulapay.com",
      "address" => "test test",
      "ip" => "1.1.1.1"
    ]
  ]),
  CURLOPT_HTTPHEADER => array(
    "authorization: Bearer edf526c5374796cdcec5dce731405cee",
    "content-type: application/json"
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}
?>`;

const PAYOUT_PYTHON_CODE = `from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse, HttpResponseNotFound
from django.views.decorators.csrf import csrf_exempt
import requests
import json

def payout(request):

    MERCHANT_PRIVATE_KEY = 'your-merchant-private-key'
    LIVE_URL = 'https://business.kotulapay.com'
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

    resp = requests.post(
        '%s/api/v1/payouts' % (SANDBOX_URL),
        json=payload,
        headers=headers
    )

    if resp.status_code == 200:
        resp_o = json.loads(resp.text)
        return HttpResponseRedirect(resp_o['processingUrl'])
    else:
        return HttpResponse(
            '<html><body><span>Something gone wrong: %s</span> : %s</body></html>'
            % (resp.status_code, resp.text)
        )`;

const PAYOUT_CURL_CODE = `curl "https://business.kotulapay.com/api/v1/payouts" \\
    -X POST \\
    -H "Authorization: Bearer merchant_private_key" \\
    -H "Content-Type: application/json" -d '{
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
    }'`;

const PAYOUT_RESPONSE_JSON = `{
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
}`;

const payoutMainParams = [
  { param: 'amount', mandatory: true, description: 'Payout amount in cents (e.g. 100000 = 1000.00 RUB), except JPY.', validation: 'minLength: 1, maxLength: 32' },
  { param: 'currency', mandatory: true, description: 'Currency code (RUB, CNY, EUR, USD, JPY).', validation: 'minLength: 3, maxLength: 3' },
  { param: 'orderNumber', mandatory: false, description: 'The current order number from the merchant system.', validation: 'minLength: 3, maxLength: 255 (string)' },
  { param: 'callbackUrl', mandatory: true, description: 'The server URL the merchant will be notified about payout finalisation.', validation: 'Valid URI format' },
  { param: 'bank_account', mandatory: true, description: 'Bank details object specifying the bank and requisite type.', validation: '—' },
  { param: 'card', mandatory: true, description: 'Card object containing the recipient card number.', validation: '—' },
  { param: 'customer', mandatory: true, description: 'Customer object with identity and contact details.', validation: '—' },
];

const payoutBankParams = [
  { param: 'bank_name', mandatory: false, description: 'Recipient bank name: sberbank / tbank / raiffeisen / uralsib / alfabank / sovcombank / humo / uzcard' },
  { param: 'requisite_type', mandatory: false, description: 'Requisite type for payout: sbp / card / account / link' },
];

const payoutCardParams = [
  { param: 'pan', mandatory: true, description: 'Recipient card number (PAN).', validation: '16-digit card number' },
];

const payoutCustomerParams = [
  { param: 'email', mandatory: true, description: "Customer's email address.", validation: 'Valid email format' },
  { param: 'ip', mandatory: false, description: 'Customer IP address.', validation: 'Valid IP address format (XX.XX.XX.XX)' },
  { param: 'first_name', mandatory: false, description: 'Customer first name.', validation: 'string' },
  { param: 'last_name', mandatory: false, description: 'Customer last name.', validation: 'string' },
  { param: 'middle_name', mandatory: false, description: 'Customer middle name (patronymic).', validation: 'string' },
  { param: 'phone', mandatory: false, description: 'Customer phone number (e.g. 79998889900).', validation: 'string' },
];

function KeywordHighlight({ code }: { code: string }) {
  const lines = code.split('\n');
  return (
    <code className="font-mono text-sm leading-relaxed">
      {lines.map((line, i) => (
        <div key={i} className="flex">
          <span className="select-none w-10 shrink-0 text-right pr-4 text-[#3d4f5e]">{i + 1}</span>
          <span dangerouslySetInnerHTML={{ __html: highlightLine(line) }} />
        </div>
      ))}
    </code>
  );
}

function highlightLine(line: string): string {
  return line
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"([^"]*)"/g, (_, g) => `<span style="color:#c5e063">"${g}"</span>`)
    .replace(/\b(import|public|class|static|void|new|return|throws|true|false|null)\b/g, (m) => `<span style="color:#7dd3fc">${m}</span>`)
    .replace(/\b(Map|String|Object|OkHttpClient|Request|Callback|Response|MediaType|IOException|Override|RequestBody|HashMap|Call)\b/g, (m) => `<span style="color:#f9a8d4">${m}</span>`)
    .replace(/\/\/(.*)/g, (_, g) => `<span style="color:#4a6375">//${g}</span>`)
    .replace(/\b(\d+)\b/g, (m) => `<span style="color:#fb923c">${m}</span>`);
}

function PhpHighlight({ code }: { code: string }) {
  const lines = code.split('\n');
  return (
    <code className="font-mono text-sm leading-relaxed">
      {lines.map((line, i) => (
        <div key={i} className="flex">
          <span className="select-none w-10 shrink-0 text-right pr-4 text-[#3d4f5e]">{i + 1}</span>
          <span dangerouslySetInnerHTML={{ __html: highlightPhpLine(line) }} />
        </div>
      ))}
    </code>
  );
}

function highlightPhpLine(line: string): string {
  return line
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"([^"]*)"/g, (_, g) => `<span style="color:#c5e063">"${g}"</span>`)
    .replace(/\b(echo|if|else|array|true|false|null|return)\b/g, (m) => `<span style="color:#7dd3fc">${m}</span>`)
    .replace(/\b(curl_init|curl_setopt_array|curl_exec|curl_error|curl_close|json_encode)\b/g, (m) => `<span style="color:#f9a8d4">${m}</span>`)
    .replace(/\b(CURLOPT_URL|CURLOPT_RETURNTRANSFER|CURLOPT_ENCODING|CURLOPT_MAXREDIRS|CURLOPT_TIMEOUT|CURLOPT_HTTP_VERSION|CURLOPT_CUSTOMREQUEST|CURLOPT_POSTFIELDS|CURLOPT_HTTPHEADER|CURL_HTTP_VERSION_1_1)\b/g, (m) => `<span style="color:#e2a0ff">${m}</span>`)
    .replace(/(\$\w+)/g, (m) => `<span style="color:#7dd3fc">${m}</span>`)
    .replace(/\b(\d+)\b/g, (m) => `<span style="color:#fb923c">${m}</span>`)
    .replace(/(=&gt;)/g, (m) => `<span style="color:#8b9eb0">${m}</span>`);
}

function PythonHighlight({ code }: { code: string }) {
  const lines = code.split('\n');
  return (
    <code className="font-mono text-sm leading-relaxed">
      {lines.map((line, i) => (
        <div key={i} className="flex">
          <span className="select-none w-10 shrink-0 text-right pr-4 text-[#3d4f5e]">{i + 1}</span>
          <span dangerouslySetInnerHTML={{ __html: highlightPyLine(line) }} />
        </div>
      ))}
    </code>
  );
}

function highlightPyLine(line: string): string {
  return line
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/#(.*)/g, (_, g) => `<span style="color:#4a6375">#${g}</span>`)
    .replace(/"([^"]*)"/g, (_, g) => `<span style="color:#c5e063">"${g}"</span>`)
    .replace(/'([^']*)'/g, (_, g) => `<span style="color:#c5e063">'${g}'</span>`)
    .replace(/\b(from|import|def|if|else|return)\b/g, (m) => `<span style="color:#7dd3fc">${m}</span>`)
    .replace(/\b(requests|json|HttpResponseRedirect|HttpResponse)\b/g, (m) => `<span style="color:#f9a8d4">${m}</span>`)
    .replace(/\b(\d+)\b/g, (m) => `<span style="color:#fb923c">${m}</span>`);
}

function JsonHighlight({ code }: { code: string }) {
  const highlighted = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"([^"]+)":/g, (_, g) => `<span style="color:#7dd3fc">"${g}"</span>:`)
    .replace(/: "([^"]*)"/g, (_, g) => `: <span style="color:#c5e063">"${g}"</span>`)
    .replace(/: (true|false|null)/g, (_, g) => `: <span style="color:#f9a8d4">${g}</span>`)
    .replace(/: (\d+)/g, (_, g) => `: <span style="color:#fb923c">${g}</span>`);
  return (
    <code
      className="font-mono text-sm leading-relaxed whitespace-pre"
      dangerouslySetInnerHTML={{ __html: highlighted }}
    />
  );
}

function ParamTable({ params, hasValidation = true }: { params: any[]; hasValidation?: boolean }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-white/5">
            <th className="px-4 py-3 text-left font-medium text-[#8b9eb0]">Parameter</th>
            <th className="px-4 py-3 text-left font-medium text-[#8b9eb0]">Mandatory</th>
            <th className="px-4 py-3 text-left font-medium text-[#8b9eb0]">Description</th>
            {hasValidation && <th className="px-4 py-3 text-left font-medium text-[#8b9eb0]">Validation</th>}
          </tr>
        </thead>
        <tbody>
          {params.map((p, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
              <td className="px-4 py-3">
                <code className="rounded bg-[#0d2433] px-2 py-0.5 font-mono text-[#c5e063]">{p.param}</code>
              </td>
              <td className="px-4 py-3">
                {p.mandatory ? (
                  <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs text-emerald-400">yes</span>
                ) : (
                  <span className="rounded-full bg-white/5 px-2 py-0.5 text-xs text-[#8b9eb0]">no</span>
                )}
              </td>
              <td className="px-4 py-3 text-[#a0b4c4] leading-relaxed">{p.description}</td>
              {hasValidation && <td className="px-4 py-3 font-mono text-xs text-[#6b7f8f]">{p.validation}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const NOTIFICATION_PARAMS = `{
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
}`;

const BANKING_NOTIFICATION_PARAMS = `{
  "subject": "account | transfer | compliance",
  "token": "transfer token | profile token",
  "status": "approved | pending | declined",
  "message" : "any comments from the system operator",
  "data" : {
      "account": {
          "number" : "IBAN or account number",
          "swift" : "valid SWIFT code"
      },
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
      },
      "compliance": {
          "compliance_status":"documents_required | pending | approved  | declined"
      }
  }
}`;

const ERROR_EXAMPLES = [
  `{'success': false, 'result': 1, 'status': 403, 'errors': [{'code': 'merchant_not_found', 'kind': 'api_error'}]}`,
  `{'success': false, 'result': 1, 'status': 403, 'errors': [{'code': 'user_not_found', 'kind': 'api_error'}]}`,
  `{'success': false, 'result': 1, 'status': 502, 'errors': [{'code': 'fetch_processing_url_error', 'kind': 'api_error'}]}`,
  `{'success': false, 'result': 1, 'status': 502, 'errors': [{'code': 'invalid_json', 'kind': 'api_error'}]}`,
  `{'success': false, 'result': 1, 'status': 403, 'errors': [{'code': 'balance_less_than_amount', 'kind': 'processing_error'}]}`,
  `{'success': false, 'result': 1, 'status': 403, 'errors': [{'code': 'absent_keys:pay/payout', 'kind': 'settings_error'}]}`,
  `{'success': false, 'result': 1, 'status': 403, 'errors': [{'code': 'absent_keys:currency', 'kind': 'settings_error'}]}`,
  `{'success': false, 'result': 1, 'status': 403, 'errors': [{'code': 'auth_header_not_found', 'kind': 'authentication_error'}]}`,
  `{'success': false, 'result': 1, 'status': 403, 'errors': [{'code': 'unknown_auth_header', 'kind': 'authentication_error'}]}`,
  `{'success': false, 'result': 1, 'status': 403, 'errors': [{'code': 'amount_less_than_minimum', 'kind': 'invalid_request_error'}]}`,
  `{'success': false, 'result': 1, 'status': 403, 'errors': [{'code': 'customer_email_not_found', 'kind': 'invalid_request_error'}]}`,
  `{'success': false, 'result': 1, 'status': 403, 'errors': [{'code': 'absent_host2host_mode', 'kind': 'invalid_request_error'}]}`,
  `{'success': false, 'result': 1, 'status': 403, 'errors': [{'code': 'payment_in_final_state', 'kind': 'invalid_request_error'}]}`,
  `{'success': false, 'result': 1, 'status': 403, 'errors': [{'code': 'payment_not_found', 'kind': 'invalid_request_error'}]}`,
  `{'success': false, 'result': 1, 'status': 403, 'errors': [{'code': 'settings_are_absent', 'kind': 'invalid_request_error'}]}`,
];

const PAYMENT_STATES = [
  { state: 'init', final: 'no', description: 'Request to API will initiate payments.' },
  { state: 'pending', final: 'no', description: 'User redirected to the ReactivePay Checkout facility during processing.' },
  { state: 'approved', final: 'yes', description: 'Successfully completed payment.' },
  { state: 'declined', final: 'yes', description: 'Unsuccessful payment.' },
  { state: 'expired', final: 'no', description: 'The transaction has expired due to timeout but may still be processed.' },
];

const ERROR_KINDS = [
  { kind: 'api_error', description: 'Indicate rare occasions such as an ReactivePay API server technicality.' },
  { kind: 'authentication_error', description: 'Authentication request failure.' },
  { kind: 'invalid_request_error', description: 'Invalid parameters which produce invalid requests.' },
  { kind: 'processing_error', description: 'Processing the payment generated an error.' },
  { kind: 'settings_error', description: 'Incorrect settings.' },
  { kind: 'gateway_error', description: 'Gateway responded with an error.' },
  { kind: 'http_error', description: 'HTTP/HTTPS error.' },
];

const ERROR_CODE_GROUPS = [
  {
    title: 'Api errors',
    codes: [
      { code: 'merchant_not_found', final: 'yes', description: 'No merchant found with this token.' },
      { code: 'fetch_processing_url_error', final: 'no', description: 'Failed to fetch processing URL.' },
      { code: 'invalid_json', final: 'no', description: 'Invalid JSON from provider.' },
      { code: 'user_not_found', final: 'yes', description: 'No information found about the merchant with merchant_private_key.' },
      { code: 'card_token_is_blank', final: 'no', description: 'Card token is blank.' },
      { code: 'payment_already_has_pending_dispute', final: 'yes', description: 'Payment already has a pending dispute.' },
      { code: 'content_type_not_allowed', final: 'no', description: 'Request content_type not allowed.' },
      { code: 'requisite_not_found', final: 'yes', description: 'Required requisite not found.' },
      { code: 'action_skipped_due_to_debounce', final: 'no', description: 'Action skipped due to debounce.' },
      { code: 'core_api_error', final: 'no', description: 'Core API returned error.' },
      { code: 'no_route_match', final: 'yes', description: 'No route match for request.' },
      { code: 'order_number_already_exists', final: 'yes', description: 'Repeating an order of already identified order number.' },
    ],
  },
  {
    title: 'Settings errors',
    codes: [
      { code: 'absent_keys:pay/payout', final: 'no', description: 'Absent pay or payout key.' },
      { code: 'absent_keys:currency', final: 'no', description: 'Absent or incorrect currency value.' },
      { code: 'settings_are_absent', final: 'yes', description: 'Absent settings.' },
      { code: 'settings_for_placeholder_are_absent', final: 'yes', description: 'Settings for <...> are absent (placeholder for provider-specific key).' },
    ],
  },
  {
    title: 'Authentication errors',
    codes: [
      { code: 'auth_header_not_found', final: 'no', description: 'Absent Authorization key.' },
      { code: 'unknown_auth_header', final: 'no', description: 'Unknown or invalid Authorization header.' },
      { code: 'incorrect_private_key', final: 'no', description: 'The current private key cannot identify the user.' },
    ],
  },
  {
    title: 'Invalid request errors',
    codes: [
      { code: 'amount_less_than_minimum', final: 'no', description: 'Minimum payout amount has not been requested.' },
      { code: 'customer_email_not_found', final: 'no', description: 'Absent customer email.' },
      { code: 'absent_host2host_mode', final: 'no', description: 'Absent allow_host2host=true in settings when making request without card.' },
      { code: 'payment_in_final_state', final: 'yes', description: 'Payment has final status.' },
      { code: 'payment_not_found', final: 'yes', description: 'Payment not found.' },
      { code: 'token_description_document_are_required', final: 'no', description: 'Required params [:token, :description, :document] are missing.' },
      { code: 'filtered_traders_is_missing', final: 'no', description: 'Required param filtered_traders is missing.' },
      { code: 'bank_name_is_not_valid_choice', final: 'no', description: 'bank_name value not in allowed list.' },
    ],
  },
  {
    title: 'Processing errors',
    codes: [
      { code: 'balance_less_than_amount', final: 'no', description: 'Payout cannot be completed due to insufficient funds.' },
      { code: 'cant_create_dispute', final: 'yes', description: 'Cannot create dispute.' },
      { code: 'amount_no_money', final: 'yes', description: 'Insufficient funds.' },
      { code: 'no_money_available_on_refund', final: 'yes', description: 'No money available on refund.' },
      { code: 'commission_not_received', final: 'yes', description: 'Commission not received.' },
      { code: 'incorrect_amount', final: 'no', description: 'Absent or incorrect amount value.' },
    ],
  },
  {
    title: 'Gateway errors',
    codes: [
      { code: 'gateway_response_error: error', final: 'no', description: 'General gateway error.' },
      { code: 'gateway_response_error: unsupported_traffic', final: 'yes', description: 'Unsupported traffic type by gateway.' },
      { code: 'gateway_response_error: type_pay_card_is_not_a_valid_choice', final: 'yes', description: 'Invalid value for type_pay / card choice.' },
      { code: 'gateway_response_error: not_found_rate', final: 'yes', description: 'Rate not found in gateway.' },
      { code: 'gateway_response_error: trader_not_found', final: 'yes', description: 'Trader not found in gateway.' },
      { code: 'gateway_response_error: change_of_amount_is_not_supported', final: 'yes', description: 'Change of amount not supported by gateway.' },
    ],
  },
  {
    title: 'HTTP errors',
    codes: [
      { code: 'http_422_filtered_traders_is_missing', final: 'no', description: '422 response: filtered_traders is missing.' },
      { code: 'http_422_bank_name_is_not_in_allowed_list', final: 'no', description: '422 response: bank_name not in allowed list.' },
    ],
  },
];

const OPERATOR_RESPONSE = `{
  "success": true | false,
  "status": 200,
  "operator": "beeline"
}`;

export default function ApiReferencePage() {
  const [activeTab, setActiveTab] = useState<'java' | 'php' | 'python' | 'curl'>('java');
  const [payoutTab, setPayoutTab] = useState<'java' | 'php' | 'python' | 'curl'>('java');

  const curlCode = `curl "https://business.kotulapay.com/api/v1/payments" \\
    -X POST \\
    -H "Authorization: Bearer merchant_private_key" \\
    -H "Content-Type: application/json" -d '{
      "product": "Tests",
      "amount": 100300,
      "currency": "RUB",
      "callbackUrl": "https://test.com",
      "redirectSuccessUrl": "https://success.test.com/",
      "redirectFailUrl": "https://declined.test.com/",
      "pendingUrl": "https://pending.test.com/",
      "bank_account": {
          "bank_name": "sber",
          "requisite_type": "sbp/card/account/link"
      },
      "customer": {
          "email": "test@test.com",
          "ip": "178.175.50.34"
      }
    }'`;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-[#001c26] to-[#04403a] pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6">

          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <div className="mb-4 flex items-center gap-2 text-sm text-[#c5e063]">
              <Code2 className="h-4 w-4" />
              <span className="font-mono uppercase tracking-widest">API Reference</span>
            </div>
            <h1 className="mb-4 text-5xl font-bold text-white md:text-6xl">
              Initialize Payments
            </h1>
            <p className="max-w-2xl text-lg text-[#8b9eb0] leading-relaxed">
              To begin receiving payments, call the payments endpoint to obtain a payment token. Use redirect/GET to the <code className="text-[#c5e063] font-mono text-sm">processingUrl</code> after the request.
            </p>

            {/* Endpoint badge */}
            <div className="mt-8 inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-sm">
              <span className="rounded bg-emerald-500 px-2.5 py-0.5 font-mono text-xs font-bold text-white">POST</span>
              <code className="font-mono text-sm text-[#e2eef5]">https://business.kotulapay.com/api/v1/payments</code>
              <span className="flex items-center gap-1 text-xs text-[#8b9eb0]">
                <Lock className="h-3 w-3" /> SSL
              </span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_420px]">

            {/* Left: Docs */}
            <div className="space-y-10">

              {/* Query Parameters */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h2 className="mb-5 flex items-center gap-2 text-white">
                  <span className="flex h-6 w-6 items-center justify-center rounded bg-[#c5e063]/20 text-xs font-mono font-bold text-[#c5e063]">1</span>
                  Query Parameters
                </h2>
                <ParamTable params={mainParams} />
              </motion.section>

              {/* Bank Account Object */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <h2 className="mb-2 flex items-center gap-2 text-white">
                  <span className="flex h-6 w-6 items-center justify-center rounded bg-[#c5e063]/20 text-xs font-mono font-bold text-[#c5e063]">2</span>
                  Bank Account Payment Object
                </h2>
                <p className="mb-4 text-sm text-[#8b9eb0]">Parameters for <code className="text-[#c5e063] font-mono">bank_account</code> object used in P2P payments.</p>
                <ParamTable params={bankParams} hasValidation={false} />
              </motion.section>

              {/* Customer Object */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="mb-2 flex items-center gap-2 text-white">
                  <span className="flex h-6 w-6 items-center justify-center rounded bg-[#c5e063]/20 text-xs font-mono font-bold text-[#c5e063]">3</span>
                  Customer Object Parameters
                </h2>
                <p className="mb-4 text-sm text-[#8b9eb0]">Parameters for the <code className="text-[#c5e063] font-mono">customer</code> object used in Host2Host payments.</p>
                <ParamTable params={customerParams} />
              </motion.section>

              {/* Flow note */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="flex items-start gap-4 rounded-xl border border-[#c5e063]/20 bg-[#c5e063]/5 p-5"
              >
                <Zap className="mt-0.5 h-5 w-5 shrink-0 text-[#c5e063]" />
                <div>
                  <p className="font-medium text-[#c5e063] mb-1">After the request</p>
                  <p className="text-sm text-[#8b9eb0] leading-relaxed">
                    Redirect the customer to the <code className="text-[#c5e063] font-mono">processingUrl</code> received in the response using a HTTP GET redirect. This takes the customer to the hosted payment page.
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-sm text-[#8b9eb0]">
                    <span className="rounded bg-[#001c26] px-2 py-0.5 font-mono text-xs text-[#c5e063]">POST /api/v1/payments</span>
                    <ArrowRight className="h-3 w-3" />
                    <span className="rounded bg-[#001c26] px-2 py-0.5 font-mono text-xs text-[#c5e063]">GET processingUrl</span>
                  </div>
                </div>
              </motion.div>

            </div>

            {/* Right: Code + Response */}
            <div className="space-y-6">

              {/* Code block */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="sticky top-28"
              >
                <div className="rounded-2xl border border-white/10 bg-[#071822] overflow-hidden shadow-2xl">
                  {/* Tab bar */}
                  <div className="flex items-center justify-between border-b border-white/10 bg-[#051218] px-4 py-2">
                    <div className="flex gap-1">
                      {(['java', 'php', 'python', 'curl'] as const).map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`rounded px-3 py-1.5 font-mono text-xs transition-colors ${
                            activeTab === tab
                              ? 'bg-[#c5e063]/15 text-[#c5e063]'
                              : 'text-[#4a6375] hover:text-[#8b9eb0]'
                          }`}
                        >
                          {tab === 'java' ? 'Java' : tab === 'php' ? 'PHP' : tab === 'python' ? 'Python' : 'cURL'}
                        </button>
                      ))}
                    </div>
                    <CopyButton text={activeTab === 'java' ? JAVA_CODE : activeTab === 'php' ? PHP_CODE : activeTab === 'python' ? PYTHON_CODE : curlCode} />
                  </div>

                  {/* Code */}
                  <div className="max-h-[480px] overflow-y-auto scrollbar-visible p-4">
                    {activeTab === 'java' ? (
                      <KeywordHighlight code={JAVA_CODE} />
                    ) : activeTab === 'php' ? (
                      <PhpHighlight code={PHP_CODE} />
                    ) : activeTab === 'python' ? (
                      <PythonHighlight code={PYTHON_CODE} />
                    ) : (
                      <code className="block font-mono text-sm leading-relaxed whitespace-pre text-[#c5e063]/90">
                        {curlCode}
                      </code>
                    )}
                  </div>
                </div>

                {/* Response */}
                <div className="mt-6 rounded-2xl border border-white/10 bg-[#071822] overflow-hidden shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 bg-[#051218] px-4 py-2">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="font-mono text-xs text-[#8b9eb0]">Response — 200 OK</span>
                    </div>
                    <CopyButton text={RESPONSE_JSON} />
                  </div>
                  <div className="max-h-72 overflow-y-auto scrollbar-visible p-4">
                    <JsonHighlight code={RESPONSE_JSON} />
                  </div>
                </div>

                {/* Auth note */}
                <div className="mt-4 flex items-start gap-3 rounded-xl border border-white/8 bg-white/[0.03] p-4">
                  <Lock className="mt-0.5 h-4 w-4 shrink-0 text-[#8b9eb0]" />
                  <p className="text-xs text-[#6b7f8f] leading-relaxed">
                    Replace <code className="text-[#c5e063] font-mono">merchant_private_key</code> with your actual Bearer token from the Kotulapay merchant dashboard.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* ── Payout Card Section ── */}
          <div className="mt-24 border-t border-white/10 pt-20">

            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <div className="mb-4 flex items-center gap-2 text-sm text-[#c5e063]">
                <ArrowRight className="h-4 w-4" />
                <span className="font-mono uppercase tracking-widest">Payouts</span>
              </div>
              <h1 className="mb-4 text-5xl font-bold text-white md:text-6xl">
                Payout Card
              </h1>
              <p className="max-w-2xl text-lg text-[#8b9eb0] leading-relaxed">
                Create a payout operation to send funds to a recipient's card. Use GET to <code className="text-[#c5e063] font-mono text-sm">processingUrl</code> after the request.
              </p>
              <div className="mt-8 inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-sm">
                <span className="rounded bg-emerald-500 px-2.5 py-0.5 font-mono text-xs font-bold text-white">POST</span>
                <code className="font-mono text-sm text-[#e2eef5]">https://business.kotulapay.com/api/v1/payouts</code>
                <span className="flex items-center gap-1 text-xs text-[#8b9eb0]">
                  <Lock className="h-3 w-3" /> SSL
                </span>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_420px]">

              {/* Left: Payout Docs */}
              <div className="space-y-10">

                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h2 className="mb-5 flex items-center gap-2 text-white">
                    <span className="flex h-6 w-6 items-center justify-center rounded bg-[#c5e063]/20 text-xs font-mono font-bold text-[#c5e063]">1</span>
                    Query Parameters
                  </h2>
                  <ParamTable params={payoutMainParams} />
                </motion.section>

                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                >
                  <h2 className="mb-2 flex items-center gap-2 text-white">
                    <span className="flex h-6 w-6 items-center justify-center rounded bg-[#c5e063]/20 text-xs font-mono font-bold text-[#c5e063]">2</span>
                    Bank Account Object
                  </h2>
                  <p className="mb-4 text-sm text-[#8b9eb0]">Parameters for the <code className="text-[#c5e063] font-mono">bank_account</code> object.</p>
                  <ParamTable params={payoutBankParams} hasValidation={false} />
                </motion.section>

                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="mb-2 flex items-center gap-2 text-white">
                    <span className="flex h-6 w-6 items-center justify-center rounded bg-[#c5e063]/20 text-xs font-mono font-bold text-[#c5e063]">3</span>
                    Card Object
                  </h2>
                  <p className="mb-4 text-sm text-[#8b9eb0]">Parameters for the <code className="text-[#c5e063] font-mono">card</code> object containing the recipient card details.</p>
                  <ParamTable params={payoutCardParams} />
                </motion.section>

                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                >
                  <h2 className="mb-2 flex items-center gap-2 text-white">
                    <span className="flex h-6 w-6 items-center justify-center rounded bg-[#c5e063]/20 text-xs font-mono font-bold text-[#c5e063]">4</span>
                    Customer Object
                  </h2>
                  <p className="mb-4 text-sm text-[#8b9eb0]">Parameters for the <code className="text-[#c5e063] font-mono">customer</code> object with recipient identity details.</p>
                  <ParamTable params={payoutCustomerParams} />
                </motion.section>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex items-start gap-4 rounded-xl border border-[#c5e063]/20 bg-[#c5e063]/5 p-5"
                >
                  <Zap className="mt-0.5 h-5 w-5 shrink-0 text-[#c5e063]" />
                  <div>
                    <p className="font-medium text-[#c5e063] mb-1">After the request</p>
                    <p className="text-sm text-[#8b9eb0] leading-relaxed">
                      Use a GET request to the <code className="text-[#c5e063] font-mono">processingUrl</code> returned in the response to complete the payout operation.
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-sm text-[#8b9eb0]">
                      <span className="rounded bg-[#001c26] px-2 py-0.5 font-mono text-xs text-[#c5e063]">POST /api/v1/payouts</span>
                      <ArrowRight className="h-3 w-3" />
                      <span className="rounded bg-[#001c26] px-2 py-0.5 font-mono text-xs text-[#c5e063]">GET processingUrl</span>
                    </div>
                  </div>
                </motion.div>

              </div>

              {/* Right: Payout Code + Response */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="sticky top-28"
                >
                  <div className="rounded-2xl border border-white/10 bg-[#071822] overflow-hidden shadow-2xl">
                    <div className="flex items-center justify-between border-b border-white/10 bg-[#051218] px-4 py-2">
                      <div className="flex gap-1">
                        {(['java', 'php', 'python', 'curl'] as const).map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setPayoutTab(tab)}
                            className={`rounded px-3 py-1.5 font-mono text-xs transition-colors ${
                              payoutTab === tab
                                ? 'bg-[#c5e063]/15 text-[#c5e063]'
                                : 'text-[#4a6375] hover:text-[#8b9eb0]'
                            }`}
                          >
                            {tab === 'java' ? 'Java' : tab === 'php' ? 'PHP' : tab === 'python' ? 'Python' : 'cURL'}
                          </button>
                        ))}
                      </div>
                      <CopyButton text={payoutTab === 'java' ? PAYOUT_JAVA_CODE : payoutTab === 'php' ? PAYOUT_PHP_CODE : payoutTab === 'python' ? PAYOUT_PYTHON_CODE : PAYOUT_CURL_CODE} />
                    </div>
                    <div className="max-h-[480px] overflow-y-auto scrollbar-visible p-4">
                      {payoutTab === 'java' ? (
                        <KeywordHighlight code={PAYOUT_JAVA_CODE} />
                      ) : payoutTab === 'php' ? (
                        <PhpHighlight code={PAYOUT_PHP_CODE} />
                      ) : payoutTab === 'python' ? (
                        <PythonHighlight code={PAYOUT_PYTHON_CODE} />
                      ) : (
                        <code className="block font-mono text-sm leading-relaxed whitespace-pre text-[#c5e063]/90">
                          {PAYOUT_CURL_CODE}
                        </code>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl border border-white/10 bg-[#071822] overflow-hidden shadow-2xl">
                    <div className="flex items-center justify-between border-b border-white/10 bg-[#051218] px-4 py-2">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="font-mono text-xs text-[#8b9eb0]">Response — 200 OK</span>
                      </div>
                      <CopyButton text={PAYOUT_RESPONSE_JSON} />
                    </div>
                    <div className="max-h-72 overflow-y-auto scrollbar-visible p-4">
                      <JsonHighlight code={PAYOUT_RESPONSE_JSON} />
                    </div>
                  </div>

                  <div className="mt-4 flex items-start gap-3 rounded-xl border border-white/8 bg-white/[0.03] p-4">
                    <Lock className="mt-0.5 h-4 w-4 shrink-0 text-[#8b9eb0]" />
                    <p className="text-xs text-[#6b7f8f] leading-relaxed">
                      Replace <code className="text-[#c5e063] font-mono">merchant_private_key</code> with your actual Bearer token from the Kotulapay merchant dashboard.
                    </p>
                  </div>
                </motion.div>
              </div>

            </div>
          </div>

          {/* ── Notifications Section ── */}
          <div className="mt-24 border-t border-white/10 pt-20">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-10">
              <div className="mb-4 flex items-center gap-2 text-sm text-[#c5e063]">
                <span className="font-mono uppercase tracking-widest">Notifications</span>
              </div>
              <h2 className="mb-4 text-4xl font-bold text-white">Notifications</h2>
              <p className="max-w-3xl text-[#8b9eb0] leading-relaxed">
                Notifications with the payment or payout status are sent to your callback URL using POST methods. In case payment or payout status changed (pending/approved/declined) — notification type is sent accordingly.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
              <div>
                <h3 className="mb-3 text-lg font-semibold text-white">Params</h3>
                <div className="rounded-2xl border border-white/10 bg-[#071822] overflow-hidden">
                  <div className="flex items-center justify-between border-b border-white/10 bg-[#051218] px-4 py-2">
                    <span className="font-mono text-xs text-[#8b9eb0]">Notification Payload</span>
                    <CopyButton text={NOTIFICATION_PARAMS} />
                  </div>
                  <div className="p-4 overflow-x-auto">
                    <JsonHighlight code={NOTIFICATION_PARAMS} />
                  </div>
                </div>
                <p className="mt-4 text-sm text-[#8b9eb0] leading-relaxed">
                  <code className="text-[#c5e063] font-mono">callback</code> can be configured in the company's back office.<br />
                  We define a notification as "successfully being sent" only in the case that your server responded with a <strong className="text-white">200 HTTP status code</strong>. If your server responded with any error codes, we schedule recursive callbacks within a 1 hour interval, but not more than 9 times.
                </p>
              </div>

              <div>
                <h3 className="mb-3 text-lg font-semibold text-white">Banking Notifications</h3>
                <p className="mb-4 text-sm text-[#8b9eb0] leading-relaxed">
                  Notifications with the account or transfer status are sent to your callback URL using POST methods. In case account status changes, notification will be sent accordingly.
                </p>
                <div className="rounded-2xl border border-white/10 bg-[#071822] overflow-hidden">
                  <div className="flex items-center justify-between border-b border-white/10 bg-[#051218] px-4 py-2">
                    <span className="font-mono text-xs text-[#8b9eb0]">Banking Notification Payload</span>
                    <CopyButton text={BANKING_NOTIFICATION_PARAMS} />
                  </div>
                  <div className="p-4 max-h-80 overflow-y-auto">
                    <JsonHighlight code={BANKING_NOTIFICATION_PARAMS} />
                  </div>
                </div>
                <p className="mt-4 text-sm text-[#8b9eb0] leading-relaxed">
                  <code className="text-[#c5e063] font-mono">callback</code> can be configured in the company's back office or sent as a value of <code className="text-[#c5e063] font-mono">callback_url</code> parameter.
                </p>
              </div>
            </div>
          </div>

          {/* ── Dictionaries Section ── */}
          <div className="mt-24 border-t border-white/10 pt-20">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-10">
              <div className="mb-4 flex items-center gap-2 text-sm text-[#c5e063]">
                <span className="font-mono uppercase tracking-widest">Dictionaries</span>
              </div>
              <h2 className="mb-4 text-4xl font-bold text-white">Errors</h2>
              <p className="max-w-3xl text-[#8b9eb0] leading-relaxed">
                If any method failed, the JSON response with status code 403/502 returned that specified the problem.
              </p>
            </motion.div>

            {/* Error response examples */}
            <div className="mb-10 rounded-2xl border border-white/10 bg-[#071822] overflow-hidden">
              <div className="border-b border-white/10 bg-[#051218] px-4 py-2">
                <span className="font-mono text-xs text-[#8b9eb0]">Return status 403 and JSON</span>
              </div>
              <div className="p-4 space-y-2 font-mono text-sm text-[#c5e063]/80">
                {ERROR_EXAMPLES.map((ex, i) => (
                  <div key={i} className="leading-relaxed">{ex}</div>
                ))}
              </div>
            </div>

            {/* Payment States */}
            <div className="mb-10">
              <h3 className="mb-4 text-xl font-semibold text-white">Payment States</h3>
              <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="px-4 py-3 text-left font-medium text-[#8b9eb0]">State</th>
                      <th className="px-4 py-3 text-left font-medium text-[#8b9eb0]">Final</th>
                      <th className="px-4 py-3 text-left font-medium text-[#8b9eb0]">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PAYMENT_STATES.map((s, i) => (
                      <tr key={i} className="border-b border-white/5 hover:bg-white/[0.03]">
                        <td className="px-4 py-3"><code className="rounded bg-[#0d2433] px-2 py-0.5 font-mono text-[#c5e063]">{s.state}</code></td>
                        <td className="px-4 py-3">{s.final === 'yes' ? <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs text-emerald-400">yes</span> : <span className="rounded-full bg-white/5 px-2 py-0.5 text-xs text-[#8b9eb0]">no</span>}</td>
                        <td className="px-4 py-3 text-[#a0b4c4]">{s.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Kinds of errors */}
            <div className="mb-10">
              <h3 className="mb-4 text-xl font-semibold text-white">Kinds of Errors</h3>
              <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="px-4 py-3 text-left font-medium text-[#8b9eb0]">Kind</th>
                      <th className="px-4 py-3 text-left font-medium text-[#8b9eb0]">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ERROR_KINDS.map((k, i) => (
                      <tr key={i} className="border-b border-white/5 hover:bg-white/[0.03]">
                        <td className="px-4 py-3"><code className="rounded bg-[#0d2433] px-2 py-0.5 font-mono text-[#c5e063]">{k.kind}</code></td>
                        <td className="px-4 py-3 text-[#a0b4c4]">{k.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Codes of errors */}
            <h3 className="mb-6 text-xl font-semibold text-white">Codes of Errors</h3>
            <div className="space-y-8">
              {ERROR_CODE_GROUPS.map((group, gi) => (
                <div key={gi}>
                  <h4 className="mb-3 text-base font-medium text-[#c5e063]">{group.title}</h4>
                  <div className="overflow-x-auto rounded-xl border border-white/10">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/10 bg-white/5">
                          <th className="px-4 py-3 text-left font-medium text-[#8b9eb0]">Code</th>
                          <th className="px-4 py-3 text-left font-medium text-[#8b9eb0]">Final</th>
                          <th className="px-4 py-3 text-left font-medium text-[#8b9eb0]">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {group.codes.map((c, ci) => (
                          <tr key={ci} className="border-b border-white/5 hover:bg-white/[0.03]">
                            <td className="px-4 py-3"><code className="rounded bg-[#0d2433] px-2 py-0.5 font-mono text-[#c5e063] text-xs">{c.code}</code></td>
                            <td className="px-4 py-3">{c.final === 'yes' ? <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs text-emerald-400">yes</span> : <span className="rounded-full bg-white/5 px-2 py-0.5 text-xs text-[#8b9eb0]">no</span>}</td>
                            <td className="px-4 py-3 text-[#a0b4c4]">{c.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Operators Section ── */}
          <div className="mt-24 border-t border-white/10 pt-20">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-10">
              <div className="mb-4 flex items-center gap-2 text-sm text-[#c5e063]">
                <span className="font-mono uppercase tracking-widest">Operators</span>
              </div>
              <h2 className="mb-4 text-4xl font-bold text-white">Operator</h2>
              <p className="max-w-3xl text-[#8b9eb0] leading-relaxed">Return operator by phone.</p>
              <div className="mt-6 inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-sm">
                <span className="rounded bg-blue-500 px-2.5 py-0.5 font-mono text-xs font-bold text-white">GET</span>
                <code className="font-mono text-sm text-[#e2eef5]">/api/v1/operator</code>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_420px]">
              <div>
                <h3 className="mb-4 text-lg font-semibold text-white">Query Parameters</h3>
                <div className="overflow-x-auto rounded-xl border border-white/10">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/5">
                        <th className="px-4 py-3 text-left font-medium text-[#8b9eb0]">Parameter</th>
                        <th className="px-4 py-3 text-left font-medium text-[#8b9eb0]">Mandatory</th>
                        <th className="px-4 py-3 text-left font-medium text-[#8b9eb0]">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-white/5 hover:bg-white/[0.03]">
                        <td className="px-4 py-3"><code className="rounded bg-[#0d2433] px-2 py-0.5 font-mono text-[#c5e063]">phone</code></td>
                        <td className="px-4 py-3"><span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs text-emerald-400">yes</span></td>
                        <td className="px-4 py-3 text-[#a0b4c4]">Phone number.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <div className="rounded-2xl border border-white/10 bg-[#071822] overflow-hidden">
                  <div className="flex items-center justify-between border-b border-white/10 bg-[#051218] px-4 py-2">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="font-mono text-xs text-[#8b9eb0]">Response — 200 OK</span>
                    </div>
                    <CopyButton text={OPERATOR_RESPONSE} />
                  </div>
                  <div className="p-4">
                    <JsonHighlight code={OPERATOR_RESPONSE} />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}
