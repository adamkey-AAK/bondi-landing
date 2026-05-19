Bondi.cz – zprovoznění e-mailů z formuláře

Co je přidáno:
- api/contact.js = Vercel serverless funkce, která odešle e-mail přes Resend
- formulář ve src/main.jsx teď volá /api/contact
- package.json má novou závislost resend

Nutné nastavit ve Vercelu:
RESEND_API_KEY = API klíč z Resend
CONTACT_TO = kam mají chodit zprávy, např. adamkroc1@gmail.com
CONTACT_FROM = odesílatel, ideálně Bondi <hello@bondi.cz>

Po změně environment variables udělej ve Vercelu redeploy.
