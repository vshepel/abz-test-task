import classes from './Logo.module.scss'
import logo from '@/assets/images/logo.svg'

function Logo() {
  return (
    <a className={classes.logo} href="/">
      <img src={logo} alt="Logotype" />
    </a>
  )
}

export default Logo
