import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

export type NavbarBreadcrumb = {
  text: React.ReactNode;
  link?: string;
};

export type NavbarBreadcrumbsProps = React.PropsWithChildren<{
  breadcrumbs?: NavbarBreadcrumb[];
}>;

export default function NavbarBreadcrumbs({ breadcrumbs }: NavbarBreadcrumbsProps) {
  if (!breadcrumbs || breadcrumbs.length === 0) {
    return null;
  }

  return (
    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextRoundedIcon fontSize="small" />}>
      {breadcrumbs.map((item, index) =>
        item.link ? (
          <Typography key={index} component={Link} href={item.link} variant="body2">
            {item.text}
          </Typography>
        ) : (
          <Typography key={index} variant="body2" sx={{ color: 'text.primary' }}>
            {item.text}
          </Typography>
        ),
      )}
    </Breadcrumbs>
  );
}
