import {
  Container,
  Divider,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';

export default function TermsPage() {
  return (
    <Container p={2}>
      <Heading as="h1" size="xl">
        TERMS & CONDITIONS
      </Heading>
      <Divider mb={4} />
      <Heading as="h2" size="md">
        Bernedoodle Puppies for Sale: Adoption Terms & Conditions
      </Heading>
      <VStack spacing={3} mt={3}>
        <Text>
          We are excited to have you join our waiting list for a Bernedoodle
          puppy. We do however want to make sure you understand how our waiting
          list and selection process works before you fully commit to placing a
          deposit and joining our waiting list.{' '}
        </Text>
        <Text>
          Our puppy selection process is handled in order of deposits received,
          and names are removed from the list as puppies are selected (we
          reserve the right to first pick). If you are not able to select a
          puppy from the most current litter, your name will be moved up on the
          list for the next planned litter.​
        </Text>
        <Text>
          If you are searching for a Tri Color (black and tan colors with white
          trim), be prepared to wait! They are extremely popular, and are the
          most requested color on our waiting list. The advantage of getting on
          a waiting list is to know you will eventually be moved up the list as
          families above you make their puppy selection.
        </Text>
        <Text>
          We require a $500 deposit for your name to be added to our waiting
          list. Once you are committed to our waiting list, the deposits are
          non-refundable. They are, however, 100% transferrable to any future
          litter of your choosing. If you are not happy with your choices; if
          the timing is not right for your family; if the desired color, gender,
          or size is not available; if you choose to purchase a puppy from
          another breeder; or if you back out for ANY reason, please understand
          that your deposit will not be refunded - NO EXCEPTIONS!
        </Text>
        <Text>
          If you are picking your puppy up in person, your final payment will be
          due at the time of pickup. However, if we are shipping your puppy,
          either by ground or air, your final payment will be due prior to
          shipment.
        </Text>
        <Text>
          Delivery options include: ground shipment with a personal delivery
          driver (price to be quoted by the driver prior to shipment); airline
          shipment either in cabin with a nanny, or in cargo (price to be quoted
          prior to shipment); or you can pick your new puppy up in person.
        </Text>
        <Text>
          Please know that we are fully committed to providing your family with
          a happy, healthy Bernedoodle puppy, and we can promise you that it
          will be well worth the wait!
        </Text>
        <Text>Thank you for considering us for your newest family member</Text>
      </VStack>
    </Container>
  );
}
