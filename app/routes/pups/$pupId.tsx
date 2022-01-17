import {
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Text,
  Divider,
  Box,
  List,
  ListItem,
} from "@chakra-ui/react";
import { extendWith } from "lodash";
import { LoaderFunction, useLoaderData, useNavigate } from "remix";
import { Pup } from "~/types";
import { sbSelect } from "~/utils/helpers";
import { supabase } from "~/utils/supabase.server";

export let loader: LoaderFunction = async ({ params }) => {
  let pup = await supabase
    .from<Pup>("pups")
    .select(
      sbSelect(
        "*",
        "breed:breed_id(name)",
        "dad(id, name, avatar, breed:breed_id(name))",
        "mom(id, name, avatar, breed:breed_id(name))"
      )
    )
    .eq("id", params?.pupId as string)
    .single()
    .then(async ({ data }) => ({
      ...data,
      siblings: await supabase
        .from("pups")
        .select(sbSelect("id", "name", "avatar", "parent"))
        .neq("parent", true)
        .eq("family_id", data?.family_id)
        .then(({ data }) => data),
    }));

  /*   const siblings = await supabase
    .from("pups")
    .select(sbSelect("id", "name", "avatar", "parent"))
    .neq("parent", true)
    .eq("family_id", pup?.data?.family_id); */

  return pup;
};

export default function PupRoute() {
  const navigate = useNavigate();
  const pup = useLoaderData();

  //
  //

  return (
    <Container>
      <Flex justifyContent="space-between">
        <Box>
          <Heading size="3xl" as="h1">
            {pup?.name}
          </Heading>
        </Box>
        <Box>
          <Button onClick={(e) => navigate(`/pups/${pup?.id}/edit`)} size="sm">
            edit
          </Button>
        </Box>
      </Flex>
      <Divider />

      <section>
        <Heading as="h2">Specs</Heading>
        <Text>{pup?.breed?.name}</Text>
        <Text border="medium" borderColor="gray.400">
          {pup.birthday}
        </Text>
        <List>
          {pup.siblings.map((sib) => (
            <ListItem>{sib.name}</ListItem>
          ))}
        </List>
        <Box></Box>
      </section>
    </Container>
  );
}
