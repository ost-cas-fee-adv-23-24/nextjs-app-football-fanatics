'use client';
import { IPostCreator } from '@/utils/interfaces/mumblePost.interface';
import {
  Avatar,
  Button,
  ButtonIcon,
  EAvatarSizes,
  EButtonTypes,
  EIConTypes,
  EParagraphSizes,
  ETypographyLevels,
  Heading,
  Paragraph,
} from '@ost-cas-fee-adv-23-24/elbmum-design';
import Image from 'next/image';
import useUserInfo from '@/hooks/useUserInfo';
import useModal from '@/hooks/useModal';
import { EModalActions } from '@/stores/Modal.context';
import ImagePreview from '@/components/image-preview/ImagePreview';

interface Props {
  user: IPostCreator;
}

function Header({ user }: Props) {
  const { identifier, setUserAvatar, avatarUrl, lastName, firstName } =
    useUserInfo();
  const { dispatchModal, closeModal } = useModal();
  return (
    <>
      <div className="relative">
        <div
          className="rounded-2xl overflow-hidden"
          style={{ maskImage: 'radial-gradient(white, black)' }}
        >
          <div className="h-0 pb-[calc((8/17)*100%)]">
            <Image
              src={`https://source.unsplash.com/random/?landscape&${Date.now().toString().toLowerCase().trim()}`}
              alt="Header Image"
              fill
            />
          </div>
        </div>
        <div className="absolute bottom-[-80px] right-8">
          <Avatar
            nameHtml="avatar"
            size={EAvatarSizes.XL}
            editable={user.id === identifier}
            imgSrc={user.id === identifier ? avatarUrl : user.avatarUrl}
            onSuccess={(newAvatar) => {
              const reader = new FileReader();
              reader.onload = (evt) => {
                dispatchModal({
                  type: EModalActions.SET_CONTENT,
                  payload: {
                    title: 'Lets change that ugly pic',
                    content: (
                      <>
                        <ImagePreview
                          imageInMemory={evt.target?.result}
                          onCancel={() => {
                            closeModal();
                          }}
                        />
                        <Button
                          icon={EIConTypes.UPLOAD}
                          label="Update Image"
                          name="avatar-update"
                          type={EButtonTypes.PRIMARY}
                          onCustomClick={async () => {
                            try {
                              const formData = new FormData();
                              // @ts-ignore
                              formData.append('media', newAvatar);
                              const response = await fetch(
                                '/api/users/avatar',
                                {
                                  method: 'POST',
                                  body: formData,
                                },
                              );
                              const newPic = await response.json();
                              setUserAvatar(newPic);
                              closeModal();
                            } catch (error) {
                              closeModal();
                              // toast alert... we could use toasts to show problems
                              // https://www.npmjs.com/package/react-toastify
                            }
                          }}
                        />
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

      <div className="pt-6">
        <div className="pb-2 text-slate-900">
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
