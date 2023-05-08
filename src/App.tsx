import { ChangeEvent } from 'react';
import * as XLSX from 'xlsx';
import { useAtom } from 'jotai';
import { activityAtom, addActivityAtom } from './service/store';
import Calendar from './components/calendar';
import { Input, Divider, Flex, Button } from '@chakra-ui/react';
import { Activity } from './model/activity';
import { PrintIcs } from './util/printics';
import EditActiviteit from './components/editActivitieit';

const RS = ';';
const FS = '|';

async function handleFileInput(e: ChangeEvent<HTMLInputElement>) {
  console.log('Reading', e);

  if (!e.target.files) {
    return;
  }

  const wb = XLSX.read(await e.target.files[0].arrayBuffer(), {
    type: 'binary',
  });

  return XLSX.utils
    .sheet_to_csv(wb.Sheets[wb.SheetNames[0]], {
      FS,
      RS,
    })
    .split(RS)
    .map((activity) => activity.split(FS))
    .filter((activity) => activity[0] !== '');
}

function App() {
  const [, addActivity] = useAtom(addActivityAtom);
  const [activities] = useAtom(activityAtom);

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const activities = await handleFileInput(e);

    if (!activities) return;

    activities.slice(1).forEach((activity) => {
      const [name, description, dateString, startTimeString, endTimeString] = activity;
      addActivity(new Activity(name, description, dateString, startTimeString, endTimeString));
    });
  };

  return (
    <>
      <Flex>
        <Input m={3} size='lg' border='0' type='file' onChange={handleInputChange} />
        <Button m={3} onClick={() => new PrintIcs(activities)}>
          Print ICS
        </Button>
      </Flex>
      <Divider />
      <Flex justifyContent='start'>
        <Calendar />
        <EditActiviteit />
      </Flex>
    </>
  );
}

export default App;
