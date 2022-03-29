import type { NextPage } from "next";
import Head from "next/head";
import WrapperGrid from "../components/WrapperGrid";
import WrapperCarousel from "../components/WrapperCarousel";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import SearchPoke from "../components/SearchPoke";

interface cardType {
  images: {
    large: string;
    small: string;
  };
  id: string;
  name: string;
  types: Array<String>;
  supertype: string;
}

interface dataInterface {
  data: Array<cardType>;
}

export default function Home({ data }: dataInterface) {
  const [searchedPoke, setSearchedPoke] = useState(data);

  const handleSearch = (datas) => {
    setSearchedPoke(datas.data);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon page</title>
        <meta name="description" content="pokemn page" />
      </Head>

      <main className={styles.main}>
        <h1 className="text-center text-5xl md:text-7xl m-4 text-blue-900">
          POKEMOM CARDS
        </h1>
        <div className="m-5">
          <SearchPoke handle={handleSearch} />
        </div>
        <div className="hidden md:inline-block">
          <WrapperGrid data={searchedPoke} />
        </div>
        <div className="md:hidden">
          <WrapperCarousel data={searchedPoke} />
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    "https://api.pokemontcg.io/v2/cards?pageSize=100&orderBy=name&q=supertype:Pokémon"
  );
  const { data } = await res.json();

  return {
    props: {
      data,
    },
  };
}
