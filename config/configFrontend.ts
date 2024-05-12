import { fileNameUploader } from '@/config/index';

const frontendConfig = {
  feed: {
    observerRootMargin: '0px 0px 1000px 0px',
    fixed: {
      defaultAmount: 300,
    },
    defaultAmount: 30,
    sample: {
      toFetch: 100,
      toPick: 5,
    },
  },
  newPostsRequestInterval: 1000 * 10,
  notificationDuration: 1000 * 5,
  recommendationsAmount: 6,
  enableMentions: true,
  maxFileSize: 2097152, // 2MB
  fileNameUploader,
};

export default frontendConfig;
