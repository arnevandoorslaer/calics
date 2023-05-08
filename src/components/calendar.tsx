import { SimpleGrid, Heading, Button, Flex, Text, VStack } from '@chakra-ui/react';
import { selectedMonthIdAtom, selectedMonthAtom } from '../service/store';
import { useAtom } from 'jotai';
import Event from './event';
import Weekdays from './weekdays';

function Calendar(): JSX.Element {
  const [, setSelectedMonthId] = useAtom(selectedMonthIdAtom);
  const [selectedMonth] = useAtom(selectedMonthAtom);

  const handlePrevMonthClick = () => setSelectedMonthId((id) => (id === 0 ? 11 : id - 1));
  const handleNextMonthClick = () => setSelectedMonthId((id) => (id === 11 ? 0 : id + 1));

  return (
    <VStack alignItems='center' border='4px' borderColor='black' m={2} maxW={700} h={900} boxShadow='2xl'>
      <Flex justifyContent='space-between' p={7} borderBottom='4px' borderColor='black' bg='red.500' w='100%'>
        <Button borderRadius={1} border='2px' borderColor='black' onClick={handlePrevMonthClick}>
          <Text fontWeight={900}>{'<'}</Text>
        </Button>
        <Heading fontWeight={800}>{selectedMonth.name}</Heading>
        <Button borderRadius={1} border='2px' borderColor='black' onClick={handleNextMonthClick}>
          <Text fontWeight={900}> {'>'}</Text>
        </Button>
      </Flex>
      <SimpleGrid columns={7}>
        <Weekdays />
        {Array.from({ length: selectedMonth.started - 1 }, (_, i) => (
          <div key={`spacer_${i}`}></div>
        ))}
        {Array.from({ length: selectedMonth.date.getDate() }, (_, i) => (
          <Event day={i + 1} key={i} />
        ))}
      </SimpleGrid>
    </VStack>
  );
}

export default Calendar;
