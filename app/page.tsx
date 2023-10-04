"use client"

import Link from "next/link"

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex grid-rows-3 flex-col gap-8 pb-24 md:order-last md:grid md:grid-cols-[1fr,2fr] md:grid-rows-2 lg:grid-cols-[1fr,3fr]">
        <div className="order-1  flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-medium md:text-4xl">
            Gaussian Splatting <br />
            React Three Fiber
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            a simple and interactive components for react-three-fiber, based on
            the groundwork of
            <Link
              target="blank"
              className="underline"
              href={"https://github.com/antimatter15/splat"}
            >
              {" "}
              antimatter15’s original WebGL implementation
            </Link>{" "}
            and{" "}
            <Link
              target="blank"
              className="underline"
              href={
                "https://github.com/vincent-lecrubier-skydio/react-three-fiber-gaussian-splat"
              }
            >
              crubier’s r3f port
            </Link>
            .
          </p>
        </div>
        <div className="order-3">
          <h3 className="mt-8 text-xl font-medium">Utilized Technologies: </h3>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            <Link
              target="blank"
              className="underline"
              href={
                "https://docs.pmnd.rs/react-three-fiber/getting-started/introduction"
              }
            >
              🇨🇭 r3f
            </Link>
            : Creating efficient 3D scenes.
            <br />
            <Link
              target="blank"
              className="underline"
              href={"https://nextjs.org/"}
            >
              🖥️ Next.js 13
            </Link>
            : Optimizing the web application.
            <br />
            <Link
              target="blank"
              className="underline"
              href={"https://ui.shadcn.com/"}
            >
              🖌️ shadcn/ui
            </Link>
            : Managing the visuals and aesthetics.
          </p>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            For more on the underlying technology and research,{" "}
            <Link
              target="blank"
              className="underline"
              href="https://github.com/graphdeco-inria/gaussian-splatting"
            >
              see the original documentation.
            </Link>
          </p>
        </div>
        <div className="relative order-2 row-span-2 flex aspect-square md:aspect-auto">
          <div className=" absolute aspect-square w-full bg-background md:aspect-auto md:h-full">
            {/* <Page /> */}
          </div>
        </div>
      </div>
    </section>
  )
}
