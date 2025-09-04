import { Component } from "../../components/Component";
import { HeroSection } from "./HeroSection";

export class HomePage extends Component {
    createElement() {
        const heroSection = new HeroSection({
            title: 'Start Your Running Journey',
            subtitle: 'Track your progress, join events, achieve your goals'
        })

        return heroSection.createElement();
    }
}