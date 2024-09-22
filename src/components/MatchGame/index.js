import {Component} from 'react'
import TabItems from '../TabItems'
import './index.css'

class MatchGame extends Component {
  state = {
    activeTab: false,
    scorecard: false,
    activeListItems: [],
    activeTabId: 'FRUIT',
    score: 0,
    timer: 59,
    timerId: null,
    activeCard:
      'https://assets.ccbp.in/frontend/react-js/match-game/orange-img.png', // To store the clicked image URL
  }

  componentDidMount() {
    this.timerStart()
  }

  timerStart = () => {
    const timerId = setInterval(() => {
      this.setState(prevState => {
        if (prevState.timer > 0) {
          return {timer: prevState.timer - 1}
        }
        this.stopTimer() // Stop the timer when it reaches 0
        return {timer: 0}
      })
    }, 1000)

    this.setState({timerId}) // Store the timer ID for clearing it later
  }

  stopTimer = () => {
    const {timerId} = this.state
    clearInterval(timerId)
  }

  onclickTab = tabId => {
    this.setState({activeTabId: tabId})
  }

  // Function to handle image click and set the active image
  changeImgcard = (id, list) => {
    const {timer, activeCard} = this.state
    const imageShow = list.find(each => each.id === id)
    console.log(imageShow)
    if (imageShow.imageUrl === activeCard) {
      if (timer > 0) {
        const {score} = this.state
        const randomIndex = Math.floor(Math.random() * list.length) // Generate random index
        this.setState({
          activeCard: list[randomIndex].imageUrl, // Pick a random image
          score: score + 1,
        })
      }
    } else {
      this.setState({scorecard: true})
    }
  }

  render() {
    const {tabsList, imagesList} = this.props
    const {activeTabId, activeCard, score, timer, scorecard} = this.state

    // Filtering images based on the active tab
    const filteredImagesList = imagesList.filter(
      each => each.category === activeTabId,
    )

    return (
      <>
        {scorecard ? (
          <h1>{score}</h1>
        ) : (
          <div className="bg">
            <nav className="navbar">
              <div>
                <img
                  className="logo"
                  src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
                  alt="website logo"
                />
              </div>
              <div className="timer-container">
                <h1 className="score">Score: {score}</h1>
                <div className="timer-container">
                  <img
                    className="timer"
                    src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                    alt="timer"
                  />
                  <p>{timer} sec</p>
                </div>
              </div>
            </nav>
            <div className="main-section">
              {/* Displaying the active image if clicked */}
              <div className="card">
                {activeCard !== '' ? (
                  <img className="cardImg" src={activeCard} alt="selected" />
                ) : (
                  <img
                    className="cardImg"
                    src={imagesList[0].imageUrl}
                    alt="default"
                  />
                )}
              </div>

              {/* Tabs List */}
              <div>
                <ul className="tabslist">
                  {tabsList.map(each => (
                    <TabItems
                      key={each.tabId}
                      isActive={each.tabId === activeTabId}
                      tabDetails={each}
                      onclickTab={this.onclickTab}
                    />
                  ))}
                </ul>
              </div>

              {/* Images List */}
              <div className="image-list">
                <ul>
                  {filteredImagesList.map(each => (
                    <li key={each.id}>
                      <img
                        className="tumbnailimages"
                        src={each.thumbnailUrl}
                        alt={each.id}
                        onClick={() => this.changeImgcard(each.id, imagesList)}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </>
    )
  }
}

export default MatchGame
