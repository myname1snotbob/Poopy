import {Dispatch, SetStateAction, useState} from "react";
import {ExtensionItem, extensions} from "../lib/extensions/builtinExtensions";
import "../styles/editor.css";
import {ChevronLeft} from "lucide-react";

export default function ExtensionMenu({showMenu}:{showMenu:Dispatch<SetStateAction<boolean>>}) {
    return (
        <div style={{position: "absolute", top: 0, left: 0, background:"var(--bg-primary)", width: "100%", height:"100%",zIndex: 10000}}>
            <div className="header-bar" style={{padding:"10px"}}>
                <ChevronLeft style={{cursor:"pointer", position: "absolute", left: "10px"}} onClick={() => showMenu(false)}/>
                <div className= "header-project-name"> Extensions</div>
            </div>
            <div style={{padding: "10px", gap: "10px"}}>
                {extensions.map((ext) => renderExtension(ext, showMenu))}
            </div>
        </div>
    )
}

function renderExtension(ext: ExtensionItem, showMenu:Dispatch<SetStateAction<boolean>>) {
    let extT = ext.img;
    if (extT == undefined) {
        extT = "ext-nothumb.png";
    }
    return (
        <div className="extension-item" onClick={() => {
            showMenu(false);
            fetch("extensions/js/" + ext.jsFile).then((res) => {
                res.text().then((js) => {
                    // TODO: replace with a better system, this is fine for now
                    eval(js);
                })
            })
            }} key={ext.name}>
            <img src={"extensions/thumbs/" +extT} alt={ext.name} style = {{maxWidth: "100%", maxHeight: "100%"}} />
            <h2>{ext.name}</h2>
            <div>{ext.desc}</div>
            <div style={{color: "var(--text-secondary)"}}>Created by {ext.creator}</div>
        </div>
    )
}