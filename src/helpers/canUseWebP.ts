export const canUseWebP = () => {
  const canvas = document.createElement("canvas");
  if (!!(canvas.getContext && canvas.getContext("2d"))) {
    return canvas.toDataURL("image/webp").indexOf("data:image/webp") == 0;
  }
  return false;
};
