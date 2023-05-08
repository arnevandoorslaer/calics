import { Card, Text } from '@chakra-ui/react';

const WEEKDAYS = ['Ma', 'Di', 'Wo', 'Do', 'Vrij', 'Za', 'Zo'];

export default function Weekdays(): JSX.Element {
  return (
    <>
      {WEEKDAYS.map((weekday) => (
        <Card key={weekday} bg='gray.400' border='1px' borderRadius={1} m={1} maxW={180} shadow='2xl'>
          <Text fontWeight={900} align='center'>
            {weekday}
          </Text>
        </Card>
      ))}
    </>
  );
}
