Balance
Request current Kotulapay balance.

Receive Balance
Code:
Copy

OkHttpClient client = new OkHttpClient();

Request request = new Request.Builder()
  .url("https://business.kotulapay.com/api/v1/balance?currency=CNY")
  .get()
  .addHeader("content-type", "application/json")
  .addHeader("authorization", "Bearer merchant_private_key")
  .build();

Response response = client.newCall(request).execute();
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

OkHttpClient client = new OkHttpClient();

Request request = new Request.Builder()
  .url("https://business.kotulapay.com/api/v1/disputes")
  .get()
  .addHeader("content-type", "application/json")
  .addHeader("authorization", "Bearer merchant_private_key")
  .build();

Response response = client.newCall(request).execute();
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

MediaType JSON = MediaType.parse("application/json; charset=utf-8");

HashMap<String, Object> params = new HashMap<String, Object>();

params.put("token", "XsKkj4kmSjNATwoJdoiwwCmEKbT5efZX");
params.put("description", "test description");
params.put("document", "/home/test/Pictures/Screenshot from 2024-04-12 17-38-19.png");

OkHttpClient client = new OkHttpClient();

Request request = new Request.Builder()
       .url("https://business.kotulapay.com/api/v1/disputes")
       .post(RequestBody.create(JSON, new Gson().toJson(params)))
       .addHeader("content-type", "application/json")
       .addHeader("authorization", "Bearer merchant_private_key")
       .build();

Call call = client.newCall(request);

call.enqueue(new Callback() {

   @Override
   public void onFailure(Call call, IOException e) {
       Log.e("response ", "onFailure(): " + e.getMessage() );
   }

   @Override
   public void onResponse(Call call, Response response) throws IOException {
       String resp = response.body().string();
       Log.e("response ", "onResponse(): " + resp );
   }
});
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
