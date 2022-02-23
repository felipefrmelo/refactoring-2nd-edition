import { Performance, Play } from './createStatementData';

type PerformanceCalculator = (performance: Performance) => {
  amount: number;
  volumeCredit: number;
};

const defaultVolumeCredits = (performance: Performance) => {
  return Math.max(performance.audience - 30, 0);
};

const tragedyCalculator: PerformanceCalculator = (performance: Performance) => ({
  amount: performance.audience > 30 ? 40000 + 1000 * (performance.audience - 30) : 40000,
  volumeCredit: defaultVolumeCredits(performance),
});

const comedyCalculator: PerformanceCalculator = (performance: Performance) => ({
  amount:
    (performance.audience > 20 ? 30000 + 10000 + 500 * (performance.audience - 20) : 30000) +
    300 * performance.audience,
  volumeCredit: defaultVolumeCredits(performance) + Math.floor(performance.audience / 5),
});

type Calculators = {
  [key: string]: PerformanceCalculator;
};

const calculators: Calculators = {
  tragedy: tragedyCalculator,
  comedy: comedyCalculator,
};

export const createCalculator = (performance: Performance, play: Play) => {
  const calculator = calculators[play.type];

  if (!calculator) throw new Error(`unknow type: ${play.type}`);

  return calculator(performance);
};
