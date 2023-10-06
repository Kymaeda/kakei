export const getToken = (): string => {
  const metaTag = document.querySelector("meta[name='csrf-token']");
  let token: string;

  if (!metaTag) {
    throw new Error('CSRF token not found: ページを再読み込みしてください');
  } else {
    token = metaTag.getAttribute('content') ?? '';
  }
  return token;
};
