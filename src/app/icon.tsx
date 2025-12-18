import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      tw="flex items-center justify-center bg-black text-[24px] leading-8 text-white"
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      S
    </div>,
    {
      ...size,
    },
  );
}
