import React, { FC } from 'react';
import styled from '@emotion/styled';
import Icon, { Icons } from 'components/Icon';
import { centerContent } from 'style/modifiers';
import { colorPrimary, colorSecondary, colorBg } from 'style/theme';
import { rgba } from '@lucasols/utils';

type Props = {
  label: string;
  icon?: Icons;
  isActive?: boolean;
  alignBottom?: boolean;
  onClick?: () => void;
};

const Container = styled.button`
  ${centerContent};
  padding: 8px 12px;
  padding-right: 18px;
  margin-bottom: 8px;
  margin-left: -8px;
  margin-right: -8px;
  border-radius: 100px;
  transition: 240ms;
  justify-content: flex-start;

  &:hover {
    background: #f8f8f8;
  }
`;

const NavItem: FC<Props> = ({
  label,
  icon,
  isActive,
  onClick,
  alignBottom,
  children,
}) => (
  <Container
    onClick={onClick}
    css={{
      color: isActive ? colorPrimary : undefined,
      background: isActive ? colorBg : undefined,
      pointerEvents: isActive ? 'none' : undefined,
      marginTop: alignBottom ? 'auto' : undefined,
    }}
  >
    {icon && (
      <Icon
        css={{ marginRight: 12 }}
        name={icon}
        size={24}
        color={isActive ? colorPrimary : '#666'}
      />
    )}
    {children}
    <span>{label}</span>
  </Container>
);

export default NavItem;
