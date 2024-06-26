'use client';
import { IPostCreator } from '@/utils/interfaces/mumblePost.interface';
import {
  Avatar,
  Button,
  ButtonIcon,
  EAvatarSizes,
  EButtonKinds,
  EButtonTypes,
  EIConTypes,
  EParagraphSizes,
  ETypographyLevels,
  Heading,
  Paragraph,
} from '@ost-cas-fee-adv-23-24/elbmum-design';
import useUserInfo from '@/hooks/useUserInfo';
import ImagePreview from '@/components/image-preview/ImagePreview';
import React, { useMemo } from 'react';
import ImageWithPlaceholder from '@/components/image-with-placeholder/ImageWithPlaceholder';
import { toast } from 'react-toastify';
import useLayout from '@/hooks/useLayout';
import { ELayoutActions } from '@/providers/layout/utils/enums/layout.enum';
import { uploadUserAvatar } from '@/actions/uploadUserAvatar';
import { EResponseMumbleStatus } from '@/utils/enums/general.enum';
import frontendConfig from '@/config/configFrontend';
import usePosts from '@/hooks/usePosts';

interface Props {
  user: IPostCreator;
}

function Header({ user }: Props) {
  const { identifier, setUserAvatar, avatarUrl, lastName, firstName } =
    useUserInfo();
  const { dispatchLayout, closeModal, currentTabProfile } = useLayout();
  const { restartFeedAuthorized, restartFeedAuthorizedLikes } = usePosts();

  const imageSource = useMemo(() => {
    return `https://source.unsplash.com/random/?landscape&${Date.now().toString().toLowerCase().trim()}`;
  }, []);

  return (
    <>
      <div className="relative">
        <ImageWithPlaceholder src={imageSource} alt="header Image" />
        <div className="absolute bottom-[20px] md:bottom-[-80px] right-6 md:right-8">
          <Avatar
            nameHtml="avatar"
            size={EAvatarSizes.XL}
            editable={user.id === identifier}
            imgSrc={
              user.id === identifier
                ? avatarUrl || undefined
                : user.avatarUrl || undefined
            }
            onSuccess={(newAvatar) => {
              const reader = new FileReader();
              reader.onload = (evt) => {
                dispatchLayout({
                  type: ELayoutActions.SET_OVERLAY_CONTENT,
                  payload: {
                    overlayTitle: 'Lets change that ugly pic',
                    overlayContent: (
                      <>
                        <ImagePreview
                          imageInMemory={evt.target?.result}
                          onCancel={() => {
                            closeModal();
                          }}
                        />
                        <form
                          action={async () => {
                            try {
                              const formData = new FormData();
                              formData.append(
                                frontendConfig.fileNameUploader,
                                // @ts-ignore
                                newAvatar,
                              );
                              const response = await uploadUserAvatar(formData);
                              if (
                                response.status === EResponseMumbleStatus.ERROR
                              ) {
                                toast.error(response.message);
                              } else if (
                                response.status ===
                                EResponseMumbleStatus.SUCCESS
                              ) {
                                if (response.data) {
                                  setUserAvatar(response.data.imageSource);
                                }
                                if (identifier && currentTabProfile === 0) {
                                  restartFeedAuthorized(identifier, [
                                    identifier,
                                  ]);
                                }
                                if (identifier && currentTabProfile === 1) {
                                  restartFeedAuthorizedLikes(identifier);
                                }
                                closeModal();
                              }
                            } catch (error) {
                              closeModal();
                              toast.error('Error while uploading the image');
                            }
                          }}
                        >
                          <Button
                            htmlType={EButtonKinds.SUBMIT}
                            icon={EIConTypes.UPLOAD}
                            label="Update Image"
                            name="avatar-update"
                            type={EButtonTypes.PRIMARY}
                          />
                        </form>
                      </>
                    ),
                  },
                });
              };
              // @ts-ignore
              reader.readAsDataURL(newAvatar);
            }}
          />
        </div>
      </div>

      <div className="pt-6 mx-8 md:mx-auto">
        <div className="pb-2 text-slate-900 ">
          <Heading
            level={ETypographyLevels.THREE}
            text={`${user.id === identifier ? `${firstName} ${lastName} ` : user.username}`}
            inheritColor
          />
        </div>

        <div className="flex gap-4">
          <ButtonIcon
            name="profile"
            icon={EIConTypes.PROFILE}
            type={EButtonTypes.PRIMARY}
            label={user.username}
          />
          <ButtonIcon
            name="location"
            icon={EIConTypes.LOCATION}
            type={EButtonTypes.SECONDARY}
            label="Chur"
          />
          <ButtonIcon
            name="calendar"
            icon={EIConTypes.CALENDAR}
            type={EButtonTypes.SECONDARY}
            label="Mitglied seit 3 Jahren"
          />
        </div>

        <div className="pt-3 text-slate-400 font-medium">
          <Paragraph
            size={EParagraphSizes.MEDIUM}
            text={`Hey there! I'm ${user.username}, and I'm all about capturing life through my lens. 🌟 By day, I'm diving into the world of insurance, but when the sun sets, you'll find me chasing the perfect shot. 🌅 Let's explore the beauty of both worlds together!`}
            inheritColor
          />
        </div>
      </div>
    </>
  );
}

export default Header;
