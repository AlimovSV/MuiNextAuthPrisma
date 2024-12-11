import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import Box from '@mui/material/Box';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

import AppNavbar from '@/components/AppNavBar';
import AppTheme from '@/components/AppTheme';
import NextAuthProvider from '@/components/NextAuthProvider';
import SideMenu from '@/components/SideMenu';
import { authOptions } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'КИС "Больница"',
  description: 'Управление пациентами, историями болезни и т.д.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute="class" />
        <NextAuthProvider session={session}>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <AppTheme>
              <Box sx={{ display: 'flex' }}>
                <SideMenu />
                <AppNavbar />
                {/* Main content */}
                <Box component="main" sx={{ flexGrow: 1, overflow: 'auto' }}>
                  {children}
                </Box>
              </Box>
            </AppTheme>
          </AppRouterCacheProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
