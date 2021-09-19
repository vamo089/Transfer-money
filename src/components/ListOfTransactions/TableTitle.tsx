import { Toolbar as _Toolbar, Typography } from '@material-ui/core';
import * as React from 'react';
import styled from 'styled-components';

import { theme } from '../../helpers/theme';

const Toolbar = styled(_Toolbar)`
  border-bottom: 1px solid ${theme.colors.primary};
`;

export const TableTitle: React.FC = () => (
  <Toolbar>
    <Typography variant="h6" component="div">
      Previous transactions
    </Typography>
  </Toolbar>
);
