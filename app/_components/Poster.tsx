import { FC } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import Link from "next/link";
import Image from "next/image";

interface PosterProps {
  breedId: string;
  name: string;
  url: string;
}

export const Poster: FC<PosterProps> = ({ name, url, breedId }) => {
  return (
    <Card className="bg-white shadow-lg">
      <div className="relative w-full aspect-video">
        <Image
          src={url}
          fill
          alt={name}
          sizes={"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
          className="object-cover"
          priority
        />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-lg text-gray-800 ">
          {breedId !== "unknown" ? (
            <Link href={`/${breedId}`}>{name}</Link>
          ) : (
            <p>{name}</p>
          )}
        </CardTitle>
      </CardHeader>
    </Card>
  );
};
