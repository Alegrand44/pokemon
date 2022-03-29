import Image, { ImageLoaderProps } from "next/image";
import { useRouter } from "next/router";

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

interface dataPropsInterface {
  data: Array<cardType>;
}

const myLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

export default function WrapperGrid({ data }: dataPropsInterface) {
  const router = useRouter();

  return (
    <>
      <div>
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
          {data?.map((card: cardType, idx) => (
            <>
              <div
                key={idx}
                className="text-black p-4 mb-4 border-2 border-gray-600 bg-gray-400 rounded-md hover:cursor-pointer
                  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-[#c5c79e] duration-300"
                onClick={() => router.push(`/pokemon/${card.id}`)}
                id={`${idx}`}
              >
                <div className="flex justify-center">
                  <Image
                    loader={myLoader}
                    src={card.images.large}
                    alt="Picture of the author"
                    width={200}
                    height={200}
                    layout="fixed"
                  />
                </div>
                <div>
                  <p className="mt-1 text-sm text-red-600">{card.id}</p>
                  <p className="text-center break-words text-2xl">
                    {card.name}
                  </p>
                </div>
                <div>
                  <p>
                    {card.types?.map((type) => {
                      return type;
                    })}
                  </p>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}
