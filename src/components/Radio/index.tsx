import { useState } from 'react';
import {
  Container,
  OptionIcon,
  OptionsContainer,
  OptionText,
  OptionWrapper,
  Title,
} from './styles';

type Props = {
  title: string;
  options: string[];
  onSelect: (option: string) => void;
};

export function Radio({ title, options, onSelect }: Props) {
  const [userOption, setUserOption] = useState<string | null>(null);

  function handleUserOption(option: string) {
    onSelect(option);
    setUserOption(option);
  }

  return (
    <Container>
      <Title>{title}</Title>
      <OptionsContainer>
        {options.map((option, index) => (
          <OptionWrapper
            key={option}
            variant={option === 'Sim' ? 'inDiet' : 'outDiet'}
            withMarginLeft={index > 0}
            isSelected={option === userOption}
            onPress={() => handleUserOption(option)}
          >
            <OptionIcon variant={option === 'Sim' ? 'inDiet' : 'outDiet'} />
            <OptionText>{option}</OptionText>
          </OptionWrapper>
        ))}
      </OptionsContainer>
    </Container>
  );
}
