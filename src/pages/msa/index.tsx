import styles from '@/styles/App.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function MSAList() {
  return (
    <>
      <header>MSA</header>

      <div className="addItemIcon iconWrapper">
        <Link href="/msa/add">
          <Image
            src="/svgs/deck.svg"
            alt="13"
            className="icon"
            width={32}
            height={32}
            priority
          />
        </Link>
      </div>
    </>
  );
}
