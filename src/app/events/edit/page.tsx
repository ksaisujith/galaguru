import { NextPage } from 'next';
import { Typography } from '@mui/material';

const Page: NextPage = () => {
  return (
    <>
      <Typography variant="h1" gutterBottom>
        Welcome to the edit!
      </Typography>
      <Typography variant="body1">
        This is a simple page component in Next.js using TypeScript. You can customize this page by adding more content or components as needed.
      </Typography>
    </>
  );
};

export default Page;