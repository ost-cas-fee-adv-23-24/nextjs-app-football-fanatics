import PostActionsBar from '@/components/post-actions-bar/PostActionsBar';
import { PostCard } from '@/components/post-card/PostCard';
import { IPost } from '@/services/Mumble/MumblePost';
import { IPostReply } from '@/utils/interfaces/mumblePost.interface';
import { PostEditorWrapper } from '@/components/post-editor-wrapper/PostEditorWrapper';
import ImageUpdaterWrapper from '@/components/image-updater-wrapper/ImageUpdaterWrapper';

interface IProps {
  data: IPost;
  isUserAuthenticated: boolean;
  revalidationPath?: string;
}

export const PostFull = ({
  data,
  isUserAuthenticated,
  revalidationPath,
}: IProps) => {
  const { postData, repliesData } = data;

  return (
    <div data-post-identifier={postData.id}>
      <div className="bg-white py-8 px-12 relative rounded-t-2xl">
        {!data.postData.mediaUrl && (
          <div className="absolute top-0 right-0 h-16 w-16 rounded-lg overflow-hidden">
            <ImageUpdaterWrapper
              serverRendered={true}
              addingPicture={true}
              creatorIdentifier={data.postData.creator.id}
              postIdentifier={data.postData.id}
            />
          </div>
        )}
        <PostCard
          serverRendered={true}
          useFloatingAvatar={true}
          text={postData.text}
          id={postData.id}
          creator={postData.creator}
          mediaUrl={postData.mediaUrl}
          mediaType={postData.mediaType}
          likes={postData.likes}
          replies={postData.replies}
          likedBySelf={postData.likedBySelf}
        />

        <div className="mt-4">
          <PostActionsBar
            serverRendered={true}
            postData={postData}
            revalidationPath={revalidationPath}
            creatorIdentifier={postData.creator.id}
            identifier={postData.id}
            amountLikes={postData.likes}
            amountComments={postData.replies}
            selfLiked={postData.likedBySelf}
          />
        </div>
        <div className="pt-16">
          {isUserAuthenticated && (
            // only to keep the whole server side rendering but only the editor
            <PostEditorWrapper
              postIdentifier={postData.id}
              revalidationsPath={`/posts/${postData.id}`}
            />
          )}
        </div>
      </div>
      <div className="bg-white relative rounded-b-2xl">
        {repliesData &&
          repliesData.data?.map((dataReply: IPostReply, index) => {
            return (
              <div
                className={
                  repliesData.data.length - 1 === index
                    ? ``
                    : `border-b-[1px] border-slate-100`
                }
                key={dataReply.id}
                id={dataReply.id} // to jump to
              >
                <div className={`py-8 px-12 relative`}>
                  <PostCard
                    serverRendered={true}
                    text={dataReply.text}
                    id={dataReply.id}
                    likedBySelf={dataReply.likedBySelf}
                    likes={dataReply.likes}
                    mediaUrl={dataReply.mediaUrl}
                    mediaType={dataReply.mediaType}
                    replies={dataReply.replies}
                    creator={dataReply.creator}
                  />

                  <div className="mt-4 mb-4 ml-[-12px]">
                    {/*We cannot reply to replies  API does not allow it*/}
                    <PostActionsBar
                      serverRendered={true}
                      postData={dataReply}
                      revalidationPath={revalidationPath}
                      parentIdentifier={postData.id}
                      creatorIdentifier={dataReply.creator.id}
                      identifier={dataReply.id}
                      amountLikes={dataReply.likes}
                      amountComments={dataReply.replies}
                      selfLiked={dataReply.likedBySelf}
                    />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
