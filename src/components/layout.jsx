import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function Layout({ children, showFooter = true }) {
  return (
    <>
      <Head>
        <title>Addo App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main">
        <nav className="header">
          <Link href="/">
            <div className="appTitle">ADDO</div>
          </Link>
          <Link href="/projects">
            <Image
              src="/svgs/deck.svg"
              alt="13"
              className="icon"
              width={32}
              height={32}
              priority
            />
          </Link> 
        </nav>
        <section className="section">{children}</section>
        {showFooter && <footer className="footer">
          <Link href="/msa">
            <div className='footerIconWrapper'><Image
              src="/svgs/calender.svg"
              alt="13"
              className="icon"
              width={32}
              height={32}
              priority
            />MSA</div>
          </Link>
          <Link href="/sow">
            <div className='footerIconWrapper'><Image
              src="/svgs/month.svg"
              alt="13"
              className="icon"
              width={32}
              height={32}
              priority
            />SOW</div>
          </Link>
          <Link href="/timesheet">
            <div className='footerIconWrapper'><Image
              src="/svgs/time.svg"
              alt="13"
              className="icon"
              width={32}
              height={32}
              priority
            />Timesheet</div>
          </Link>
          <Link href="/invoice">
            <div className='footerIconWrapper'><Image
              src="/svgs/invoice.svg"
              alt="13"
              className="icon"
              width={32}
              height={32}
              priority
            />Invoice</div>
          </Link>
        </footer>}
      </main>
    </>
  );
}
