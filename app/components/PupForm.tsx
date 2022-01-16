import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup
} from '@chakra-ui/react';
import { ChangeEventHandler, FC } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { ActionFunction, Form, useFetcher, useLoaderData } from 'remix';
import { FormSelectOption, SelectInput } from '~/components/SelectInput';

export interface PupFormProps {
  breeds: FormSelectOption[];
  dads: FormSelectOption[];
  moms: FormSelectOption[];
  defaultValues?: FieldValues;
}

export let action: ActionFunction = async ({ request }) => {
  console.log('request', request);
  const formData = await request.formData();
  return { name: formData.get('name') };
};

export const PupForm: FC<PupFormProps> = ({ defaultValues }) => {
  const fetcher = useLoaderData();
  const { breeds, dads, moms } = fetcher;
  const { register, handleSubmit, getValues, setValue } = useForm({
    defaultValues: defaultValues ?? { colors: [] }
  });

  const updateValue: ChangeEventHandler<
    HTMLSelectElement | HTMLInputElement
  > = (e) => setValue(e.target.name, e.target.value);

  return (
    <Container>
      <Avatar
        bg="red.500"
        src={getValues('avatar') ?? 'https://source.boringavatars.com/'}
      />
      <Form action="">
        <FormControl>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input {...register('name')} required />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="gender">Gender</FormLabel>

          <RadioGroup
            name="gender"
            onChange={(value) => setValue('gender', value)}
          >
            <HStack>
              <Radio value="MALE" onChange={console.log}>
                Male
              </Radio>
              <Radio value="FEMALE">Female</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="birthday">Birthday</FormLabel>
          <Input {...register('birthday')} type="date" />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="mom">Mom</FormLabel>
          <SelectInput
            {...register('mom')}
            placeholder="Mom"
            options={moms}
            onChange={updateValue}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="dad">Dad</FormLabel>
          <SelectInput
            {...register('dad')}
            placeholder="Dad"
            options={dads}
            onChange={updateValue}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="breed_id">Breed</FormLabel>
          <SelectInput
            {...register('breed_id')}
            placeholder="Breed"
            options={breeds}
            onChange={updateValue}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="embark">Embark URL</FormLabel>
          <Input
            {...register('embark')}
            type="url"
            placeholder="http://embk.me/..."
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="price">Price</FormLabel>
          <FormHelperText>{getValues('price')}</FormHelperText>
          <Input {...register('price')} type="number" onBlur={updateValue} />
        </FormControl>

        <Box>
          <Checkbox {...register('available')} colorScheme="green">
            Available
          </Checkbox>
        </Box>
        <Box>
          <Checkbox {...register('sold')} colorScheme="green">
            Sold
          </Checkbox>
        </Box>

        <HStack>
          <Box w={20} h={20}>
            <Input name="colors[0]" type="color" onChange={updateValue} />
          </Box>
        </HStack>

        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
};
