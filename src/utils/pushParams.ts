export const pushParams = (params: { key: string, value: string }[]) => {
  const url = new URL(window.location as any)
  params.forEach(({key, value}) => {
      url.searchParams.set(key, value)
    }
  );
  window.history.pushState({}, '', url);
};
