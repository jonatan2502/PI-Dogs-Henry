import Styles from './Loader.module.css'

export default function Loader() {
    return (
        <div class={Styles.leap_frog}>
            <div class={Styles.leap_frog__dot}></div>
            <div class={Styles.leap_frog__dot}></div>
            <div class={Styles.leap_frog__dot}></div>
        </div>
    )
}