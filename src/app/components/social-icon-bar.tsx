import { Theme } from "../types";
import { SocialIcon } from "react-social-icons";

export default function SocialIconBar({ theme }: { theme: Theme }) {
  return (
    <div className="flex justify-end space-x-2 m-2">
      <SocialIcon
        url="https://www.youtube.com/@ContainerBytes"
        bgColor={theme.color === "light" ? "#FF0000" : "#FFFFFF"}
        fgColor={theme.color === "light" ? "#FFFFFF" : "#FF0000"}
      />
      <SocialIcon
        url="https://www.linkedin.com/in/lukeschlangen/"
        bgColor={theme.color === "light" ? "#007FB1" : "#E9E9EA"}
        fgColor={theme.color === "light" ? "#E9E9EA" : "#007FB1"}
      />
    </div>
  );
}
