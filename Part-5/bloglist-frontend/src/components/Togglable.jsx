import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWithVisible = { display: visible ? 'none' : '' }
  const showWithVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }

  return (
    <div>
      <div style={hideWithVisible}>
        <button className='newblogBtn' onClick={() => setVisible(!visible)} >
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWithVisible}>
        {props.children}
        <button onClick={() => setVisible(!visible)}>
          cancel
        </button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable