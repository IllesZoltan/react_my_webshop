import React from 'react'
import './Products.css'

class ImageGallery extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            images: props.images
        }
    }

    scrollRight() {
        const newImages = [...this.state.images.slice(1), this.state.images[0]]
        this.setState({
            images: newImages
        })
    }

    scrollLeft(){
        const newImages = [this.state.images[this.state.images.length-1], ...this.state.images.slice(0,this.state.images.length-1)]
        this.setState({
            images: newImages
        })
    }

    render() {
        return (
            <div className="images_container">
                <div className="img-display-cont">
                    <div className="img-display">
                        <img src={this.state.images[0]} alt="large_image"/>
                    </div>

                </div>
                <div className="thumbs-container">
                    <div className="Lbtn btns"><button onClick={() => this.scrollLeft()}> prev </button></div>
                    <div className="thumbs">
                        {this.state.images.map((elem, idx) => {
                            return (
                                <div key={idx} className="prod-images"><img src={elem} alt="mobilephone" /></div>
                                )
                            })
                        }
                    </div>
                    <div className="Rbtn btns"><button onClick={() => this.scrollRight()}> next </button></div>
                </div>

            </div>
        )
    }
}

/*

1. rendereljkük az összes képet, de csak annyi látszódjon, amennyi elfér
  - CSS-ből állítsuk be, hogy az Image Gallwey ne jelenítse meg a "kilógó tartalmat" (overflow: hidden)

2. amikor "lapozunk", akkor az első kép és az utolsó kép pozícióját cserélgessük

3. mindig az images első eleme lesz megjelenítve

4. amikor redux storet behozzuk a mapstatetopropsban, akkor a primary imaget rakjuk be a prop
tömb legelejére

*/

export default ImageGallery;