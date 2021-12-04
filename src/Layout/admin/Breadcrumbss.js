import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Route } from 'react-router-dom';
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import { Box } from '@mui/system';

function Breadcrumbss() {
  return (
    <Box pb={1}>
      <Route>
        {({ location }) => {
          const pathnames = location.pathname.split('/').filter((x) => x);

          return (
            <Breadcrumbs aria-label="breadcrumb" separator={<FollowTheSignsIcon />}>
              <Typography underline="hover" color="inherit" to="/">
                Home
              </Typography>
              {pathnames.map((value, index) => {
                const last = index === pathnames.length - 1;
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                return last ? (
                  <Typography color="text.primary" key={to}>
                    {value}
                  </Typography>
                ) : (
                  <Typography underline="hover" color="inherit" to={to} key={to}>
                    {value}
                  </Typography>
                );
              })}
            </Breadcrumbs>
          );
        }}
      </Route>
    </Box>
  );
}
export default Breadcrumbss;