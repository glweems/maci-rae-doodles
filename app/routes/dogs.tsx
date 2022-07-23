import { json, LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { airtable } from "~/airtable.server";
import { camelize } from "~/helpers";

export async function loader({ request }: LoaderArgs) {
  const idk = await airtable("dogs")
    .select({
      // Selecting the first 3 records in Grid view:
      sort: [{ field: "name", direction: "asc" }],
    })
    .all()
    .then((_dogs) => _dogs.map((_dog) => camelize(_dog.fields)));
  console.log("idk: ", idk);
  return json(idk);
}

export default function DogsPage() {
  const data = useLoaderData();
  return <div>{JSON.stringify(data, null, 2)}</div>;
}
