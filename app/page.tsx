import Link from 'next/link';

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/*<Heading level={ETypographyLevels.ONE} text="Elbum Web App" />*/}
      {/*<Logo logoPosition={ELogoPositions.LEFT} color={ELogoColors.GRADIENT} />*/}
      <Link href={'/feed'}>Posts</Link>
    </main>
  );
}
