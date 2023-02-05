import { workspace } from "vscode";

export interface IConfiguration {
  importConfig?: {
    useDefaultReactImport: boolean;
    frameworkSource: "react" | "loadable" | "next";
  };
}

export const importConfig: IConfiguration["importConfig"] | undefined =
  workspace.getConfiguration("lazify").get("imports");

export const lazyFrameworkInfo = (
  importConfig: IConfiguration["importConfig"]
) => {
  if (!importConfig) {
    return {
      importName: "lazy",
      importPath: "react",
      functionName: "lazy",
    } as const;
  }

  const { frameworkSource, useDefaultReactImport } = importConfig;

  const importNameMap = {
    react: useDefaultReactImport ? "React" : "lazy",
    next: "dynamic",
    loadable: "loadable",
  } as const;

  const importPathMap = {
    react: "react",
    next: "next/dynamic",
    loadable: "@loadable/component",
  } as const;

  const functionNameMap = {
    react: useDefaultReactImport ? "React.lazy" : "lazy",
    next: "dynamic",
    loadable: "loadable",
  } as const;

  return {
    importName: importNameMap[frameworkSource],
    importPath: importPathMap[frameworkSource],
    functionName: functionNameMap[frameworkSource],
  };
};
