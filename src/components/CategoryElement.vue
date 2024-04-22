<template>
  <li
    class="list-item"
    draggable="true"
    @dragstart="handleDragStart"
    @dragover="handleDragOver"
    @drop="handleDrop"
    @dragend="handleDragEnd"
  >
    <div class="list-item-content" @click="toggleCheck">
      <input type="checkbox" v-model="element.isChecked" />
      <span>{{ element.title }}</span>
    </div>
    <div>
      <font-awesome-icon
        icon="pencil-alt"
        class="icon"
        @click.stop="editElement"
      />
      <font-awesome-icon
        icon="trash"
        class="icon"
        @click.stop="removeElement"
      />
    </div>
  </li>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  id: Number,
  element: Object,
  categoryIndex: Number,
});

const emits = defineEmits([
  "remove-element",
  "edit-element",
  "element-dragged",
]);

const isChecked = ref(false);

const toggleCheck = () => {
  props.element.isChecked = !props.element.isChecked; // Toggle the checked state
  emits('edit-element', props.categoryIndex, props.id, props.element); // Emit the updated element
};

const editElement = () => {
  const newTitle = prompt("Enter new element title:");
  if (newTitle) {
    emits("edit-element", props.id, newTitle);
  }
};

const removeElement = () => {
  emits("remove-element", props.id);
};

const handleDragStart = (event) => {
  event.dataTransfer.setData("text/plain", props.id.toString());
  event.dataTransfer.effectAllowed = "move";
  event.currentTarget.classList.add("dragging");
};

const handleDragOver = (event) => {
  event.preventDefault(); // Necessary to allow dropping
  event.dataTransfer.dropEffect = "move";
};

const handleDrop = (event) => {
  event.preventDefault();
  const draggedId = parseInt(event.dataTransfer.getData("text/plain"));
  if (draggedId !== props.id) {
    emits("element-dragged", props.categoryIndex, draggedId, props.id);
  }
};

const handleDragEnd = (event) => {
  event.currentTarget.classList.remove("dragging");
};
</script>


<style scoped>
.icon {
  color: #059669;
  margin-left: 5px;
  cursor: pointer;
}

.icon:hover {
  color: #04ad6a; /* Change color on hover */
}

.list-item {
  display: flex;
  justify-content: space-between;
  min-width: 50%;
  width: auto;
}

.list-item-content {
  flex-grow: 1; /* Allow the list item to grow */
  overflow: hidden; /* Hide overflow text */
  white-space: nowrap; /* Prevent text from wrapping */
  text-overflow: ellipsis; /* Show ellipsis (...) for overflow text */
  display: flex;
  align-items: center;
}
.list-item-content input[type="checkbox"] {
  transform: scale(1.2);
  margin-left: 2px;
}

.list-item-content span {
  padding-left: 16px;
}

.icon {
  margin-left: 5px;
}

.list-item-content input:hover,
.list-item-content span:hover {
  cursor: pointer;
}

.list-item.dragging {
  opacity: 0.5;
}
</style>
