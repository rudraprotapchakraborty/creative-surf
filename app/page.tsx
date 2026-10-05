import Hero from "./components/home/Hero";
import ClientShore from "./components/home/ClientShore";
import Capabilities from "./components/home/Capabilities";
import Work from "./components/home/Work";
import RealEstate from "./components/home/RealEstate";
import CvTool from "./components/home/CvTool";
import Voices from "./components/home/Voices";
import Closing from "./components/home/Closing";

/**
 * The homepage reads as one argument, in order:
 *
 *   what this is (hero + the outcomes it produces) → who already trusts it →
 *   what exactly we do → proof of the craft → the other business →
 *   something you can use right now → what clients say → the ask.
 *
 * A server component: each section is its own client island, so nothing that
 * doesn't move or translate ships as JavaScript for the page shell.
 */
export default function Page() {
  return (
    <div className="flex min-h-screen flex-col bg-cs-bg text-cs-ink">
      <Hero />
      {/* Below the hero, each section is styled and laid out only as it nears
          the screen (.cs-defer in globals.css). */}
      <div className="cs-defer"><ClientShore /></div>
      <div className="cs-defer"><Capabilities /></div>
      <div className="cs-defer"><Work /></div>
      <div className="cs-defer"><RealEstate /></div>
      <div className="cs-defer"><CvTool /></div>
      <div className="cs-defer"><Voices /></div>
      <div className="cs-defer"><Closing /></div>
    </div>
  );
}
