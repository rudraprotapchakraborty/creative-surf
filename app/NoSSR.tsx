"use client";
import dynamic from "next/dynamic";

export const NoSSR = dynamic(() => Promise.resolve((props) => props.children), {
  ssr: false,
});
