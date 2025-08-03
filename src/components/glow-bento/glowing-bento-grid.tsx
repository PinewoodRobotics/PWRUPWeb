"use client";

import { MapPin, School, Trophy, Calendar, UsersRound } from "lucide-react";
import { GridItem } from "./grid-item";

export function GlowingEffectDemo() {
  return (
    <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
        icon={<School className="h-4 w-4 text-white" />}
        title="Pinewood School"
        description="We are FRC team 4765 representing Pinewood School at First Robotics Competition Tournaments"
      />

      <GridItem
        area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
        icon={<MapPin className="h-4 w-4 text-white" />}
        title="PEARL"
        description="The Pinewood Engineering And Robotics Lab is our workspace for robotics and engineering projects"
      />

      <GridItem
        area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
        icon={<Trophy className="h-4 w-4 text-white" />}
        title="Awards"
        description="We won nothing lmfao worlds this year trust trust"
      />

      <GridItem
        area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
        icon={<UsersRound className="h-4 w-4 text-white" />}
        title="14 Members"
        description="I forgot their names lmao and also not sure if 14 is the right number either"
      />

      <GridItem
        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
        icon={<Calendar className="h-4 w-4 text-white" />}
        title="Founded in 201X"
        description="Something about rich history blah blah"
      />
    </ul>
  );
}
