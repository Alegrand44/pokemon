import { GetStaticPaths } from "next";
import Image, { ImageLoaderProps } from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Modal from "../../components/ModalAttack";
import styles from "../../styles/PageInfo.module.css";

type typePowers = {
  type?: string;
  name?: string;
  cost?: Array<string>;
  convertedEnergyCost?: number;
  damage?: string;
  text?: string;
};

type DataProps = {
  set: {
    images: {
      logo: string;
    };
  };
  images: {
    large: string;
  };
  name: string;
  id: string;
  hp: string;
  types: Array<Object>;
  weaknesses: Array<typePowers>;
  attacks: Array<typePowers>;
};

interface DataInterface {
  data: DataProps;
}

interface paramsInterface {
  params: {
    id: string;
  };
}

const myLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

export default function Pokemon({ data }: DataInterface) {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>();
  const [attack, setAttack] = useState<number>();

  function openModal(idx: any) {
    setAttack(idx);
    setOpen(true);
  }

  const closeModal = () => setOpen(false);

  return (
    <>
      {open && (
        <Modal
          open={open}
          closeModal={closeModal}
          data={data.attacks[attack]}
        />
      )}
      <div className={styles.container}>
        <div className={styles.main}>
          <div className="w-full md:ml-11">
            <button
              className="px-3 bg-green-900 rounded-md text-lg text-white"
              onClick={() => router.back()}
            >
              Voltar
            </button>
          </div>
          <div className="w-full flex justify-between text-center mt-5 md:mb-10 mb-5 md:px-44">
            <p className="text-lg text-gray-600">{data?.id}</p>{" "}
            <p className=" text-4xl md:text-6xl text-green-900">{data?.name}</p>
          </div>
          <div className="md:grid md:grid-cols-2">
            <div className="w-full flex justify-center right-0">
              {data && (
                <Image
                  loader={myLoader}
                  src={data.images.large}
                  width={500}
                  height={500}
                  alt="Picture of cart"
                />
              )}
            </div>
            <div className="md:px-20 mt-5 md:mt-10">
              <div className="flex justify-between md:mb-3 md:text-2xl">
                <span className="font-medium">HP:</span>
                <p>{data?.hp}</p>
              </div>
              <div className="flex justify-between md:mb-3 md:text-2xl">
                <span className="font-medium">TYPE:</span>
                <p>
                  {data?.types.map((type) => {
                    return type;
                  })}
                </p>
              </div>
              <div className="flex justify-between md:mb-3 md:text-2xl">
                <span className="font-medium">Fraquezas:</span>
                <p>
                  {(data?.weaknesses?.length > 0 &&
                    data?.weaknesses?.map((weaknes) => {
                      return weaknes.type;
                    })) ||
                    "-"}
                </p>
              </div>
              <div className="flex justify-between md:mb-3">
                <span className="font-medium md:text-2xl">Ataques:</span>
                {data?.attacks?.map((atack, idx) => {
                  return (
                    <button
                      key={idx}
                      className="bg-green-900 px-2 text-xs md:text-base rounded-full text-white items-center flex justify-center"
                      onClick={() => openModal(idx)}
                      id={`${idx}`}
                    >
                      {atack.name}
                    </button>
                  );
                })}
              </div>
              <div className="md:flex justify-center md:mt-5 md:mb-3 hidden">
                {data && (
                  <Image
                    loader={myLoader}
                    src={data.set.images.logo}
                    width={300}
                    height={300}
                    alt="Picture of cart"
                    layout="fixed"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(
    "https://api.pokemontcg.io/v2/cards?page=7&pageSize=5&orderBy=name&q=supertype:pokemon"
  );
  const { data } = await res.json();

  const paths = data.map((path: any) => ({
    params: { id: path.id },
  }));

  return { paths, fallback: true };
};

export async function getStaticProps({ params }: paramsInterface) {
  const res = await fetch(`https://api.pokemontcg.io/v2/cards/${params.id}`);
  const { data } = await res.json();

  return {
    props: {
      data,
    },
  };
}
