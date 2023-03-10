import { ctLog } from "../../../../../Scripts/Core/Log/Logger";
import { NetServices } from "../../../../../Scripts/Core/Network/NetServices";
import { OpcodeRangeDefine } from "../../../../../Scripts/Core/Network/OpcodeRangeDefine";
import { OuterMessage } from "../../Game/Generate/Message/OuterMessage";

export class OpcodeHelper {
    private static readonly ignoreDebugLogMessageSet: Set<number> = new Set([
        OuterMessage.C2G_Ping,
        OuterMessage.G2C_Ping
    ])

    private static IsNeedLogMessage(opcode: number): boolean {
        if (OpcodeHelper.ignoreDebugLogMessageSet.has(opcode)) {
            return false;
        }

        return true;
    }

    public static IsOuterMessage(opcode: number): boolean {
        return opcode < OpcodeRangeDefine.OuterMaxOpcode;
    }

    public static IsInnerMessage(opcode: number): boolean {
        return opcode >= OpcodeRangeDefine.InnerMinOpcode;
    }

    public static LogMsg(zone: number, message: any): void {
        let opcode = NetServices.inst.GetOpcode(message.constructor);

        if (!this.IsNeedLogMessage(opcode)) {
            return;
        }

        ctLog(`[OpcodeHelper] zone: ${zone} ${JSON.stringify(message)}`);
    }
}