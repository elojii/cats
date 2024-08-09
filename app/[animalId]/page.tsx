import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Animal, Breed } from "../types";
import { HttpError, myFetch } from "@/utils";
import { requestOptions } from "../requestOptions";

export default async function BreedInformation({
  params: { animalId },
}: {
  params: { animalId: string };
}) {
  try {
    const breedData = await myFetch<Animal[]>(
      `https://api.thecatapi.com/v1/images/search?has_breeds=true&breed_ids=${animalId}`,
      requestOptions
    );

    const data: Breed = breedData[0].breeds[0];

    return <BreedDetails data={data} />;
  } catch (err) {
    if (err instanceof HttpError) {
      console.log(err.message);
    } else {
      console.log("An unknown error occurred");
    }
  }
}

function BreedDetails({ data }: { data: Breed }) {
  return (
    <Card className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300">
      <CardHeader className="p-6 bg-gray-50 border-b border-gray-200">
        <CardTitle className="text-3xl font-bold text-gray-800">
          {data.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 bg-gray-100 text-gray-700">
        <p className="text-base leading-relaxed mb-6">{data.description}</p>
        <div className="flex flex-col gap-4">
          <div className="flex items-center">
            <span className="font-semibold text-gray-800 mr-2">Weight:</span>
            <span className="text-gray-600">{data.weight.imperial} kg</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold text-gray-800 mr-2">
              Temperament:
            </span>
            <span className="text-gray-600">{data.temperament}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold text-gray-800 mr-2">Origin:</span>
            <span className="text-gray-600">{data.origin}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold text-gray-800 mr-2">Life Span:</span>
            <span className="text-gray-600">{data.life_span}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
