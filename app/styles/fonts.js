import { Press_Start_2P, Source_Code_Pro } from "next/font/google";
import localFont from "next/font/local";

const pressStart2P = Press_Start_2P({ subsets: ["latin"], weight: "400" });
const sourceCodePro = Source_Code_Pro({ subsets: ["latin"], weight: "400" });
const instrumentSans = localFont({
  src: "./InstrumentSans-VariableFont_wdth,wght.ttf",
});

export { pressStart2P, sourceCodePro, instrumentSans };
