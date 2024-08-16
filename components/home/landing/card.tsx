import { cardType } from "./Research";
import Image from "next/image";

export const Card = ({ card }: { card: cardType }) => {
  console.log(card);
  return (
    <div className="card flex w-[420px] flex-col items-center gap-3 rounded-xl bg-white/10 p-4">
      <Image
        src={card.image}
        width={400}
        height={200}
        alt="card image"
        className="rounded-xl"
      />
      <h3 className="text-2xl font-semibold">{card.heading}</h3>
      <p>{card.des}</p>
      <div className="mt-5 flex w-full justify-between">
        <span>{card.date}</span>
        <span>{card.author}</span>
      </div>
    </div>
  );
};
