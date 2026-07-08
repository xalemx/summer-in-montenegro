import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description }) {
  return (
    <Helmet>
      <title>{title} | Summer in Montenegro</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={`${title} | Summer in Montenegro`} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
}