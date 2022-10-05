import { ReactNode } from 'react';
import { Overlay, Container, Title } from './styles';

type Props = {
  title: string;
  children: ReactNode;
};

export function CustomAlert({ title, children }: Props) {
  return (
    <Overlay>
      <Container>
        <Title>{title}</Title>
        {children}
      </Container>
    </Overlay>
  );
}
