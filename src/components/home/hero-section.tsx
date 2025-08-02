import { Button } from "../ui/button";

export function HeroSection() {
  return (
    <section className="relative px-6 py-5">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-4xl">
          <h2 className="mb-8 text-5xl leading-[1.1] font-light tracking-tight text-white md:text-6xl">
            Pinewood Robotics
            <span className="block text-[#70cd35]">Team 4765 Blog</span>
          </h2>
          <p className="mb-12 max-w-3xl text-xl leading-relaxed text-gray-400">
            Follow our journey as we design, build, and compete with
            cutting-edge robotics technology. From innovative engineering
            solutions to championship victories, discover the intersection of
            creativity and precision engineering.
          </p>
        </div>
      </div>
    </section>
  );
}
