import { Theme } from "../types";
import { SocialIcon } from "react-social-icons";

export default function SocialIconBar({ theme }: { theme: Theme }) {
  return (
    <div className="m-2 flex justify-end space-x-2">
      <SocialIcon
        url="https://www.youtube.com/watch?v=eemS-UTjdb0&list=PLfvLx11x5oR1foMXSlPgwVhWzVGKRzjKR"
        bgColor={theme.color === "light" ? "#FF0000" : "#FFFFFF"}
        fgColor={theme.color === "light" ? "#FFFFFF" : "#FF0000"}
      />
      <SocialIcon
        url="https://www.linkedin.com/in/lukeschlangen/"
        bgColor={theme.color === "light" ? "#007FB1" : "#FFFFFF"}
        fgColor={theme.color === "light" ? "#FFFFFF" : "#007FB1"}
      />
    </div>
  );
}
