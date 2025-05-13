function getRarityColor(rarity){
	switch(rarity){
	case "Common": return "black";
	case "Elite": return "chocolate";
	case "Rare": return "silver";
	case "Legendary": return "gold";
	case "Mythical": return "purple";
	default: return "white";
	}
}

dragSource = null;

// inventoryGrid.js
class InventoryGrid {
    constructor(containerId, gridSize, onDropOut, onDropIn) {
        this.container = document.getElementById(containerId);
        this.gridSize = gridSize; // e.g., 5x5
        this.gridArray = [];
        this.onDropOut = onDropOut; // Callback when item is dropped out of the grid
        this.onDropIn = onDropIn;   // Callback when item is dropped into the grid

        this.initializeGrid();
        this.setupDragAndDrop();
    }

    initializeGrid() {
        this.container.style.display = "grid";
        this.container.style.gridTemplateColumns = `repeat(${this.gridSize}, 1fr)`;
        this.container.style.gridTemplateRows = `repeat(${this.gridSize}, 1fr)`;
        this.container.style.gap = "1px";
        this.container.style.border = "1px solid black"; // Add border to the grid
        this.container.style.boxSizing = "border-box";   // Ensure grid spacing is accounted for

        // Add visible lines for each grid cell
        this.container.style.backgroundImage = `linear-gradient(black 1px, transparent 1px), linear-gradient(90deg, black 1px, transparent 1px)`;
        this.container.style.backgroundSize = `calc(100% / ${this.gridSize}) calc(100% / ${this.gridSize})`;
    }

    renderGrid() {
        this.container.innerHTML = ""; // Clear existing grid

        this.gridArray.forEach((item, index) => {
            const icon = document.createElement("div");
            icon.classList.add("icon");
            icon.draggable = true;
            icon.dataset.index = index;

            // Set the icon's appearance based on the item
            if (item.icon) {
                icon.style.backgroundImage = `url("icons/materials/${item.icon}")`;
                icon.style.backgroundSize = "cover";
                icon.style.border = `3px solid ${getRarityColor(item.rarity)}`;
            }

            this.container.appendChild(icon);
        });
    }

    setupDragAndDrop() {
        let draggedIndex = null;
        let draggedElement = null;
        let dragImage = null;

        // Drag start
        this.container.addEventListener("dragstart", (e) => {
            const index = e.target.dataset.index;
            if (index !== undefined) {
                draggedIndex = index;
                draggedElement = e.target;
                const item = this.gridArray[index];
                dragSource = this;
                e.dataTransfer.setData("text/plain", index);
                e.dataTransfer.setData("application/json", JSON.stringify(item));

                // Set a custom drag image (the item icon)
                dragImage = document.createElement("div");
                dragImage.style.width = "50px";
                dragImage.style.height = "50px";
                dragImage.style.backgroundImage = `url("icons/materials/${item.icon}")`;
                dragImage.style.backgroundSize = "cover";
                dragImage.style.border = `3px solid ${getRarityColor(item.rarity)}`;
                dragImage.style.position = "absolute";
                dragImage.style.top = "-9999px"; // Hide it from the document flow
                document.body.appendChild(dragImage);

                e.dataTransfer.setDragImage(dragImage, 25, 25);

                // Make the dragged element invisible
                draggedElement.style.opacity = "0";
            }
        });

        // Drag end
        this.container.addEventListener("dragend", (e) => {
            if (draggedElement) {
                // Restore visibility if the drag was canceled
                draggedElement.style.opacity = "1";
                draggedElement = null;
            }
            if (dragImage) {
            	document.body.removeChild(dragImage);
            }
            dragSource = null;
        });

        // Drag over
        this.container.addEventListener("dragover", (e) => {
            e.preventDefault();
        });

        // Drop
        this.container.addEventListener("drop", (e) => {
            e.preventDefault();
            const index = e.dataTransfer.getData("text/plain");
            const draggedItem = JSON.parse(e.dataTransfer.getData("application/json"));
            
            dragSource.gridArray = dragSource.gridArray.filter(item => item.id !== draggedItem.id);
            dragSource.renderGrid();

            // Cancel drag if dropped back on the inventory or outside valid containers
            if (index !== undefined && draggedElement) {
                draggedElement.style.opacity = "1";
                draggedElement = null;
            }

            if (draggedItem && this.onDropIn) {
                this.gridArray.push(draggedItem);
                this.onDropIn(draggedItem);
                this.renderGrid();
            }
        });
    }
}