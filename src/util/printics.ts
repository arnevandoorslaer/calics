import { Activity } from '../model/activity';

export class PrintIcs {
  beginning = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//www.marudot.com//iCal Event Maker',
    'X-WR-CALNAME:' + 'KLJKalender' + '',
    'CALSCALE:GREGORIAN',
    'BEGIN:VTIMEZONE',
    'TZID:Europe/Berlin',
    'TZURL:http://tzurl.org/zoneinfo-outlook/Europe/Berlin',
    'X-LIC-LOCATION:Europe/Berlin',
    'BEGIN:DAYLIGHT',
    'TZOFFSETFROM:+0100',
    'TZOFFSETTO:+0200',
    'TZNAME:CEST',
    'DTSTART:19700329T020000',
    'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU',
    'END:DAYLIGHT',
    'BEGIN:STANDARD',
    'TZOFFSETFROM:+0200',
    'TZOFFSETTO:+0100',
    'TZNAME:CET',
    'DTSTART:19701025T030000',
    'RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU',
    'END:STANDARD',
    'END:VTIMEZONE',
  ].join('\n');

  end = 'END:VCALENDAR';

  constructor(activities: Activity[]) {
    const calendar = `${this.beginning}\n${activities.map((activity) => activity.createEvent()).join('\n')}${this.end}`;
    const blob = new Blob([calendar], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    alert(url);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'KLJKalender.ics';

    document.body.appendChild(link);
    link.click();

    window.URL.revokeObjectURL(url);
  }
}
