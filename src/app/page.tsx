import { Box, Container, Typography } from '@mui/material';

import { LogoutButton } from '@/components/auth';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Demo2 - school project
        </Typography>
        <Box sx={{ maxWidth: 'sm' }}>
          <LogoutButton />
        </Box>
      </Box>
    </Container>
  );
}
