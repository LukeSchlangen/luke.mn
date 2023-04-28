import { Theme } from "../types";

export default function ({vibe, color, tense, verbosity}: Theme) {
  return {
    vibe: vibe === 'standard' ? '' : `/${vibe}`,
    color: color === 'light' ? '' : `/${color}`,
    tense: tense === 'first-person' ? '' : `/${tense}`,
    verbosity: verbosity === 'short' ? '' : `/${verbosity}`,
  }
}