import Styles from './Loader.module.css'

export default function Loader() {
    return (
        <div className={Styles.container}>
            <div className={Styles.leap_frog}>
                <div className={Styles.leap_frog__dot}></div>
                <div className={Styles.leap_frog__dot}></div>
                <div className={Styles.leap_frog__dot}></div>
            </div>
        </div>
    )
}