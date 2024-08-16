"use client";
import Image from "next/image";
import { Card } from "./card";
import { useRef } from "react";
import { useScroll, motion, useTransform } from "framer-motion";

export interface cardType {
  image: string;
  heading: string;
  des: string;
  date: string;
  profilePic: string;
  author: string;
}

export const Research = () => {
  const cards: cardType[] = [
    {
      image: "/card1.jpg",
      heading: "New introductions to stable diffusion. The unconventional.",
      des: "Adjustments to padding the boundaries for enhanced bandwidth",
      date: "Feb 28, 2022",
      profilePic: "/user1.png",
      author: "jayesh P",
    },
    {
      image: "/card2.jpg",
      heading: "New introductions to stable diffusion. The unconventional.",
      des: "Lorem epsum oratak windrin pratics dloutr mundance  epsum oratak windrin",
      date: "Jan 24, 2022",
      profilePic: "/user2.jpg",
      author: "Brian oklam",
    },
    {
      image: "/card3.jpg",
      heading: "What is symmetric space theory and why is it important.",
      des: "Large Language Models and their enhancements in symmetrye",
      date: "Jan 24, 2022",
      profilePic: "/user1.jpg",
      author: "Jayesh P",
    },
  ];

  const ref4 = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref4,
    offset: ["0 1", "1.33 1"],
  });

  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  return (
    <section className="mx-5 min-h-screen" id="research">
      <motion.div
        ref={ref4}
        style={{ scale: scaleProgress, opacity: scaleProgress }}
      >
        {" "}
        <h1 className="pt-36 text-center text-8xl font-bold text-gray-300 opacity-20">
          Our Research
        </h1>
        <div className="research-cards mt-24 flex flex-wrap justify-center gap-9 rounded-sm">
          {cards.map((card) => (
            <Card key={crypto.randomUUID()} card={card} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};
