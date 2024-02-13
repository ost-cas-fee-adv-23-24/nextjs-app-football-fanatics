import envVariables from "@/config/env";
import { TUser } from "@/utils/types";

export async function getUserById(id: number) {

  const res = await fetch(
    `${envVariables.MUMBLE_API_URL}/users/${id}`,
    {
      headers: {
        'content-type': 'application/json'
      }
    }
  )

  if (!res.ok) throw new Error(`Could not fetch User by id ${id}`)

  return await res.json() as TUser;

}
