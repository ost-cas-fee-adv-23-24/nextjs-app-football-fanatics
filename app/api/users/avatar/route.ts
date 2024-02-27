import { auth } from '@/app/api/auth/[...nextauth]/auth';
import config from '@/config';
import { MumbleUserService } from '@/services/Mumble/MumbleUser';
import { NextRequest, NextResponse } from 'next/server';

const dataSource = new MumbleUserService(config.mumble.host);
export const POST = async (request: NextRequest): Promise<Response> => {
  const session = await auth();
  // @ts-ignore
  const formData = await request.formData();
  const image = formData.get(config.avatar.fileNameUploader) as File;

  try {
    if (!image) throw new Error('No image found');
    const response = await dataSource.uploadAvatar({
      // @ts-ignore
      token: session ? session.accessToken : '',
      image,
    });
    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
    throw new Error('Error while uploading avatar');
  }
};
