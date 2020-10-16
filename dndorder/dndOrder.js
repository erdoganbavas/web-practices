class DnDOrder {
    constructor(wrapperSelector, data) {
        // an array of ordered elements/items
        this.data = data;

        // an object where items associated with their ID's
        this.items = {};

        // wrapper element
        this.wrapper = document.querySelector(wrapperSelector);


        if(this.wrapper !== null && Array.isArray(data)) {
            this.init();
        } else {
            alert("Something missing!")
        }
    }

    init() {
        // create items
        this.data.forEach((value, i) => {
            const item = new DnDOrderItem(value, i);

            // i is unique in between items, so use it as an identifier
            item.setID('item' + i);

            item.onDropFinish = itemDragId => {
                this.switchItems(itemDragId, item.id);
            }

            this.items[ item.id ] = item;

            // add to dom
            this.wrapper.append(item.generateDOMElement());
        });
    }

    switchItems(itemDragId, itemTargetId) {
        // get one item's order
        // this is also order of child DOM element
        const itemDragPrevOrder = this.items[itemDragId].order;

        // change order in instances
        this.items[itemDragId].order = this.items[itemTargetId].order;
        this.items[itemTargetId].order = itemDragPrevOrder;

        // change DOM elements' positions
        const itemDragNextSibling = this.items[itemDragId].element.nextSibling;

        // check if items are sequential
        if(itemDragNextSibling === this.items[itemTargetId].element) {
            // just put dragged element before the target element's next sibling
            this.wrapper.insertBefore(this.items[itemDragId].element, this.items[itemTargetId].element.nextSibling);
        } else {
            this.wrapper.insertBefore(this.items[itemDragId].element, this.items[itemTargetId].element);
            this.wrapper.insertBefore(this.items[itemTargetId].element, itemDragNextSibling);
        }

        // switching done
        // here this.items may send to a server via http request
        // instead we will just print it to the console
        for (const itemId in this.items) {
            if (this.items.hasOwnProperty(itemId)) {
                const element = this.items[itemId];
                console.log(element.order, element.data);
            }
        }
    }
}

class DnDOrderItem {
    constructor(value, i) {
        this.order = i;
        this.data = value;

        this.element = null;
        this.id = null;

        // this is kind of an event handler
        this.onDropFinish = null;
    }

    setID(newID) {
        this.id = newID;
    }

    generateDOMElement() {
        if(this.element === null) {
            const element = document.createElement("li");
            // this is where if you want to add something more to list item content 
            element.innerHTML = this.data;
            element.setAttribute('draggable', true);
            element.classList.add('dndOrderItem');

            this.element = element;

            this.bindEvents();
        }

        return this.element;
    }

    bindEvents() {
        this.element.addEventListener('dragstart', e => {
            // we use arrow function to preserve this keyword
            // refers to Class itself not to element event occured
            this.onDragStart(e);
        }, true);

        this.element.addEventListener('dragover', this.onDragOver, true);

        this.element.addEventListener('drop', e => {
            if(e.stopPropagation) {
                e.stopPropagation();
            }

            this.onDrop(e);
        });
    }

    onDragStart(e) {
        // keep element's ID on event data
        e.dataTransfer.setData('id', this.id);
    }

    onDragOver(e) {
        if(e.preventDefault) {
            e.preventDefault();
        }

    }

    onDrop(e) {
        if(this.onDropFinish !== null) {
            // notify DnDOrder class
            this.onDropFinish(e.dataTransfer.getData('id'));
        }
    }
}

const order = new DnDOrder('#order', ['A', 'B', 'C', 'D', 'E'])