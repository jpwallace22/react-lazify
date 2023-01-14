import { addNamedImport } from "../utils/importUtilities";
import convertSelected from "./convertSelected";

export interface IConfiguration {
  imports?: {
    useDefaultReactImport?: boolean;
  };
}

export default async (config?: IConfiguration) => {
  await convertSelected(config?.imports);
  await addNamedImport("lazy", "react");
};
