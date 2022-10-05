import { useState } from 'react';
import { TextInputProps } from 'react-native';
import { Container, Title, StyledTextInput } from './styles';

type Props = TextInputProps & {
  title: string;
  twoColumns?: boolean;
  value?: string;
  withLeftMargin?: boolean;
};

export function Input({
  title,
  twoColumns = false,
  withLeftMargin = false,
  value,
  ...rest
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  return (
    <Container
      title={title}
      twoColumns={twoColumns}
      withLeftMargin={withLeftMargin}
    >
      <Title>{title}</Title>
      <StyledTextInput
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
        isFocused={isFocused}
        isFilled={isFilled}
        {...rest}
      />
    </Container>
  );
}
