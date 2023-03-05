{{
    name = x.name
    namespace = x.namespace
    tables = x.tables

}}

type JsonLoader = (file: Array<string>) => any

export class {{name}} {
    {{~ for table in tables ~}}
    private static _{{table.name}}: {{table.full_name}}
{{~if table.comment != '' ~}}
    /**
     * {{table.escape_comment}}
     */
{{~end~}}
    static get {{table.name}}(): {{table.full_name}}  { return this._{{table.name}};}
    {{~end~}}

    public static async init(loader: JsonLoader) {
        let tables = new Map<string, any>()
        let loadList: Array<string> = new Array

        {{~for table in tables ~}}
        loadList.push('{{table.output_data_file}}')
        {{~end~}}

        let dataMap: Map<string, any> = await loader(loadList)

        {{~for table in tables ~}}
        this._{{table.name}} = new {{table.full_name}}(dataMap.get('{{table.output_data_file}}'))
        tables.set('{{table.full_name}}', this._{{table.name}})
        {{~end~}}

        {{~ for table in tables ~}}
        this._{{table.name}}.resolve(tables)
        {{~end~}}
    }
}
