import { Theme } from "../types";
import NotificationBar from "./notification-bar";
import ProfileImage from "./profile-image";
import Bio from "./bio";
import VibeToggle from "./toggles/vibe-toggle";
import ColorToggle from "./toggles/color-toggle";
import { SocialIcon } from "react-social-icons";

export default function Header({ theme }: { theme: Theme }) {
  const isLight = theme.color === "light";

  return (
    <>
      <span className="block md:hidden">
        <NotificationBar theme={theme} />
      </span>
      <div className="m-1 flex max-w-fit md:m-auto">
        <div>
          <header>
            <span className="hidden md:block">
              <NotificationBar theme={theme} />
            </span>
            <div
              className={`-mr-4 mt-16 rounded-lg border p-4 drop-shadow-xl sm:pr-8 md:mt-12 ${
                isLight ? "bg-gray-50" : "bg-gray-950"
              }`}
            >
              <h1 className="mb-2 md:flex">
                <div className="pr-3 text-6xl sm:text-7xl">Luke</div>
                <div className="text-3xl sm:text-5xl md:text-7xl">
                  Schlangen
                </div>
              </h1>
              <nav className="text-3xl sm:flex sm:justify-between md:text-4xl">
                <VibeToggle theme={theme} />
                <ColorToggle theme={theme} />
              </nav>
            </div>
          </header>
          <div className="hidden md:block">
            <Bio theme={theme} />
          </div>
        </div>
        <ProfileImage theme={theme} />
      </div>
    </>
  );
}
