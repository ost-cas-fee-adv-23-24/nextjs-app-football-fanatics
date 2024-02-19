import Header from "@/components/Header";
import { getUserById } from "@/services/profile";
import { notFound } from "next/navigation";


export default async function Profile(context) {

  // TODO: redirect to profile/me if userID === current signed in userID

  try {
    const profileData = await getUserById(context.params.id);

    return (
      <Header user={profileData} />
    );

  } catch (error) {
    return notFound();
  }



}