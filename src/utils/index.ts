export function slugify(text: { toString: () => string }) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export function formatDate(date: string | number | Date) {
  return new Date(date).toLocaleDateString('en-US', {
    timeZone: 'UTC',
  });
}

export function formatPosts(
  posts: any,
  {
    filterOutDrafts = true,
    fileterOutFuturePosts = true,
    sortByDate = true,
    limit = 0,
  } = {}
) {
  const filteredPosts = posts.reduce((acc: any, post: any) => {
    const { date, draft } = post.frontmatter;
    if (filterOutDrafts && draft) return acc;
    if (fileterOutFuturePosts && new Date(date) > new Date()) return acc;
    acc.push(post);
    return acc;
  }, []);

  if (sortByDate) {
    filteredPosts.sort((a: any, b: any) => {
      return (
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
      );
    });
  } else {
    filteredPosts.sort(() => Math.random() - 0.5);
  }

  if (limit) {
    return filteredPosts.slice(0, limit);
  }

  return filteredPosts;
}
