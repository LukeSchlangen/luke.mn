export type Vibe = 'standard' | 'professional' | 'fun';
export type Color = 'light' | 'dark';
export type Tense = 'first-person' | 'third-person';
export type Verbosity = 'short' | 'long';



export class Theme {
  vibe: Vibe = 'standard';
  color: Color = 'light';
  tense: Tense = 'first-person';
  verbosity: Verbosity = 'short';
}