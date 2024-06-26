import classes from './Loader.module.scss'

import loaderIcon from '@/assets/images/loader.svg'

function Loader() {
  return <img className={classes.loader} src={loaderIcon} alt="loader" />
}

export default Loader
