import Image from "next/image";
import { Phone } from "lucide-react";
import { site } from "@/lib/site";
import { Button } from "./Button";
import Reveal from "./Reveal";

type Props = {
  title?: string;
  text?: string;
  image?: string;
};

export default function CTASection({
  title = "Take the first step toward recovery today",
  text = "If you or a loved one is struggling with addiction or a mental health condition, Seaside Wellness is here to help. Reach out for a confidential, no-obligation assessment — most major insurance plans accepted.",
  image = "/wp-content/uploads/2025/08/17-web-or-mls-DJI_0175_6_7_8_9.jpg",
}: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-ocean-700">
      <Image src={image} alt="" fill sizes="100vw" className="object-cover opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-br from-ocean-800/90 via-ocean-700/85 to-ink/85" />
      <div className="container-page relative py-16 md:py-24">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-gold-300 mb-4">100% Confidential · Free Assessment</p>
          <h2 className="text-3xl font-medium text-white sm:text-4xl lg:text-5xl">{title}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-cream/85">{text}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button href={site.phoneHref} size="lg" variant="primary">
              <Phone className="size-4" /> Call {site.phone}
            </Button>
            <Button href="/contact" size="lg" variant="onDark">
              Request a Callback
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
