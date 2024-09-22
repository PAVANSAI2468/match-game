import './index.css'

const TabItems = props => {
  const {tabDetails, onclickTab, tabsList, isActive} = props
  const {displayText, tabId} = tabDetails

  const changeColor = () => {
    onclickTab(tabId)
  }

  const tabcolor = isActive ? 'underline-text' : ''

  return (
    <li className={`${tabcolor} tabs`} onClick={changeColor}>
      <p className="tab-name">{displayText}</p>
    </li>
  )
}

export default TabItems
