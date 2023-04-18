import CsvViewer from "@/components/CsvViewer";
import { useSession } from "next-auth/react";
import Head from "next/head";

type Props = {};

export default function Home(props: Props) {
  const user = useSession()?.data?.user || null;

  return (
    <div>
      <Head>
        <title>Prisma Blog by Berkin AKKAYA</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {user ? (
        <CsvViewer />
      ) : (
        <p style={{ textAlign: "center", marginTop: 50 }}>
          Devam etmek için giriş yapınız
        </p>
      )}
    </div>
  );
}
