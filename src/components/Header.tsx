'use client';

import React from 'react';

// import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import Stack from '@mui/material/Stack';
import ColorModeIconDropdown from './ColorModeIconDropdown';
// import CustomDatePicker from './CustomDatePicker';
// import MenuButton from './MenuButton';
import NavbarBreadcrumbs, { NavbarBreadcrumb } from './NavbarBreadcrumbs';

// import Search from './Search';

type Props = React.PropsWithChildren<{
  breadcrumbs?: NavbarBreadcrumb[];
}>;

export default function Header({ breadcrumbs, children }: Props) {
  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: 'none', md: 'flex' },
        width: '100%',
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        maxWidth: { sm: '100%', md: '1700px' },
        pt: 1.5,
      }}
      spacing={2}
    >
      <NavbarBreadcrumbs breadcrumbs={breadcrumbs} />
      <Stack direction="row" sx={{ gap: 1 }}>
        {children}
        {/* <Search /> */}
        {/* <CustomDatePicker /> */}
        {/* <MenuButton showBadge aria-label="Open notifications">
          <NotificationsRoundedIcon />
        </MenuButton> */}
        <ColorModeIconDropdown />
      </Stack>
    </Stack>
  );
}
