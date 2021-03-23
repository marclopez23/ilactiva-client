const handleFollow = async () => {
  try {
    await followCommerce(id);
    const currentFollowing = newInfo.following.includes(id);
    currentFollowing
      ? (newInfo = {
          ...newInfo,
          following: newInfo.following.filter(
            (commerceId) => commerceId !== id
          ),
        })
      : (newInfo = {
          ...newInfo,
          following: [...newInfo.following, id],
        });
    console.log({ ...user, following: newInfo.following });
    saveUser({ ...user, following: newInfo.following });
    setUser((state) => ({
      ...state,
      user: { ...state.user, following: newInfo.following },
    }));
  } catch (e) {
    console.log(e);
  }
};
