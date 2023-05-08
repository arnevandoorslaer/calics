let nextId = 0;

export class Month {
  activities: number[] = [];
  date: Date = new Date();
  started: number = 7;
  id: number = 0;

  constructor(readonly name: string) {
    this.id = nextId++;
    const now = new Date();
    const year = now.getFullYear() - (this.id > 7 ? 1 : 0);
    this.date = new Date(year, this.id + 1, 0);
    this.started = new Date(year, this.id, 1).getDay() || 7;
  }

  addActivities(activities: number[]) {
    this.activities.push(...activities);
  }
}

export class Months {
  static readonly months: Month[] = [
    new Month('Januari'),
    new Month('Februari'),
    new Month('Maart'),
    new Month('April'),
    new Month('Mei'),
    new Month('Juni'),
    new Month('Juli'),
    new Month('Augustus'),
    new Month('September'),
    new Month('Oktober'),
    new Month('November'),
    new Month('December'),
  ];

  static getMonths(): Month[] {
    return this.months;
  }

  static getMonthByName = (name?: string) => {
    return this.months.find((month) => month.name.toLowerCase() === name?.toLowerCase());
  };
}
