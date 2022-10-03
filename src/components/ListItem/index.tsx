import { Variant } from '@screens/Home';
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
  variant: Variant;
};

export function ListItem({ title, time, variant }: Props) {
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
