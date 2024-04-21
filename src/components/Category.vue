<template>
  <div
    class="category-container"
    draggable
    @dragstart="handleDragStart"
    @dragover.prevent
    @drop="handleDrop"
  >
    <div class="category-title-container" @click="toggleDropdown">
      <h2>{{ title }}</h2>
      <span>{{ listElementsCount }}</span>
      <button>{{ isOpen ? "↓" : "↑" }}</button>
    </div>
    <div>
      <button @click="editCategory">
        <font-awesome-icon icon="pencil-alt" />
      </button>
      <button @click="removeCategory">
        <font-awesome-icon icon="trash" />
      </button>
    </div>
    <div v-if="isOpen" class="category-content-container">
      <ul>
        <CategoryElement
          v-for="(element, idx) in listElements"
          :key="idx"
          :id="idx"
          :element="element"
          @remove-element="removeElement"
          @edit-element="editElement"
        />
      </ul>
      <button @click="addElement">
        <font-awesome-icon icon="plus" />
        Add Element
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import CategoryElement from "./CategoryElement.vue";

const props = defineProps({
  index: Number,
  title: String,
  listElements: Array,
  listElementsCount: Number,
});

const emits = defineEmits([
  "edit-category",
  "remove-category",
  "add-element",
  "remove-element",
  "edit-element",
  "handle-sort",
]);

const isOpen = ref(true);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
  console.log("Dropdown state:", isOpen.value); // Check if toggling works
};

const editCategory = () => {
  const newTitle = prompt("Enter new category title:");
  if (newTitle) {
    emits("edit-category", props.index, newTitle);
  }
};

const removeCategory = () => {
  emits("remove-category", props.index);
};

const addElement = () => {
  const elementTitle = prompt("Enter new element title:");
  if (elementTitle) {
    emits("add-element", props.index, elementTitle);
  }
};

const removeElement = (id) => {
  emits("remove-element", props.index, id);
};

const editElement = (id, newTitle) => {
  emits("edit-element", props.index, id, newTitle);
};

const handleDragStart = (event) => {
  event.dataTransfer.setData("text/plain", props.index);
};

const handleDrop = (event) => {
  const draggedIndex = parseInt(event.dataTransfer.getData("text/plain"));
  emits("handle-sort", draggedIndex, props.index);
};
</script>

<style scoped>
* {
  font-family: Poppins;
  font-weight: 500;
}
.icon {
  color: #059669;
  margin-left: 5px;
  cursor: pointer;
}

.icon:hover {
  color: #04ad6a; /* Change color on hover */
}

.category-container {
  width: 476px;
  border: 1px solid #a3a3a3;
  border-radius: 16px;
  margin-bottom: 20px;
}

.category-title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 24px;
  padding: 16px;
}
.category-title-container h2 {
  font-weight: 600;
}
.category-title-container span {
  padding-right: 20px;
  color: #4f4f4f;
  font-size: 1.3em;
}

.category-content-container {
  height: 0;
  overflow: hidden;
  transition: height 5s ease;
}
.category-content-container ul {
  list-style: none;
  width: 50%;
  margin: 16px 16px 0 16px;
}

.category-content-container.open {
  height: auto;
  border-top: 1px solid #a3a3a3;
}

.category-content-container button {
  padding: 9px 12px;
  margin: 28px 0px 10px 16px;
  gap: 0px;
  border-radius: 999px;
  border: 1px solid #059669;
  opacity: 0px;
  background-color: #fff;
  color: #000;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.category-content-container button:hover {
  background-color: #cfcfcf;
}
.category-title-container .category-title {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.category-title h2 {
  padding-right: 5px;
}
</style>
