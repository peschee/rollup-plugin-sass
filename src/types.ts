import {types} from 'sass';

export interface IdAndContentObject {
  id?: string,
  content?: string
}

export type RollupPluginSassOutputFn = (styles: string, styleNodes: IdAndContentObject[]) => any;

export type RollupPluginSassProcessorFn<T = string | {css: string}> = (styles: string, id: string) => Promise<T> | T;

export interface RollupPluginSassOptions {
  /**
   * File globs to "exclude" from processing.  Default 'node_modules/**'.
   */
  exclude?: string | string[],

  /**
   * File globs to include in processing.  Default  `['**\/*.sass', '**\/*.scss']`,
   */
  include?: string | string[],

  /**
   * Controls whether to insert generated styles into a style tag on (html) page's `head` or not.
   */
  insert?: boolean,

  /**
   * Options to pass to resolved sass runtime instance (node-sass/sass etc.).
   */
  options?: SassOptions,

  processor?: RollupPluginSassProcessorFn,

  /**
   * Controls where sass output is generated to.  If `false`, the default, output is generated at the resolved location
   * by rollup;  E.g., content is output to your rollup `output` configs format, and location; E.g., @todo add example
   *
   * If `true` the bundle is output as '*.css' file, at location where bundle would've been generated to originally.
   *
   * If is a function, control of where, or how, the bundle is generated is left to the user;
   * ```typescript
   * output(styles: string[], styleNodes: {id: string, content: string}[]): void {
   *   writeFileSync('bundle.css', styles);
   * }
   * ```
   */
  output?: boolean | string | RollupPluginSassOutputFn,

  /**
   * Sass runtime instance - sass, node-sass or other etc..
   */
  runtime?: any,
}

export type SassImporterResult = null | {
  file?: string,
  contents?: string
} | Error;

export type SassDoneFn<T extends SassImporterResult = SassImporterResult> =
  (result: T) => void | T;

export type SassImporter<T extends SassImporterResult = SassImporterResult> =
  (url: string, prev: string, done: SassDoneFn<T>) => void | T;

export interface SassFunctionsObject {
  [index: string]: types.Color | types.Number | types.String | types.List | types.Map | types.Null;
}

/**
 * All option types taken from https://github.com/sass/node-sass#options -
 * **Note:** As noted by dart-sass project "When installed via npm, Dart Sass supports a JavaScript API that's fully
 * compatible with Node Sass (with a few exceptions listed below) ...".  See the (dart) sass npm page for more:
 * https://www.npmjs.com/package/sass
 */
export interface SassOptions {
  data?: string,
  file?: string,
  functions?: SassFunctionsObject,
  importer?: SassImporter | SassImporter[],
  includePaths?: string[],
  indentType?: 'space' | 'tab',
  indentWidth?: number,
  indentedSyntax?: boolean,
  linefeed?: string,
  omitSourceMapUrl?: boolean,
  outFile?: string,
  outputStyle?: 'compressed' | 'expanded',
  sourceMapContents?: boolean,
  sourceMapEmbed?: boolean,
  sourceMapRoot?: string,
  sourceMap?: boolean | string | undefined
}

/**
 * Rollup's `AssetInfo` bundle type.
 */
export interface RollupAssetInfo {
  fileName: string,
  name?: string,
  source: string | Uint8Array,
  type: 'asset',
}

/**
 * Rollup's `ChunkInfo` bundle type.
 */
export interface RollupChunkInfo {
  code: string,
  dynamicImports: string[],
  exports: string[],
  facadeModuleId: string | null,
  fileName: string,
  implicitlyLoadedBefore: string[],
  imports: string[],
  importedBindings: { [imported: string]: string[] },
  isDynamicEntry: boolean,
  isEntry: boolean,
  isImplicitEntry: boolean,
  map: { [index: string]: string } | null,
  modules: {
    [id: string]: {
      renderedExports: string[],
      removedExports: string[],
      renderedLength: number,
      originalLength: number,
      code: string | null
    },
  },
  name: string,
  referencedFiles: string[],
  type: 'chunk',
}
