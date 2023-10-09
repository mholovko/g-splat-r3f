import Image from "next/image"
import Link from "next/link"

import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/input"

export default async function IndexPage() {
  const polycamData = await fetch(
    "https://poly.cam/_next/data/A4Ox-UC88BcuEhEL93Rlb/gaussian-splatting.json"
  ).then((res) => res.json())
  const highlights = polycamData.pageProps.popularFeed.results

  // console.log(highlights)
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="order-1  flex flex-col items-start gap-2">
        <div className="flex w-full gap-8">
          <div className=" flex flex-col justify-between gap-4">
            <h1 className="text-3xl font-medium md:text-3xl">
              Explore Polycam Gaussian Splat Models
            </h1>
            <div className="flex flex-col gap-4 ">
              <p className="max-w-[700px] text-lg text-muted-foreground">
                Polycam is the leading 3D capture application for iPhone and
                iPad! Create high-quality 3D models from photos with any iPhone
                or iPad, rapidly generate scans of spaces with the LiDAR sensor,
                and capture full 360 photos with ease.
              </p>
              <p className="max-w-[700px] text-lg text-muted-foreground">
                Recently, Polycam released
                <Link
                  target="blank"
                  className="underline"
                  href={"https://poly.cam/gaussian-splatting"}
                >
                  {" "}
                  a new Gaussian splat viewer and creator.
                </Link>
              </p>
              <div className="pt-12">
                <Input />
              </div>
            </div>
          </div>
          <div className="relative aspect-auto h-full overflow-hidden rounded-sm bg-slate-700 lg:aspect-[4/3] lg:rounded-lg">
            <video
              className=" h-full w-full scale-[1.01] rounded-lg object-cover object-top"
              autoPlay
              loop
              muted
              playsInline
              poster="/polycam_demo.png"
            >
              <source src="/polycam_demo.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        <h2 className="py-8 text-xl font-medium ">
          Or select model from Polycam Featured section:
        </h2>
        <Separator />
        <div className="grid grid-cols-2 gap-4 py-2 md:grid-cols-4 md:gap-4 md:py-4">
          {highlights.map((item, index) => (
            <div key={item.id}>
              <div className="relative">
                <Link
                  className=" relative block h-full "
                  href={`polycam/${item.objectID}`}
                >
                  <Image
                    className="reliative aspect-[4/3] rounded-sm shadow hover:shadow-lg"
                    src={item.thumbnail}
                    width={512}
                    height={512}
                    alt={item.name}
                    layout="responsive"
                    style={{ objectFit: "cover" }}
                  />
                </Link>
                <svg
                  className="absolute  bottom-0 right-0 z-10 h-8 w-8"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.03 15.727V10.394L16 5.515V10.6L9.03 15.727ZM8.515 10.092 9.03 10.39V15.727L8.515 15.39V10.092ZM22.985 10.436 16 5.516V10.6L19.59 13.248 22.986 10.436ZM16.879 16.21 23.833 10.42V15.223L20.076 18.438 16.879 16.209ZM16 21.22V16.194L23.454 21.384V26.484L16 21.22ZM23.849 26.17 23.455 26.486V21.385L23.849 21.1V26.17Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
              <p className="truncate pt-2 font-medium">
                {item.name ? `${item.name}` : "Gaussian Splat"}
              </p>
              <div className="flex justify-between">
                <Link
                  target="blank"
                  href={`https://poly.cam/@${item.account.name}`}
                  className="truncate text-sm text-muted-foreground"
                >{`@${item.account.name}`}</Link>
                <Link
                  target="blank"
                  className="min-w-fit text-sm text-muted-foreground underline"
                  href={`https://poly.cam/gaussian-splatting?capture=${item.id}`}
                >
                  original polycam
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="grid gap-2"></div>
      </div>
    </section>
  )
}
