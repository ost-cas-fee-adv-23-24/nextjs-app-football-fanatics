import Header from "@/components/Header";
import { getUserById } from "@/services/profile";
import { notFound } from "next/navigation";


export default async function Profile(context) {

  // TODO: redirect to profile/me if userID === current signed in userID

  const profileData = await getUserById(context.params.id);

  // console.log("profileData", profileData)

  if (!profileData) {
    return notFound();
  }

  return (
    <Header user={profileData} />
  );

}