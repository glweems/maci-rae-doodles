import { Select, SelectProps } from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import { FC } from 'react';
export type FormSelectOption = {
  id: string;
  name: string;
};
export interface SelectInputProps extends SelectProps {
  options?: FormSelectOption[];
}
export const SelectInput: FC<SelectInputProps> = ({
  children,
  options,
  ...props
}) => {
  return (
    <Select {...props}>
      {children ?? children}
      {options?.map(({ id, name }) => (
        <option key={nanoid()} value={id}>
          {name}
        </option>
      ))}
    </Select>
  );
};
