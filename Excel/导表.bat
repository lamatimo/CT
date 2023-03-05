set GEN_CLIENT=dotnet ..\Tools\Luban.ClientServer\Luban.ClientServer.dll

%GEN_CLIENT%  --template_search_path Template -j cfg --^
 -d Defines\__root__.xml ^
 --input_data_dir Datas ^
 --output_data_dir ..\Source\configExport ^
 --output_code_dir ..\Source\server\Logic\Game\Generate\Config ^
 --gen_types code_typescript_json,data_json ^
 --typescript:embed_bright_types ^
 -s all
pause