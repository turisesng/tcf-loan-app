import { Tool } from "@/components/tools/ToolCard";

// Sample tools data - in production, this comes from the database
export const sampleTools: Tool[] = [
  {
    id: "tl1a",
    code: "TL1A",
    name: "TCF Loan Repayment Calculator",
    description: "Calculate exactly how much you owe including interest, penalties, and any applicable waivers. Get a clear breakdown you can take to the bank.",
    price: 2000,
    category: "Calculator",
    isActive: true,
  },
  {
    id: "tl1b",
    code: "TL1B",
    name: "Bank Negotiation Letter Template",
    description: "Professional letter templates to help you negotiate better repayment terms with your bank. Includes multiple scenarios and follow-up letters.",
    price: 3000,
    category: "Template",
    isActive: true,
  },
  {
    id: "tl2a",
    code: "TL2A",
    name: "Payment Plan Proposal Generator",
    description: "Generate a professional payment plan proposal based on your income and loan amount. Banks are more likely to accept structured proposals.",
    price: 2500,
    category: "Generator",
    isActive: true,
  },
  {
    id: "tl2b",
    code: "TL2B",
    name: "Legal Rights Quick Guide",
    description: "Understand your rights as a TCF borrower. Know what banks can and cannot do, and how to protect yourself from harassment.",
    price: 1500,
    category: "Guide",
    isActive: true,
  },
  {
    id: "tl3a",
    code: "TL3A",
    name: "CBN Complaint Letter Template",
    description: "If your bank is not cooperating, use this template to escalate your case to the Central Bank of Nigeria consumer protection unit.",
    price: 2000,
    category: "Template",
    isActive: true,
  },
  {
    id: "tl3b",
    code: "TL3B",
    name: "Debt Recovery Response Kit",
    description: "How to respond professionally to debt recovery agents. Includes sample responses, know-your-rights guide, and documentation templates.",
    price: 3500,
    category: "Kit",
    isActive: true,
  },
];

export const categories = ["All", "Calculator", "Template", "Generator", "Guide", "Kit"];
