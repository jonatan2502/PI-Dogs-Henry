import Styles from './Footer.module.css'
import { BsFillSuitHeartFill } from 'react-icons/bs'
import { BsGithub } from 'react-icons/bs'
import { BsLinkedin } from 'react-icons/bs'

export default function Footer() {
    return (
        <div className={Styles.footer}>
            <p>Developed with <BsFillSuitHeartFill className={Styles.heart}/> by Jonatan Piedra</p>
            <div className={Styles.links}>
                <a target='_blank' rel="noreferrer" href='https://www.linkedin.com/in/jonatan-piedra-9036ab4b/'><BsLinkedin/></a>  
                <a target='_blank' rel="noreferrer" href='https://github.com/jonatan2502'><BsGithub/></a>
            </div>
        </div>
    )
}