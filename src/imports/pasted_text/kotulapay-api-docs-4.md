P2P
Kotulapay p2p payment processing REST API.

Payment
Code:
Copy

<?php

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
?>

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

<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://business.kotulapay.com/api/v1/payouts",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "{ \"amount\" : 1000, \"currency\" : \"RUB\", \"orderNumber\" : \"10001\", \"extraReturnParam\" : \"test payout\", \"bank_account\": { \"bank_name\" : \"sber\", \"requisite_type\" : \"card\" }, \"card\": { \"pan\" : \"4276111152393643\" }, \"customer\": { \"email\" : \"test@kotulapay.com\", \"address\" : \"test test\", \"ip\" : \"1.1.1.1\"}"\n}",
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

<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://business.kotulapay.com/api/v1/payouts",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "{ \"amount\" : 1000, \"currency\" : \"RUB\", \"orderNumber\" : \"10001\", \"extraReturnParam\" : \"test payout\", \"bank_account\": { \"bank_name\" : \"sber\", \"requisite_type\" : \"sbp\" }, \"customer\": { \"email\" : \"test@kotulapay.com\",\"phone\" : \"79998889900\", \"address\" : \"test test\", \"ip\" : \"1.1.1.1\"}"\n}",
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

<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://business.kotulapay.com/api/v1/payouts",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "{ \"amount\" : 1000, \"currency\" : \"RUB\", \"orderNumber\" : \"10001\", \"extraReturnParam\" : \"test payout\", \"bank_account\": { \"bank_name\" : \"sber\", \"requisite_type\" : \"account\", \"account_number\" : \"1234567891123456\" }, \"customer\": { \"email\" : \"test@kotulapay.com\", \"address\" : \"test test\", \"ip\" : \"1.1.1.1\"}"\n}",
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
