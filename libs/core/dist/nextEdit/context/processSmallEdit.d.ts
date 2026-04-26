import { IDE, Position } from "../..";
import { GetLspDefinitionsFunction } from "../../autocomplete/types";
import { ConfigHandler } from "../../config/ConfigHandler";
import { BeforeAfterDiff } from "./diffFormatting";
export declare const processSmallEdit: (beforeAfterdiff: BeforeAfterDiff, cursorPosBeforeEdit: Position, cursorPosAfterPrevEdit: Position, configHandler: ConfigHandler, getDefsFromLspFunction: GetLspDefinitionsFunction, ide: IDE) => Promise<void>;
//# sourceMappingURL=processSmallEdit.d.ts.map