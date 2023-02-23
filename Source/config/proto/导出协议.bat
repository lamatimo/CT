protoc --plugin=protoc-gen-ts_proto=..\..\node_modules\.bin\protoc-gen-ts_proto.cmd --ts_proto_opt=esModuleInterop=true --ts_proto_out=..\..\server\Logic\Game\Generate\Message ./*.proto

@echo off
echo.
echo export success
pause>nul