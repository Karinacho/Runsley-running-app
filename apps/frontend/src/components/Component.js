export class Component {
    constructor(props = {}) {
        this.props = props;
        this.state = {};
        this.element = null;
        this.eventListeners = [];

        this.propertyHandlers = new Map([
            ['className', (el, value) => el.className = value],
            ['class', (el, value) => el.className = value], // alias
            ['textContent', (el, value) => el.textContent = value],
            ['innerHTML', (el, value) => el.innerHTML = value],
            ['value', (el, value) => el.value = value],
            ['checked', (el, value) => el.checked = Boolean(value)],
            ['disabled', (el, value) => el.disabled = Boolean(value)],
            ['selected', (el, value) => el.selected = Boolean(value)],
            ['hidden', (el, value) => el.hidden = Boolean(value)],
            ['id', (el, value) => el.id = value],
            ['title', (el, value) => el.title = value],
            ['placeholder', (el, value) => el.placeholder = value],
            ['type', (el, value) => el.type = value],
            ['name', (el, value) => el.name = value],
            ['required', (el, value) => el.required = Boolean(value)]
        ]);
        
    }

    createElement() {
        throw new Error('createElement must be implemented by subclass');
    }

    render(container) {
        this.element = this.createElement();
        console.log(this.element)
        console.log(container)
        container.appendChild(this.element);
        this.afterRender();
    }

    afterRender() {
        // Hook for subclasses to add event listeners or other logic after rendering
    }

    createDOMElement(tag, props = {}, children = []) {
        const element = document.createElement(tag);

        this.applyProps(element, props);

        this.appendChildren(element, children);

        return element;

    }

    applyProps(element, props) {
        for (const [key, value] of Object.entries(props)) {
            if (value == null) {
                continue;
            }

            //check if there's a specific handler for this property
            const handler = this.propertyHandlers.get(key);

            if (handler) {
                // Use the handler from our Map
                handler(element, value);
            } else if (key.startsWith('on') && typeof value === 'function') {
                // Handle event listeners
                const eventName = key.slice(2).toLowerCase(); // onClick -> click
                this.addEventListener(element, eventName, value);
            } else if (key.startsWith('data-') || key.startsWith('aria-')) {
                // Data and aria attributes
                element.setAttribute(key, value);
            } else {
                // Fallback to setAttribute for other attributes
                element.setAttribute(key, value);
            }
        }
    }

    appendChildren(element, children) {
        children.forEach(child => {
            if (typeof child === ' string' || typeof child === 'number') {
                element.appendChild(document.createTextNode(child));
            } else if ( child instanceof Node) {
                element.appendChild(child);
            }
        });
    }

    addEventListener(element, event, handler) {
        const boundHandler = handler.bind(this);
        element.addEventListener(event, boundHandler);
        this.eventListeners.push({ element, event, handler: boundHandler });
    }

    destroy() {
        this.eventListeners.forEach(({ element, event, handler }) => {
            element.removeEventListener(event, handler);
        });
        this.eventListeners = [];
        
        if (this.element) {
            this.element.remove();
            this.element = null;
        }
    }

}