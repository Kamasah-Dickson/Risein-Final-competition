import React from "react";
import styles from "./Skeleton.module.css";

type Props = {
  width?: string;
  height?: string;
};

export default function Skeleton({ height, width }: Props) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: "inherit",
      }}
      className={styles.skeleton}
    />
  );
}
