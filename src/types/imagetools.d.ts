// Saída `as=picture` do vite-imagetools (presets definidos em vite.config.ts).
type ImagetoolsPicture = {
  sources: Record<string, string>;
  img: { src: string; w: number; h: number };
};

declare module '*?preset=hero' {
  const picture: ImagetoolsPicture;
  export default picture;
}

declare module '*?preset=card' {
  const picture: ImagetoolsPicture;
  export default picture;
}

declare module '*?preset=portrait' {
  const picture: ImagetoolsPicture;
  export default picture;
}

declare module '*?preset=gallery' {
  const picture: ImagetoolsPicture;
  export default picture;
}
