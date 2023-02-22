--region LuaCodeWriter
local LuaCodeWriter = fclass()

function LuaCodeWriter:ctor(config)
    config = config or {}
    self.blockStart = config.blockStart or '{'
    self.blockEnd = config.blockEnd or '}'
    self.blockFromNewLine = config.blockFromNewLine
    if self.blockFromNewLine == nil then
        self.blockFromNewLine = true
    end
    if config.usingTabs then
        self.indentStr = '\t'
    else
        self.indentStr = '    '
    end
    self.usingTabs = config.usingTabs
    self.endOfLine = config.endOfLine or '\n'
    self.lines = {}
    self.indent = 0

    self:writeMark()
end

function LuaCodeWriter:writeMark()
    table.insert(self.lines, '// This is an automatically generated class by FairyGUI. Please do not modify it. ')
    table.insert(self.lines, '')
end

function LuaCodeWriter:writeln(format, ...)
    if not format then
        table.insert(self.lines, '')
        return
    end

    local str = ''
    for i = 0, self.indent - 1 do
        str = str .. self.indentStr
    end
    str = str .. string.format(format, ...)
    table.insert(self.lines, str)

    return self
end

function LuaCodeWriter:startBlock()
    if self.blockFromNewLine or #self.lines == 0 then
        self:writeln(self.blockStart)
    else
        local str = self.lines[#self.lines]
        self.lines[#self.lines] = str .. ' ' .. self.blockStart
    end
    self.indent = self.indent + 1

    return self
end

function LuaCodeWriter:endBlock()
    self.indent = self.indent - 1
    self:writeln(self.blockEnd)

    return self
end

function LuaCodeWriter:incIndent()
    self.indent = self.indent + 1

    return self
end

function LuaCodeWriter:decIndent()
    self.indent = self.indent - 1

    return self
end

function LuaCodeWriter:reset(noWriteMark)
    if #self.lines > 0 then
        self.lines = {}
    end
    self.indent = 0

    if noWriteMark then
        return
    end

    self:writeMark()
end

function LuaCodeWriter:tostring()
    return table.concat(self.lines, self.endOfLine)
end

function LuaCodeWriter:save(filePath)
    local str = table.concat(self.lines, self.endOfLine)

    CS.System.IO.File.WriteAllText(filePath, str)
end

--endregion

local projectCustomPropertiesDic;

local customPropKeys = {
    -- 是否生成Lua代码，默认为值 true
    key_gen_lua = { name = "key_gen_lua", default_value = "true" },
    -- Lua文件的扩展名，默认值为 lua
    key_lua_file_extension_name = { name = "key_lua_file_extension_name", default_value = "ts" },
    -- 生成文件相对于Lua执行根路径的相对路径，默认值为 UIGenCode/
    key_lua_path_root = { name = "key_lua_path_root", default_value = "UIGenCode/" },
    -- 框架层 FairyGUI 导出代码的命名空间，默认值为 CS.FairyGUI
    key_wrapper_namespace = { name = "key_wrapper_namespace", default_value = "" },
}

local function get_project_custom_property_value(key_name)
    if (projectCustomPropertiesDic and projectCustomPropertiesDic:ContainsKey(key_name)) then
        return projectCustomPropertiesDic:get_Item(key_name);
    else
        return customPropKeys[key_name].default_value;
    end
end

function onPublish(handler)
    if not handler.genCode or handler.publishDescOnly then
        return
    end

    projectCustomPropertiesDic = App.project:GetSettings("CustomProperties").elements;

    local gen_lua = get_project_custom_property_value(customPropKeys.key_gen_lua.name);
    if (gen_lua == "true") then
        handler.genCode = false --prevent default output
        App.consoleView:Clear();
        fprint("Handling gen lua code in plugin.")
        genCode(handler)
    end
end

local function genWindowCode(writer, exportCodePath, packageName, className)
    if string.sub(className, -3) ~= "Win" then
        return
    end
    
    local parent = string.match(exportCodePath, "(.-)[\\/][^\\/]-$")
    local rootPath = string.match(parent, "(.-)[\\/][^\\/]-$")
    local dir = rootPath .. "/" .. packageName
    local file = dir .. "/" .. className .. ".ts"

    if CS.System.IO.Directory.Exists(dir) == false then
        CS.System.IO.Directory.CreateDirectory(dir)
    end

    if CS.System.IO.File.Exists(file) then
        return
    end

    local templateTxt = CS.System.IO.File.ReadAllText(PluginPath .. "/window_template.txt");

    templateTxt = string.gsub(templateTxt, "$packageName", packageName);
    templateTxt = string.gsub(templateTxt, "$windowName", className);

    writer:reset(true)
    writer:writeln('%s', templateTxt);

    writer:save(file)
end

function genCode(handler)
    local settings = handler.project:GetSettings("Publish").codeGeneration
    local codePkgName = handler:ToFilename(handler.pkg.name); --convert chinese to pinyin, remove special chars etc.
    local exportCodePath = handler.exportCodePath .. '/' .. codePkgName
    local lua_file_extension_name = get_project_custom_property_value(customPropKeys.key_lua_file_extension_name.name);
    local lua_path_root = get_project_custom_property_value(customPropKeys.key_lua_path_root.name);
    lua_path_root = string.gsub(lua_path_root, "/", ".");
    lua_path_root = string.gsub(lua_path_root, "\\", ".");

    local namespaceName = codePkgName
    local key_wrapper_namespace = get_project_custom_property_value(customPropKeys.key_wrapper_namespace.name);

    if settings.packageName ~= nil and settings.packageName ~= '' then
        namespaceName = settings.packageName .. '.' .. namespaceName;
    end

    --CollectClasses(stripeMemeber, stripeClass, fguiNamespace)
    local classes = handler:CollectClasses(settings.ignoreNoname, settings.ignoreNoname, key_wrapper_namespace)
    handler:SetupCodeFolder(exportCodePath, lua_file_extension_name) --check if target folder exists, and delete old files

    local getMemberByName = settings.getMemberByName
    local classTemplateTxt = CS.System.IO.File.ReadAllText(PluginPath .. "/component_template.txt");
    if (classTemplateTxt == "") then
        fprint("component_template.txt content null.")
        return ;
    end

    local referenceDict = {}
    local classCnt = classes.Count
    local writer = LuaCodeWriter.new({ blockFromNewLine = false, usingTabs = true })

    local function GetTrueType(t)
        if referenceDict[t] then
            return referenceDict[t]
        end

        return t
    end

    for i = 0, classCnt - 1 do
        local _classTemplateTxt = classTemplateTxt;
        local classInfo = classes[i]
        local members = classInfo.members
        local references = classInfo.references
        local oldClassName = classInfo.className

        classInfo.className = "UI_" .. handler.pkg.name .. "_" ..classInfo.className

        writer:reset()

        local refCount = references.Count
        if refCount>0 then
            for j=0,refCount-1 do
                local ref = references[j]
                local name = "UI_" .. handler.pkg.name .. "_" ..ref

                referenceDict[ref] = name

                writer:writeln('import %s from "./%s";', name, name)
            end
            writer:writeln()
        end

        _classTemplateTxt = string.gsub(_classTemplateTxt, "$className", classInfo.className);
        _classTemplateTxt = string.gsub(_classTemplateTxt, "$superClassName", classInfo.superClassName);
        if (key_wrapper_namespace ~= "") then
            _classTemplateTxt = string.gsub(_classTemplateTxt, "$namespace", key_wrapper_namespace .. ".");
        else
            _classTemplateTxt = string.gsub(_classTemplateTxt, "$namespace", "");
        end

        local _classFieldAnnotation = "";
        local memberCnt = members.Count
        for j = 0, memberCnt - 1 do
            if (j > 0) then
                _classFieldAnnotation = _classFieldAnnotation .. "\n";
            end
            local memberInfo = members[j]

            _classFieldAnnotation = _classFieldAnnotation .. string.format('\tpublic %s: %s', memberInfo.varName, GetTrueType(memberInfo.type));
        end

        _classTemplateTxt = string.gsub(_classTemplateTxt, "$classFieldAnnotation", _classFieldAnnotation);

        local _urlValue = string.format('"ui://%s%s"', handler.pkg.id, classInfo.resId)
        _classTemplateTxt = string.gsub(_classTemplateTxt, "$urlValue", _urlValue);
        _classTemplateTxt = string.gsub(_classTemplateTxt, "$uiPackageName", handler.pkg.name);
        _classTemplateTxt = string.gsub(_classTemplateTxt, "$uiResName", classInfo.resName);

        local _classFieldInstatiation = "";
        for j = 0, memberCnt - 1 do
            local memberInfo = members[j]
            if j > 0 then
                _classFieldInstatiation = _classFieldInstatiation .. "\n";
            end
            _classFieldInstatiation = _classFieldInstatiation .. "\t\t";
            if memberInfo.group == 0 then
                if getMemberByName then
                    _classFieldInstatiation = _classFieldInstatiation .. string.format('this.%s = <%s>(this.getChild("%s"));', memberInfo.varName, GetTrueType(memberInfo.type), emberInfo.name);
                else
                    _classFieldInstatiation = _classFieldInstatiation .. string.format('this.%s = <%s>(this.getChildAt(%s));', memberInfo.varName, GetTrueType(memberInfo.type), memberInfo.index);
                end
            elseif memberInfo.group == 1 then
                if getMemberByName then
                    _classFieldInstatiation = _classFieldInstatiation .. string.format('this.%s = <%s>(this.getController("%s"));', memberInfo.varName, GetTrueType(memberInfo.type), memberInfo.name);
                else
                    _classFieldInstatiation = _classFieldInstatiation .. string.format('this.%s = <%s>(this.getControllerAt(%s));', memberInfo.varName, GetTrueType(memberInfo.type), memberInfo.index);
                end
            else
                if getMemberByName then
                    _classFieldInstatiation = _classFieldInstatiation .. string.format('this.%s = <%s>(this.getTransition("%s"));', memberInfo.varName, GetTrueType(memberInfo.type), memberInfo.name);
                else
                    _classFieldInstatiation = _classFieldInstatiation .. string.format('this.%s = <%s>(this.getTransitionAt(%s));', memberInfo.varName, GetTrueType(memberInfo.type), memberInfo.index);
                end
            end
        end
        _classTemplateTxt = string.gsub(_classTemplateTxt, "$classFieldInstantiation", _classFieldInstatiation);
        writer:writeln('%s', _classTemplateTxt);

        writer:save(exportCodePath .. '/' .. classInfo.className .. '.' .. lua_file_extension_name)

        genWindowCode(writer, exportCodePath, handler.pkg.name, oldClassName)
    end

    writer:reset()

    local binderTemplateTxt = CS.System.IO.File.ReadAllText(PluginPath .. "/binder_template.txt");
    if (binderTemplateTxt == "") then
        fprint("binder_template.txt content null.")
        return ;
    end
    local binderName = 'Init' .. codePkgName .. 'UI'

    local _requireStatement = "";

    for i = 0, classCnt - 1 do
        if (i > 0) then
            _requireStatement = _requireStatement .. "\n";
        end
        local classInfo = classes[i]
        _requireStatement = _requireStatement .. string.format('import %s from "./%s"', classInfo.className, classInfo.className);
    end

    binderTemplateTxt = string.gsub(binderTemplateTxt, "$requireStatement", _requireStatement);
    binderTemplateTxt = string.gsub(binderTemplateTxt, "$binderClassName", binderName);

    local _bindStatement = "";
    for i = 0, classCnt - 1 do
        if (i > 0) then
            _bindStatement = _bindStatement .. "\n";
        end
        local classInfo = classes[i]
        _bindStatement = _bindStatement .. "\t";

        if (key_wrapper_namespace ~= "") then
            _bindStatement = _bindStatement .. string.format('%sUIObjectFactory.setExtension(%s.URL, %s)', key_wrapper_namespace .. ".", classInfo.className, classInfo.className);
        else
            _bindStatement = _bindStatement .. string.format('UIObjectFactory.setExtension(%s.URL,%s)', classInfo.className, classInfo.className);
        end


    end
    binderTemplateTxt = string.gsub(binderTemplateTxt, "$bindStatement", _bindStatement);
    writer:writeln('%s', binderTemplateTxt);
    writer:save(exportCodePath .. '/' .. binderName .. '.' .. lua_file_extension_name)

    writer:reset()

    local _readSuccess, _initTxt = pcall(function()
        return CS.System.IO.File.ReadAllText(handler.exportCodePath .. "/FairyGUIComponent.ts");
    end);
    if(not _readSuccess) then
        _initTxt = CS.System.IO.File.ReadAllText(PluginPath .. "/init_template.txt");
    end
    local _requireStatement = string.format('import {%s} from "./%s/%s";',binderName, codePkgName, binderName);
    
    if string.find(_initTxt, _requireStatement, 1, true) == nil then
        local index = string.find(_initTxt, "// importflag")

        if index then
            local new_text = string.sub(_initTxt, 1, index - 1) .. _requireStatement .. "\n" .. string.sub(_initTxt, index)
            _initTxt = new_text
        end
    end

    local _requireStatement = string.format('%s();', binderName);
    
    if string.find(_initTxt, _requireStatement, 1, true) == nil then
        local index = string.find(_initTxt, "// bindFlag")

        if index then
            local new_text = string.sub(_initTxt, 1, index - 1) .. "\t\t" .. _requireStatement .. "\n" .. string.sub(_initTxt, index)
            _initTxt = new_text
        end
    end

    -- _requireStatement = _requireStatement .. string.format('\n%s:BindAll();',binderName);

    -- if(string.find(_initTxt,_requireStatement,1,true) == nil) then
    --     _requireStatement = _requireStatement .. "\n";
    --     _initTxt = _initTxt .. _requireStatement;
    -- end
    CS.System.IO.File.WriteAllText(handler.exportCodePath .. "/FairyGUIComponent.ts", _initTxt);
end


