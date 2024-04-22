<template>
  <div class="category-container">
    <div class="category-title-container" @click="toggleDropdown">
      <div class="category-title">
        <h2>{{ title }}</h2>
        <span>{{ listElementsCount }}</span>
        <font-awesome-icon
          :icon="isOpen ? 'chevron-up' : 'chevron-down'"
          class="icon"
        />
      </div>
      <div>
        <font-awesome-icon
          icon="pencil-alt"
          class="icon"
          @click.stop="editCategory"
        />

        <font-awesome-icon
          icon="trash"
          class="icon"
          @click.stop="removeCategory"
        />
      </div>
    </div>

    <div :class="{ 'category-content-container': true, open: isOpen }">
      <ul>
        <CategoryElement
          v-for="(element, idx) in listElements"
          :key="idx"
          :id="idx"
          :element="element"
          :categoryIndex="index"
          @remove-element="removeElement"
          @edit-element="editElement"
          @element-dragged="handleElementDragged"
        />
      </ul>
      <button @click="addElement">
        <font-awesome-icon icon="plus" />
        Adaugă item
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
  "update:listElements", // Declare this event here
]);

const isOpen = ref(true);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
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
    const newElement = { title: elementTitle, isChecked: false };
    emits('add-element', props.index, newElement);
  }
};

const removeElement = (id) => {
  emits("remove-element", props.index, id);
};

const editElement = (id, updatedElement) => {
  emits('edit-element', props.index, id, updatedElement);
};

const handleElementDragged = (categoryIndex, startId, endId) => {
  const list = [...props.listElements];
  const item = list.splice(startId, 1)[0];
  list.splice(endId, 0, item);
  emits("update:listElements", list);
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
  color: #04ad6a;
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
