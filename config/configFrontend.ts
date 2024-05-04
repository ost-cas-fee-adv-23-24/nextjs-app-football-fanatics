const frontendConfig = {
  feed: {
    observerRootMargin: '0px 0px 1000px 0px',
    fixed: {
      defaultAmount: 20,
    },
    defaultAmount: 10,
    sample: {
      toFetch: 100,
      toPick: 5,
    },
  },
  newPostsRequestInterval: 1000 * 10,
  notificationDuration: 1000 * 5,
  recommendationsAmount: 6,
  enableMentions: true,
};

export default frontendConfig;
