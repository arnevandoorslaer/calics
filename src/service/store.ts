import { atom } from 'jotai';
import { Activity } from '../model/activity';
import { Month, Months } from '../model/month';

export const activityAtom = atom<Activity[]>([]);

export const addActivityAtom = atom(
  () => '',
  (get, set, activity: Activity) => {
    const activities = get(activityAtom);
    set(activityAtom, [...activities, activity]);
    set(
      monthAtom,
      updateMonths(
        get(monthAtom),
        updateMonth(
          get(monthAtom).find((m) => m.id + 1 === activity.beginMaand),
          activity,
        ),
      ),
    );
  },
);

export const updateActivityAtom = atom(
  () => '',
  (get, set, activity: Activity) => {
    set(activityAtom, updateActivity(get(activityAtom), activity));
    set(selectedActivityAtom, activity);
  },
);

export const selectedActivityAtom = atom<Activity | undefined>(undefined);

export const monthAtom = atom<Month[]>(Months.getMonths());

export const selectedMonthIdAtom = atom<number>(new Date().getMonth());

export const selectedMonthAtom = atom<Month>((get) => get(monthAtom)[get(selectedMonthIdAtom)]);

const updateMonths = (months: Month[], month: Month) => {
  const result = months.filter((m) => m.id !== month.id);
  result.push(month);
  return result.sort((a, b) => a.id - b.id);
};

const updateMonth = (month: Month | undefined, activity: Activity) => {
  return { ...month, activities: month?.activities ? [...month.activities, activity.id] : [activity.id] } as Month;
};

const updateActivity = (activities: Activity[], activity: Activity) => {
  console.log('Updating', activity);
  return activities.map((a) => (a.id === activity.id ? activity : a));
};
