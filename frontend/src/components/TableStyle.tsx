import styled from '@emotion/styled';
import { rgba } from '@lucasols/utils';
import React, { FC } from 'react';
import { colorPrimary } from 'style/theme';
import { fillContainer } from 'style/modifiers';

const Container = styled.div`
  position: absolute;
  top: 80px;
  left: 42px;
  right: 42px;
  bottom: 42px;
  border-radius: 12px;
  background: #fff;
  overflow: hidden;

  table {
    width: 100%;
    max-height: 100%;
    border-collapse: collapse;
    padding: 0 12px;
  }

  thead tr {
    background: #fff;
    color: ${colorPrimary};
  }

  th {
    position: sticky;
    top: 0;
    padding: 16px 32px;
    font-weight: 600;
    font-size: 14px;
    text-align: left;
    background: #fff;

    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      border-bottom: 2px solid ${rgba(colorPrimary, 0.3)};
    }
  }

  tbody tr {
    cursor: pointer;
    transition: 240ms;

    &:hover {
      background: #f8f8f8;
    }
  }

  tbody tr:last-child td {
    border-bottom: 0;
  }

  td {
    font-size: 14px;
    padding: 24px 32px;
    border-bottom: 1px solid ${rgba(colorPrimary, 0.15)};
  }
`;

const Scrollable = styled.div`
  ${fillContainer};
  overflow-y: auto;
`;

const TableWrapper: FC = ({ children }) => (
  <Container>
    <Scrollable>
      <table>{children}</table>
    </Scrollable>
  </Container>
);

export default TableWrapper;
