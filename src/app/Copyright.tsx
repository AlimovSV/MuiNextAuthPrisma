import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export default function Copyright() {
  return (
    <Typography variant="body2" align="center" sx={{ color: 'text.secondary', my: 4 }}>
      {'Все права защищены © '}
      <Link color="inherit" href="https://gym3sam.ru/">
        Гимназия №3
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
