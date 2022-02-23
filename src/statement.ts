import { createStatementData, Invoice, PlayDictionary, PlayInfo } from './createStatementData';

function formatMoney(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(amount);
}

export function statement(invoice: Invoice, plays: PlayDictionary) {
  const statementData = createStatementData(invoice, plays);

  return render(statementData);
}

function render(statementData: {
  customer: string;
  playsInfo: PlayInfo[];
  totalAmount: number;
  volumeCredits: number;
}) {
  let result = `Statement for ${statementData.customer}\n`;
  result += printLines(statementData.playsInfo);
  result += `Amount owed is ${formatMoney(statementData.totalAmount / 100)}\n`;
  result += `You earned ${statementData.volumeCredits} credits\n`;
  return result;
}

function printLines(playsInfo: PlayInfo[]) {
  return playsInfo.reduce((acc, cur) => acc + printLine(cur), '');
}
function printLine(playInfo: PlayInfo) {
  return `  ${playInfo.play.name}: ${formatMoney(playInfo.amount / 100)} (${
    playInfo.audience
  } seats)\n`;
}
