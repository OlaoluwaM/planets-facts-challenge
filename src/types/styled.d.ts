// import original module declarations
import 'styled-components';
import type { ThemeInterface } from './custom';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeInterface {
    borderRadius?: string;

    colors?: {
      main: string;
      secondary: string;
    };
  }
}
