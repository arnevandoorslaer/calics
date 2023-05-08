import { Months } from './month';
import { v4 } from 'uuid';

const weekdays = ['maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag', 'zondag'];

export class Activity {
  beginUur: number = 0;
  eindUur: number = 0;
  beginDag: number = 0;
  beginMaand: number = 0;
  eindDag: number = 0;
  eindMaand: number = 0;
  jaar: number = 0;
  dag: number[] = [];
  maand: string = '';
  id: string = v4();

  constructor(public datum: string, public activiteit: string, public plaats: string, public leeftijdsgroep: string, public meebrengen: string, id?: string) {
    if (id) this.id = id;

    const dateArray = datum
      .replace('-', '')
      .replace('t.e.m.', '')
      .replace(/\s\s+/g, ' ')
      .trim()
      .split(' ')
      .filter((item) => !weekdays.includes(item.toLowerCase()));

    this.beginDag = Number(dateArray[0]);
    this.eindDag = Number(dateArray[2] ?? dateArray[0]);

    this.beginMaand = Months.getMonthByName(dateArray[1])?.id! + 1 ?? 0;
    this.eindMaand = Months.getMonthByName(dateArray[3] ?? dateArray[1])?.id! + 1 ?? 0;

    this.dag = getNumbersBetween(this.beginDag, this.eindDag);
    this.maand = dateArray[1];

    this.jaar = new Date().getFullYear() - (this.beginMaand > 7 ? 1 : 0);

    const hours = this.plaats.replaceAll('u', '').split(': ')[1]?.replace(/\s\s+/g, ' ').replace('–', '-').split('-') ?? [];

    this.beginUur = Number(hours[0]);
    this.eindUur = Number(hours[1]);
  }

  createEvent() {
    const formatNumber = (n: number) => n.toString().padStart(2, '0');

    const startDate = `${this.jaar}${formatNumber(this.beginMaand)}${formatNumber(this.beginDag)}`;
    const endDate = this.eindMaand ? `${this.jaar}${formatNumber(this.eindMaand)}${formatNumber(this.eindDag)}` : startDate;

    let DTSTART = undefined;
    let DTEND = undefined;

    if (this.eindUur) {
      DTSTART = startDate + 'T' + this.beginUur + '0000';
      DTEND = endDate + 'T' + this.eindUur + '0000';
    }

    return `BEGIN:VEVENT
DTSTAMP:${DTSTART ?? startDate}
UID:${v4()}
DTSTART;VALUE=DATE:${DTSTART ?? startDate}
DTEND;VALUE=DATE:${DTEND ?? (endDate == startDate ? endDate : Number(endDate) + 1)}
SUMMARY:${this.activiteit ?? ''}
DESCRIPTION:${((this.leeftijdsgroep ? 'Wie: ' + this.leeftijdsgroep : '') + (this.meebrengen ? (this.leeftijdsgroep ? '\\n' : '') + 'Extra: ' + this.meebrengen : '')).trim()}
LOCATION:${this.plaats ? 'Waar: ' + this.plaats : ''}
END:VEVENT
`;
  }
}

function getNumbersBetween(num1: number, num2: number): number[] {
  const start = Math.min(num1, num2);
  const end = Math.max(num1, num2);
  const numbers: number[] = [];

  for (let i = start; i <= end; i++) {
    numbers.push(i);
  }

  return numbers;
}
