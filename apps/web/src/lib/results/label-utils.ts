export const getProductInterestLabel = (productInterest: string) => {
  switch (productInterest) {
    case "etfs":
      return "ETFs";
    case "stocks":
      return "Stocks";
    case "sukuk":
      return "Sukuk";
    case "crypto":
      return "Crypto";
    case "real_estate":
      return "Real Estate";
    case "gold":
      return "Gold";
    case "mutual_funds":
      return "Mutual Funds";
    default:
      return "All Products";
  }
};

export const getInvestorLabel = (investorType: string) => {
  switch (investorType) {
    case "beginner":
      return "Beginner";
    case "self_directed":
      return "Self-directed";
    case "long_term_saver":
      return "Long-term Saver";
    default:
      return "Any";
  }
};
