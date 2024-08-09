import { Suspense } from "react";

import { Animal } from "./types";
import { Poster } from "./_components/Poster";
import { requestOptions } from "./requestOptions";
import { PosterSkeleton } from "./_components/PosterSkeleton";
import { HttpError, myFetch } from "@/utils";

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Suspense
          fallback={
            <>
              <PosterSkeleton />
              <PosterSkeleton />
              <PosterSkeleton />
              <PosterSkeleton />
              <PosterSkeleton />
            </>
          }
        >
          <PosterFetch />
        </Suspense>
      </div>
    </>
  );
}

async function PosterFetch() {
  try {
    const catsData = await myFetch<Animal[]>(
      "https://api.thecatapi.com/v1/images/search?limit=6",
      requestOptions
    );

    return catsData.map((catData) =>
      catData.breeds.length > 0 ? (
        catData.breeds.map((catInfo) => (
          <Poster
            key={`${catData.id}-${catInfo.id}`}
            name={catInfo.name}
            url={catData.url}
            breedId={catInfo.id}
          />
        ))
      ) : (
        <Poster
          key={catData.id}
          name="Unknown Breed"
          url={catData.url}
          breedId="unknown"
        />
      )
    );
  } catch (err) {
    if (err instanceof HttpError) {
      console.log(err.message);
    } else {
      console.log("An unknown error occurred");
    }
  }
}
