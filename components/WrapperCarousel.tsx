import Image, { ImageLoaderProps } from "next/image";
import { useRouter } from "next/router";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface cardType {
  images: {
    large: string;
    small: string;
  };
  id: string;
  name: string;
  types: Array<String>;
}

interface dataProps {
  data: Array<cardType>;
}

const myLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

export default function WrapperCarousel({ data }: dataProps) {
  const router = useRouter();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    swipeToSlide: true,
  };

  return (
    <>
      <div className="mr-6">
        <Slider {...settings}>
          {data?.map((card: cardType, idx) => (
            <div key={idx} className="p-5">
              <div
                className="grid grid-cols-2 gap-2 text-white p-4 mb-4 
                  border-2 border-gray-600 bg-gray-600 rounded-md m-30"
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
                  <div>
                    <p className="mt-5 text-md text-white">{card.id}</p>
                    <p className="text-center capitalize break-words text-3xl justify-center items-center mt-5">
                      {card.name}
                    </p>
                  </div>
                  <div className="max-h-full flex align-bottom">
                    <p className="text-white bg-gray-900 px-3 rounded-full mt-5">
                      {card.types?.map((type) => {
                        return type;
                      })}
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <button
                      className="bg-red-900 px-3 rounded uppercase mt-5 mr-3"
                      onClick={() => router.push(`/pokemon/${card.id}`)}
                    >
                      + detalhes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
