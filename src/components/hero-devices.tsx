"use client";

import Image from "next/image";
import { motion } from "motion/react";

import { Iphone15Pro } from "@/components/ui/iphone-15-pro";

/**
 * Opening device stack: product screenshot + phone frame, fading into the
 * next section. Assets are the Cleanox system already in production.
 */
export function HeroDevices() {
  return (
    <div className="relative z-10 mx-auto mt-16 w-full max-w-[1280px] px-5 md:mt-20 md:px-8 lg:px-12">
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
          className="relative w-full overflow-hidden rounded-[14px] border border-nx-border bg-[#0B0B0B] shadow-[0_18px_40px_rgba(0,0,0,0.6)]"
        >
          <Image
            src="/assets/cleanox-devices.png"
            alt="Sistema Cleanox no desktop, tablet e celular"
            width={1792}
            height={1008}
            priority
            className="h-auto w-full object-cover object-center"
          />
        </motion.div>

        <div className="absolute top-1/2 left-1/2 w-[150px] -translate-x-1/2 -translate-y-[52%] sm:w-[200px] md:w-[240px] md:-translate-y-[46%] lg:w-[300px] lg:-translate-y-[52%] xl:w-[340px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: "easeOut" }}
          >
            <Iphone15Pro
              src="/assets/cleanox-devices.png"
              alt="App Cleanox no celular"
              objectPosition="8% 55%"
              className="w-full"
            />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        className="pointer-events-none absolute inset-x-0 -bottom-2 z-30 h-40 bg-gradient-to-t from-black via-black/80 to-transparent md:h-56 lg:h-72"
      />
    </div>
  );
}
