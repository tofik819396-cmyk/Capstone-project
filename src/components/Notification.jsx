import React from "react";
import { useState } from "react";
import { i } from "framer-motion/client";
import "../styles/Notification.css";

export default function Notification({ message, type = "success" }) {
  return (
    <div className={`notification notification-${type}`}>
      {type === "success" && "✓ "}
      {type === "error" && "✕ "}
      {type === "info" && "ℹ "}
      {message}
    </div>
  );
}
