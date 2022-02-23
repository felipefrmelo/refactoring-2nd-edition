import { createCalculator } from './calculators';

export interface Performance {
  playID: string;
  audience: number;
}

export interface Invoice {
  customer: string;
  performances: Performance[];
}

export interface Play {
  name: string;
  type: string;
}

export interface PlayDictionary {
  [key: string]: Play;
}

export interface PlayInfo {
  play: Play;
  amount: number;
  audience: number;
  volumeCredits: number;
}

export function createStatementData(invoice: Invoice, plays: PlayDictionary) {
  const playsInfo = computePlaysInfo(invoice);
  const totalAmount = getTotalAmount(playsInfo);
  const volumeCredits = getTotalVolumeCredits(playsInfo);
  return { customer: invoice.customer, playsInfo, totalAmount, volumeCredits };

  function computePlaysInfo(invoice: Invoice) {
    return invoice.performances.map((perf) => {
      const calculator = createCalculator(perf, playFor(perf));
      return {
        play: playFor(perf),
        amount: calculator.amount,
        volumeCredits: calculator.volumeCredit,
        audience: perf.audience,
      };
    });
  }

  function getTotalAmount(playsInfo: PlayInfo[]) {
    return playsInfo.reduce((total, perf) => total + perf.amount, 0);
  }

  function getTotalVolumeCredits(playsInfo: PlayInfo[]) {
    return playsInfo.reduce((total, perf) => total + perf.volumeCredits, 0);
  }

  function playFor(perf: Performance) {
    return plays[perf.playID];
  }
}
