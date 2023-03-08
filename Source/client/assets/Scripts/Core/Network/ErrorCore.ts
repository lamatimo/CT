export class ErrorCore {
    public static readonly ERR_MyErrorCode = 110000;

    public static readonly ERR_WChannelReadError = 100201;
    public static readonly ERR_SendMessageNotFoundWChannel = 100202;
    public static readonly ERR_RpcFail = 110307;
    

    public static readonly ERR_KcpConnectTimeout = 100205;
    public static readonly ERR_KcpAcceptTimeout = 100206;
    public static readonly ERR_PeerDisconnect = 100208;
    public static readonly ERR_SocketCantSend = 100209;
    public static readonly ERR_SocketError = 100210;
    public static readonly ERR_KcpWaitSendSizeTooLarge = 100211;
    public static readonly ERR_KcpCreateError = 100212;
    public static readonly ERR_TChannelRecvError = 100214;
    public static readonly ERR_MessageSocketParserError = 100215;
    public static readonly ERR_KcpNotFoundChannel = 100216;

    public static readonly ERR_WebsocketSendError = 100217;
    public static readonly ERR_WebsocketPeerReset = 100218;
    public static readonly ERR_WebsocketMessageTooBig = 100219;
    public static readonly ERR_WebsocketRecvError = 100220;

    public static readonly ERR_KcpReadNotSame = 100230;
    public static readonly ERR_KcpSplitError = 100231;
    public static readonly ERR_KcpSplitCountError = 100232;

    public static readonly ERR_ActorLocationSenderTimeout = 110004;
    public static readonly ERR_PacketParserError = 110005;
    public static readonly ERR_KcpChannelAcceptTimeout = 110206;
    public static readonly ERR_KcpRemoteDisconnect = 110207;
    public static readonly ERR_WebsocketError = 110303;
    public static readonly ERR_WebsocketConnectError = 110304;
    public static readonly ERR_ReloadFail = 110308;
    public static readonly ERR_ConnectGateKeyError = 110309;
    public static readonly ERR_SessionSendOrRecvTimeout = 110311;
    public static readonly ERR_OuterSessionRecvInnerMessage = 110312;
    public static readonly ERR_NotFoundActor = 110313;
    public static readonly ERR_ActorTimeout = 110315;
    public static readonly ERR_UnverifiedSessionSendMessage = 110316;
    public static readonly ERR_ActorLocationSenderTimeout2 = 110317;
    public static readonly ERR_ActorLocationSenderTimeout3 = 110318;
    public static readonly ERR_ActorLocationSenderTimeout4 = 110319;
    public static readonly ERR_ActorLocationSenderTimeout5 = 110320;

    public static readonly ERR_KcpRouterTimeout = 110401;
    public static readonly ERR_KcpRouterTooManyPackets = 110402;
    public static readonly ERR_KcpRouterSame = 110403;
    public static readonly ERR_KcpRouterConnectFail = 110404;
    public static readonly ERR_KcpRouterRouterSyncCountTooMuchTimes = 110405;
    public static readonly ERR_KcpRouterSyncCountTooMuchTimes = 110406;

    // 110000 以上，避免跟SocketError冲突

    // 小于这个Rpc会抛异常，大于这个异常的error需要自己判断处理，也就是说需要处理的错误应该要大于该值
    public static ERR_Exception = 200000;

    public static ERR_Cancel = 200001;

    public static IsRpcNeedThrowException(error: number): boolean {
        if (error == 0) {
            return false;
        }
        // ws平台返回错误专用的值
        if (error == -1) {
            return false;
        }

        if (error > ErrorCore.ERR_Exception) {
            return false;
        }

        return true;
    }
}