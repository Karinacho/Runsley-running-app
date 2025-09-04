//custom DOM based router
class Router {
    constructor(routes = []) {
        this.routes = new Map();
        this.currentRoute = null;
        this.appContainer = document.querySelector('#app');
        this.currentComponent = null;

        routes.forEach( route => {
            this.routes.set(route.path, route.component);
        })
    }

    navigate(path) {
        const ComponentClass = this.routes.get(path);

        if (!ComponentClass) {
            console.warn('No component found for path:', path);
            return;
        }
      
        this.currentRoute = path;
        window.history.pushState({}, '', path);
        this.render(ComponentClass);
        
    }

    // Handle route changes (back/forward buttons)
    handleRoute() {
        const path = window.location.pathname;
        const ComponentClass = this.routes.get(path);
        
        if (!ComponentClass) {
            console.error(`No component found for path: ${path}`);
            return;
        }

        this.currentRoute = path;
        this.render(ComponentClass);

    }

    render(ComponentClass) {
        if (!this.appContainer) {
            console.error('App container not found');
            return;
        }
        
        //Clean up previous component
        if (this.currentComponent) {
            this.currentComponent.destroy();
        }

        //Clear container
        this.appContainer.replaceChildren();

        //Create and render new component
        this.currentComponent = new ComponentClass();
        this.currentComponent.render(this.appContainer);
    }

    init() {
        console.log('Initializing router...');

        this.handleRoute();

        //Listen for browser back/forward
        window.addEventListener('popstate', () => this.handleRoute());

        //Listen for navigation clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[data-route')) {
                e.preventDefault();
                const href = e.target.getAttribute('href');
                this.navigate(href);
            }
        })

    }
}

export default Router;