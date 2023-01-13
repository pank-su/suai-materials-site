import Head from 'next/head'
import {Inter} from '@next/font/google'
import "xp.css/dist/XP.css";
import styles from "../styles/Main.module.css"
import {useState} from "react";
import Image from "next/image";
import Draggable from 'react-draggable';




var icons = [{id: 1, image: "/icon_icon.png", alt: "Биба", content: <p>Тест</p>, title: "Тестирование"}, {id: 1, image: "/icon_icon.png", alt: "Биба", content: <p>Тест</p>, title: "Тестирование"}]
// Сделать несколько окон
var windows = []


function Window(title: String, Content: JSX.Element, p: (b: Boolean) => void) {
    useState()

    return <Draggable bounds="html" handle=".handle">
        <div className="window handle">
            <div className="title-bar">
                <div className="title-bar-text">{title}</div>
                <div className="title-bar-controls">
                    <button aria-label="Help"></button>
                    <button onClick={() => p(false)} aria-label="Close"></button>
                </div>
            </div>
            <div className="window-body">
                {Content}
            </div>
        </div>
    </Draggable>
}

function Icon(icon_id: number, WindowChange: (title: String, content: JSX.Element) => void, selected: Boolean, setSelectedId: (id: number) => void) {

    return <Draggable bounds="html" handle=".handle"><div onClick={function () {
        if (selected)
            WindowChange(icons.at(icon_id)!.title, icons.at(icon_id)!.content)
        else
            setSelectedId(icon_id)
    }} className={`${selected ? styles.selected : ''}` + " " + styles.icon}>
        <Image className={"handle"} src={icons.at(icon_id)!.image} alt={icons.at(icon_id)!.title} width={50} height={50} />
        <p>{icons.at(icon_id)!.title}</p>
    </div></Draggable>
}

export default function StartPage() {
    const [isWindowOpen, setIsWindowOpen] = useState(true);
    const [titleWindow, setTitleWindow] = useState("Окно помощи")
    const [contentWindow, setWindowContent] = useState(<p>Тут давно не убирались и почему-то здесь всё вернулось в 2003
        год... Но вы сюда за материалами, так кликайте и открывайте окна.</p>)

    function setIsOpenValue(value: Boolean) {
        // @ts-ignore
        setIsWindowOpen(value);
    }

    function updateWindow(title: String, content: JSX.Element) {
        setIsWindowOpen(true)
        // @ts-ignore
        setTitleWindow(title)
        setWindowContent(content)
    }

    const [selectedIcon, setSelectedIcon] = useState(-1)

    function setSelectedId(id: number) {
        setSelectedIcon(id)
    }

    return <>
        <Head>
            <title>Материалы 09.02.07</title>
        </Head>
        <main>
            <div className={`${isWindowOpen ? 'open' : 'close'}` + " " + styles.main}>
                {Window(titleWindow, contentWindow, (b: Boolean) => setIsOpenValue(b))}
            </div>
            <div className={styles.icons}>
                {icons.map((icon, index) => (Icon(index, updateWindow, index == selectedIcon, setSelectedId)
                    )
                )}
            </div>

        </main>

    </>
}
