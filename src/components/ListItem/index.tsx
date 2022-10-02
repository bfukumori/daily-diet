import {
  Container,
  Content,
  Icon,
  Separator,
  Time,
  Description,
} from './styles';

type Props = {
  title: string;
  time: string;
  variant?: 'primary' | 'secondary';
};

export function ListItem({ title, time, variant = 'primary' }: Props) {
  return (
    <Container>
      <Content>
        <Time>{time}</Time>
        <Separator />
        <Description>{title}</Description>
      </Content>
      <Icon variant={variant} />
    </Container>
  );
}
