import { Component } from "../../components/Component";

export class HeroSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: props.title || "Welcome to Runsley",
            subtitle: props.subtitle || "Track your runs and improve your performance"
        };
    }

    createElement() {
        return this.createDOMElement('section', {className: 'hero'}, [
               this.createTitle(),
               this.createSubtitle()
            ]
        ) 
    }

    createTitle() {
        return this.createDOMElement('h1', {
            className: 'hero__title',
            textContent: this.state.title
        })
    }

    createSubtitle() {
        return this.createDOMElement('p', {
            className: 'hero__subtitle',
            textContent: this.state.subtitle
        })
    }

}
    
