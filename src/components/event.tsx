import { VStack, Text, Divider, Flex } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { activityAtom, selectedActivityAtom, selectedMonthAtom } from '../service/store';

interface EventProps {
  day: number;
}

export default function Event({ day }: EventProps): JSX.Element {
  const [activities] = useAtom(activityAtom);
  const [month] = useAtom(selectedMonthAtom);
  const [, setSelectedActivity] = useAtom(selectedActivityAtom);

  const activity = activities.find((a) => a.dag.includes(day) && a.beginMaand === month.id + 1);

  const color = activity ? 'green.400' : 'grey';

  return (
    <VStack bg={color} border='1px' borderRadius={1} m={0.5} h={120} w={95}>
      <Flex justifyContent='space-between' w={70}>
        {activity ? (
          <Text
            fontWeight={600}
            _hover={{
              color: 'gray.300',
              cursor: 'pointer',
            }}
            onClick={() => setSelectedActivity(activity)}
          >
            {'-'}
          </Text>
        ) : (
          <Text
            fontWeight={600}
            _hover={{
              color: 'gray.300',
              cursor: 'pointer',
            }}
          >
            {'+'}
          </Text>
        )}
        <Text fontWeight={600}>{day}</Text>
      </Flex>
      {activity && (
        <>
          <Divider borderColor='grey.300' />
          <Flex fontSize='10px' w={90} flexDirection='column' pl={1} pr={1}>
            <Text fontWeight={700}>{activity.activiteit}</Text>
            <Text fontWeight={400} noOfLines={1}>
              {activity.plaats}
            </Text>
            {activity.leeftijdsgroep && (
              <Text fontWeight={400} noOfLines={1}>
                Wie: {activity.leeftijdsgroep}
              </Text>
            )}
            {activity.meebrengen && (
              <Text fontWeight={400} noOfLines={1}>
                Extra: {activity.meebrengen}
              </Text>
            )}
          </Flex>
        </>
      )}
    </VStack>
  );
}
