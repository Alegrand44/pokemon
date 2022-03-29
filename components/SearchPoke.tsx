import { useForm } from "react-hook-form";
import axios from "axios";

export default function SearchPoke({ handle }) {
  const submit = async ({ name }) => {
    try {
      const res = await axios.get(
        `https://api.pokemontcg.io/v2/cards${name && `?q=name:${name}*`}`
      );

      if (res.status == 200) {
        handle(res.data);
        localStorage.setItem("dataSearch", JSON.stringify(res.data));
      }
    } catch (error) {
      return;
    }
  };

  const { register, handleSubmit } = useForm();
  return (
    <>
      <div>
        <form action="" onSubmit={handleSubmit(submit)}>
          <input
            type="text"
            className="border-2 border-gray-500 py-2 text-center"
            placeholder="digite o pokemon desejado"
            name="name"
            {...register("name")}
          />
          <button type="submit" className="py-1 px-2 ml-3 bg-black text-white">
            Pesquisar
          </button>
        </form>
        <span className="text-yellow-900 text-xs">
          Pesquisas vazias trazem dados aleatorios.
        </span>
      </div>
    </>
  );
}
