import { PostHeaderPlaceholder } from '@/components/placeholders/PostHeader';
import { PostTextPlaceholder } from '@/components/placeholders/PostTextPlaceholder';
import { PostImagePlaceholder } from '@/components/placeholders/PostImagePlaceholder';

export const PostEditorPlaceholder = () => {
  return (
    <div className="bg-white py-8 relative rounded-2xl mb-6 px-12">
      <PostHeaderPlaceholder />
      <PostTextPlaceholder lines={4} />
      <div className="mt-4">
        <PostImagePlaceholder />
      </div>
    </div>
  );
};
