import Head from 'next/head'
import {Inter} from '@next/font/google'
import "xp.css/dist/XP.css";
import styles from "../styles/Main.module.css"
import {useState} from "react";
import Image from "next/image";
import {element} from "prop-types";


const inter = Inter({subsets: ['cyrillic']})

var icons = [{id: 1, image: "/icon_icon.png", alt: "Биба", content: <p>Тест</p>, title: "Тестирование"}]


function Window(title: String, Content: JSX.Element, p: (b: Boolean) => void) {
    useState()

    return <div className="window">
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
}

function Icon(icon_id: number, image: JSX.Element, WindowChange: (title: String, content: JSX.Element) => void, selected: Boolean, setSelectedId: (id: number) => void) {

    return <div onClick={function () {
        if (selected)
            WindowChange(icons.at(icon_id)!.title, icons.at(icon_id)!.content)
        else
            setSelectedId(icon_id)
    }} className={`${selected ? styles.selected : ''}` + " " + styles.icon}>
        {image}
        <p>{icons.at(icon_id)!.title}</p>
    </div>
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

            {icons.map((icon, index) => (Icon(index, <Image src={icon.image} alt={icon.alt} width={50} height={50}/>, updateWindow, index == selectedIcon, setSelectedId)
                )
            )}
        </main>

    </>
}
