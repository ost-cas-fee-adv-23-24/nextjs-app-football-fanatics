import { PostImagePlaceholder } from '@/components/placeholders/PostImagePlaceholder';
import { AvatarPlaceholder } from '@/components/placeholders/AvatarPlaceholder';
import { PostTextPlaceholder } from '@/components/placeholders/PostTextPlaceholder';
import { ProfileSwitchPlaceholder } from '@/components/placeholders/ProfileSwitchPlaceholder';

export const ProfileHeaderPlaceholder = () => {
  return (
    <div>
      <div className="mb-12">
        <div className="relative mumble-image">
          <div className="absolute top-0 left-0 right-0 bottom-0">
            <PostImagePlaceholder />
            <AvatarPlaceholder />
          </div>
        </div>
      </div>
      <div className="px-4 md:px-0">
        <div className="mb-6 md:pr-60">
          <PostTextPlaceholder lines={2} />
        </div>
        <div className="mb-6">
          <PostTextPlaceholder lines={3} />
        </div>
      </div>
    </div>
  );
};
