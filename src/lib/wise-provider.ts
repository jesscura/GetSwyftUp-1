type FxQuote = {
  id: string;
  provider: "WISE";
  sourceCurrency: string;
  destinationCurrency: string;
  rate: number;
  fee: number;
  expiresAt: string;
  createdAt: string;
  metadata?: Record<string, unknown>;
};

type Transfer = {
  providerRef: string;
  status: "pending" | "processing" | "paid" | "failed";
  estimatedArrival?: string;
  metadata?: Record<string, unknown>;
};

type Recipient = {
  id: string;
  metadata?: Record<string, unknown>;
};

const randomId = () =>
  typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;

const randomShort = (length = 6) => randomId().replace(/-/g, "").slice(-length);

export class WiseProvider {
  async getFXQuote(sourceCurrency: string, destinationCurrency: string, amount: number): Promise<FxQuote> {
    const rate = destinationCurrency === "MXN" ? 17.3 : destinationCurrency === "EUR" ? 0.91 : 1;
    const fee = Math.max(5, amount * 0.003);
    const quote: FxQuote = {
      id: `fx_${randomShort(6)}`,
      provider: "WISE",
      sourceCurrency,
      destinationCurrency,
      rate,
      fee,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
      metadata: {
        raw: { rate, fee, sourceCurrency, destinationCurrency },
      },
    };
    return quote;
  }

  async createRecipient(contractorBankDetails: Record<string, unknown>): Promise<Recipient> {
    return {
      id: `rcp_${randomShort(8)}`,
      metadata: { bankCountry: contractorBankDetails.bankCountry, currency: contractorBankDetails.currency },
    };
  }

  async createTransfer(payoutId: string, recipientId: string, amount: number, currency: string): Promise<Transfer> {
    return {
      providerRef: `wise-${randomShort(6)}`,
      status: "pending",
      estimatedArrival: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      metadata: { payoutId, recipientId, amount, currency },
    };
  }

  async getTransferStatus(providerRef: string): Promise<Transfer> {
    return {
      providerRef,
      status: "paid",
      estimatedArrival: new Date().toISOString(),
      metadata: { checkedAt: new Date().toISOString() },
    };
  }
}

export const wiseProvider = new WiseProvider();
