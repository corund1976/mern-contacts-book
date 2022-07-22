import PropTypes, { node } from 'prop-types'

import s from './container.module.css'

function Container({ children }) {
  return <div className={s.container}>{children}</div>
}

Container.propTypes = {
  children: PropTypes.node,
}

Container.defaultProps = {
  children: node,
}

export default Container
