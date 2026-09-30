import MarkdownRenderer from "../../components/MarkdownRenderer";

const content = `# Billing & RUB

Aporto uses a prepaid USD balance. Requests are charged from that balance at the active model tariff; there is no subscription charge for API usage.

## Live prices

[Open the live model catalog →](/capabilities/ai-models?tab=pricing)

The catalog reads the gateway's current \`default\` group tariffs and quota unit. It does not maintain a second hand-written model list. Models with conditional tariffs show their published rate variants rather than one flattened fixed price.

## Rouble estimates

[Открыть актуальный прайс в рублях →](/capabilities/ai-models?tab=pricing&lang=ru)

For Russian readers, each live USD tariff is converted by this rule:

**RUB estimate = USD tariff × effective CBR USD/RUB rate × 1.40**

The commercial RUB-per-USD rate is rounded up to four decimal places. The page shows the CBR effective date and the time the quote was checked. The latest already-effective rate remains valid until the next rate takes effect. A rate dated after the current Moscow calendar day is rejected and never shown early.

If the CBR quote is unavailable, the USD catalog remains available and the page explicitly marks the RUB estimate unavailable. No fallback or invented exchange rate is used.

## Paying in roubles

[Open RUB top-up in the dashboard →](https://app.aporto.tech/dashboard?topup=rub&lang=ru)

Current RUB payments credit the account's USD balance. The quote shown before payment uses the current rule above; an issued invoice specifies its rate and USD amount. Ask the manager to reconcile an older unpaid invoice before payment. Completed payments keep their stored accounting amounts and are not repriced by later CBR changes.

Displayed catalog amounts are reference estimates. The payment quote or issued invoice is the payable amount and takes precedence.

## Usage

Input, output, cache, image, and other billable units can have different rates. Use the selected model's live price lines and endpoint marker. The account's usage history is authoritative for completed requests.`;

export default function BillingPage() {
    return <MarkdownRenderer content={content} />;
}
