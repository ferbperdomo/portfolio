import { useTranslations } from "next-intl";
import HeroSection from "./HeroSection";
import Navbar from "./Navbar";

export default function Home() {
  const t = useTranslations();

  return (
    <>
      <Navbar />
      <HeroSection />
    </>
  );
}
