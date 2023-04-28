export type Vibe = 'standard' | 'professional' | 'fun';
export type Color = 'light' | 'dark';
export type Tense = 'first-person' | 'third-person';
export type Verbosity = 'short' | 'long';



export type Theme = {
  vibe: Vibe;
  color: Color;
  tense: Tense;
  verbosity: Verbosity;
}