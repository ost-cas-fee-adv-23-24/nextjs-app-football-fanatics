import PostActionsBar from '@/components/post-actions-bar/PostActionsBar';
import { PostCard } from '@/components/post-card/PostCard';
import { PostEditor } from '@/components/post-editor/PostEditor';
import { IPost } from '@/services/Mumble/MumblePost';
import { IPostReply } from '@/utils/interfaces/mumblePost.interface';

interface IProps {
  data: IPost;
  isUserAuthenticated: boolean;
}

export const PostFull = ({ data, isUserAuthenticated }: IProps) => {
  const { postData, repliesData } = data;
  return (
    <div className="bg-white py-8 px-12 relative rounded-2xl mb-6">
      <PostCard
        text={postData.text}
        id={postData.id}
        creator={postData.creator}
        mediaUrl={postData.mediaUrl}
        mediaType={postData.mediaType}
        likes={postData.likes}
        replies={postData.replies}
        likedBySelf={postData.likedBySelf}
      />
      <div className="">
        <div className="mt-3">
          <PostActionsBar
            creatorIdentifier={postData.creator.id}
            identifier={postData.id}
            amountLikes={postData.likes}
            amountComments={postData.replies}
            selfLiked={postData.likedBySelf}
          />
        </div>

        <div className="pt-3">
          {isUserAuthenticated && (
            <PostEditor identifier={postData.id} isFeedPage={false} />
          )}
        </div>

        {repliesData?.data?.map((dataReply: IPostReply) => {
          return (
            <div className="mt-4" key={postData.id}>
              <PostCard
                text={dataReply.text}
                id={dataReply.id}
                likedBySelf={dataReply.likedBySelf}
                likes={dataReply.likes}
                mediaUrl={dataReply.mediaUrl}
                mediaType={dataReply.mediaType}
                replies={dataReply.replies}
                creator={dataReply.creator}
                parentId={dataReply.parentId}
              />

              <div className="mt-3 mb-4 ml-[-12px]">
                {/*We cannot like nor reply to replies  API does not allow it*/}
                <PostActionsBar
                  creatorIdentifier={dataReply.creator.id}
                  identifier={dataReply.id}
                  amountLikes={dataReply.likes}
                  amountComments={dataReply.replies}
                  selfLiked={dataReply.likedBySelf}
                />
              </div>
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
};
