import darkLogo from "@/assets/TEAM_BHADRAKALI_Logo.png.asset.json";
import whiteLogo from "@/assets/TEAM_BHADRAKALI_Logo_white.png.asset.json";

/** Dark artwork on light theme, white artwork on dark theme — switched by CSS so server and client markup match. */
export function BrandLogo({ className }: { className: string }) {
  return (
    <>
      <img src={darkLogo.url} alt="Team Bhadrakali" className={`${className} dark:hidden`} width={862} height={469} />
      <img src={whiteLogo.url} alt="Team Bhadrakali" className={`${className} hidden dark:block`} width={862} height={469} />
    </>
  );
}
