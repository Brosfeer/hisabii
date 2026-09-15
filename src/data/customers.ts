export type CustomerStatus = "active" | "overdue" | "settled";

export interface Customer {
  id: string;
  accountNumber: string;
  nameAr: string;
  nameEn: string;
  phone: string;
  balance: number; // Positive = Customer owes money (مدين / عليه), Negative = Store owes customer (دائن / له), 0 = Settled (خالص)
  currency: string;
  status: CustomerStatus;
  lastTransactionDate: string;
  totalTransactions: number;
}

export const CUSTOMER_SEEDS: Customer[] = [
  {
    id: "cust-1",
    accountNumber: "ACC-1001",
    nameAr: "أحمد المنصور",
    nameEn: "Ahmed Al-Mansoor",
    phone: "+966 50 123 4567",
    balance: 1450.50,
    currency: "SAR",
    status: "active",
    lastTransactionDate: "2026-09-14",
    totalTransactions: 12,
  },
  {
    id: "cust-2",
    accountNumber: "ACC-1002",
    nameAr: "سارة القحطاني",
    nameEn: "Sara Al-Qahtani",
    phone: "+966 55 987 6543",
    balance: 3200.00,
    currency: "SAR",
    status: "overdue",
    lastTransactionDate: "2026-08-28",
    totalTransactions: 24,
  },
  {
    id: "cust-3",
    accountNumber: "ACC-1003",
    nameAr: "محمد بن سلطان",
    nameEn: "Mohammed Bin Sultan",
    phone: "+966 54 321 0987",
    balance: 0.00,
    currency: "SAR",
    status: "settled",
    lastTransactionDate: "2026-09-12",
    totalTransactions: 8,
  },
  {
    id: "cust-4",
    accountNumber: "ACC-1004",
    nameAr: "فاطمة العمري",
    nameEn: "Fatima Al-Omari",
    phone: "+966 56 456 7890",
    balance: 620.75,
    currency: "SAR",
    status: "active",
    lastTransactionDate: "2026-09-10",
    totalTransactions: 5,
  },
  {
    id: "cust-5",
    accountNumber: "ACC-1005",
    nameAr: "خالد الدوسري",
    nameEn: "Khalid Al-Dossary",
    phone: "+966 53 789 0123",
    balance: 8450.00,
    currency: "SAR",
    status: "overdue",
    lastTransactionDate: "2026-08-15",
    totalTransactions: 31,
  },
  {
    id: "cust-6",
    accountNumber: "ACC-1006",
    nameAr: "ريم الزهراني",
    nameEn: "Reem Al-Zahrani",
    phone: "+966 50 654 3210",
    balance: -250.00, // Credit / Store owes her
    currency: "SAR",
    status: "active",
    lastTransactionDate: "2026-09-15",
    totalTransactions: 19,
  },
  {
    id: "cust-7",
    accountNumber: "ACC-1007",
    nameAr: "عبدالله العتيبي",
    nameEn: "Abdullah Al-Otaibi",
    phone: "+966 59 112 2334",
    balance: 0.00,
    currency: "SAR",
    status: "settled",
    lastTransactionDate: "2026-09-01",
    totalTransactions: 14,
  },
  {
    id: "cust-8",
    accountNumber: "ACC-1008",
    nameAr: "نورة الشمري",
    nameEn: "Noura Al-Shammari",
    phone: "+966 58 998 8776",
    balance: 1890.25,
    currency: "SAR",
    status: "active",
    lastTransactionDate: "2026-09-13",
    totalTransactions: 9,
  },
];

/**
 * Helper to lookup customer by ID
 */
export function getCustomerById(id: string): Customer | undefined {
  return CUSTOMER_SEEDS.find((c) => c.id === id);
}
