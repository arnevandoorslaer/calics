import { Input, FormControl, FormLabel, VisuallyHidden, Button, VStack } from '@chakra-ui/react';
import { selectedActivityAtom, updateActivityAtom } from '../service/store';
import { useAtom } from 'jotai';
import { useState, useEffect } from 'react';
import { Activity } from '../model/activity';

function EditActiviteit(): JSX.Element {
  const [activity, setActivity] = useAtom(selectedActivityAtom);
  const [activiteit, setActiviteit] = useState('');
  const [plaats, setPlaats] = useState('');
  const [leeftijdsgroep, setLeeftijdsgroep] = useState('');
  const [meebrengen, setMeebrengen] = useState('');
  const [datum, setDatum] = useState('');

  const [, setUpdateActivityAtom] = useAtom(updateActivityAtom);

  useEffect(() => {
    if (activity) {
      setActiviteit(activity.activiteit);
      setPlaats(activity.plaats);
      setLeeftijdsgroep(activity.leeftijdsgroep);
      setMeebrengen(activity.meebrengen);
      setDatum(activity.datum);
    }
  }, [activity]);

  return (
    <>
      {activity && (
        <VStack>
          <Button w='100%' onClick={() => setActivity(undefined)}>
            Cancel
          </Button>
          <FormControl w={500} m={5}>
            <VisuallyHidden>{activity.id}</VisuallyHidden>
            <FormLabel htmlFor='activiteit'>Activiteit:</FormLabel>
            <Input id='activiteit' type='text' value={activiteit} onChange={(e) => setActiviteit(e.target.value)} />
            <FormLabel htmlFor='datum'>Datum:</FormLabel>
            <Input id='datum' type='text' value={datum} onChange={(e) => setDatum(e.target.value)} />
            <FormLabel htmlFor='plaats'>Plaats:</FormLabel>
            <Input id='plaats' type='text' value={plaats} onChange={(e) => setPlaats(e.target.value)} />
            <FormLabel htmlFor='wie'>Wie:</FormLabel>
            <Input id='wie' type='text' value={leeftijdsgroep} onChange={(e) => setLeeftijdsgroep(e.target.value)} />
            <FormLabel htmlFor='extra'>Extra:</FormLabel>
            <Input id='extra' type='text' value={meebrengen} onChange={(e) => setMeebrengen(e.target.value)} />
            <Input type='submit' value='Confirm Changes' onClick={() => setUpdateActivityAtom(new Activity(datum, activiteit, plaats, leeftijdsgroep, meebrengen, activity.id))} />
          </FormControl>
        </VStack>
      )}
    </>
  );
}

export default EditActiviteit;
