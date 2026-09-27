import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function BackgroundFlowingLines() {
  const { scrollY } = useScroll();

  // Scroll responsive offsets for dynamic parallax flow
  const lineY1 = useTransform(scrollY, [0, 3000], [0, 400]);
  const lineY2 = useTransform(scrollY, [0, 3000], [0, -350]);
  const lineRotate = useTransform(scrollY, [0, 3000], [0, 8]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden opacity-30 select-none">
      <motion.svg
        style={{ rotate: lineRotate }}
        className="w-full h-full"
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="none"
      >
        {/* Subtle gold dashed flowing curve 1 */}
        <motion.path
          style={{ y: lineY1 }}
          d="M -120 180 C 280 80, 720 480, 1560 160"
          stroke="#C8A97E"
          strokeWidth="0.85"
          strokeDasharray="5 7"
        />

        {/* Crisp subtle off-white contour curve 2 */}
        <motion.path
          style={{ y: lineY2 }}
          d="M -100 680 C 420 840, 920 460, 1600 720"
          stroke="#F5F4F0"
          strokeWidth="0.45"
          strokeDasharray="2 4"
        />

        {/* Ambient atmospheric wave 3 */}
        <path
          d="M 100 -50 C 400 300, 1000 600, 1500 1000"
          stroke="#C8A97E"
          strokeWidth="0.3"
          strokeOpacity="0.4"
        />
      </motion.svg>
    </div>
  );
}
