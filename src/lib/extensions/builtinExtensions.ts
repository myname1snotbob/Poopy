// modify this to add new extensions to the menu
// built in extensions should be trusted

export type ExtensionItem = {
    name:string,
    img?:string,
    desc:string,
    creator:string,
    jsFile:string,
}

export const extensions:ExtensionItem[] = [
    /*
    {
        name: "test",
        desc: "this is a test!",
        creator:"Antimony Team",
        jsFile:"test.js"
    }
    */
]