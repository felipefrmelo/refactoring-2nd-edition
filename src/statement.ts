interface Performance {
  playID: string;
  audience: number;
}

interface Invoice {
  customer: string;
  performances: Performance[];
}

interface Play {
  name: string;
  type: string;
}

interface PlayDictionary {
  [key: string]: Play;
}

function formatMoney(amount: number) {
  const { format } = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  });
  return format(amount);
}
export function statement(invoice: Invoice, plays: PlayDictionary) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;

  for (const perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = 0;

    switch (play.type) {
      case 'tragedy':
        thisAmount = 40000;

        if (perf.audience > 30) {
          thisAmount += 1000 * (perf.audience - 30);
        }
        break;
      case 'comedy':
        thisAmount = 30000;

        if (perf.audience > 20) {
          thisAmount += 10000 + 500 * (perf.audience - 20);
        }
        thisAmount += 300 * perf.audience;
        break;

      default:
        throw new Error(`unknow type: ${play.type}`);
    }

    // soma creditos por volume
    volumeCredits += Math.max(perf.audience - 30, 0);

    // soma um credito extra para cada 5 espectadores de comedia
    if (play.type === 'comedy') {
      volumeCredits += Math.floor(perf.audience / 5);
    }

    // exibe a linha para esta requisição
    result += `  ${play.name}: ${formatMoney(thisAmount / 100)} (${
      perf.audience
    } seats)\n`;
    totalAmount += thisAmount;
  }
  result += `Amount owed is ${formatMoney(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;

  return result;
}
