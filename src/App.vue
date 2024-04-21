<template>
  <div class="App">
    <h1 style="padding: 20px 0">To do</h1>
    <Category
      v-for="(category, index) in categories"
      :key="index"
      :index="index"
      :title="category.title"
      :listElements="category.listElements"
      :listElementsCount="category.listElementsCount"
      @edit-category="editCategory"
      @remove-category="removeCategory"
      @add-element="addElement"
      @remove-element="removeElement"
      @edit-element="editElement"
      @handle-sort="handleSort"
    />
    <button @click="addCategory" class="button">
      <font-awesome-icon icon="plus" />
      &nbsp; Adaugă categorie
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Category from "./components/Category.vue";

const categories = ref([]);

onMounted(() => {
  const savedCategories = localStorage.getItem("categories");
  categories.value = savedCategories ? JSON.parse(savedCategories) : [];
});

const updateCategories = (newCategories) => {
  categories.value = newCategories;
  localStorage.setItem("categories", JSON.stringify(newCategories));
};

const addCategory = () => {
  const title = prompt("Introduceti titlul categoriei:");
  if (title) {
    const newCategory = { title, listElements: [], listElementsCount: 0 };
    updateCategories([...categories.value, newCategory]);
  }
};

const editCategory = (index, newTitle) => {
  const newCategories = [...categories.value];
  newCategories[index] = { ...newCategories[index], title: newTitle };
  updateCategories(newCategories);
};

const removeCategory = (index) => {
  const newCategories = [...categories.value];
  newCategories.splice(index, 1);
  updateCategories(newCategories);
};

const addElement = (categoryIndex, element) => {
  const newCategories = [...categories.value];
  const category = newCategories[categoryIndex];
  category.listElements.push(element);
  category.listElementsCount++;
  updateCategories(newCategories);
};

const removeElement = (categoryIndex, listElementIndex) => {
  const newCategories = [...categories.value];
  newCategories[categoryIndex].listElements.splice(listElementIndex, 1);
  newCategories[categoryIndex].listElementsCount--;
  updateCategories(newCategories);
};

const editElement = (categoryIndex, listElementIndex, newTitle) => {
  const newCategories = [...categories.value];
  newCategories[categoryIndex].listElements[listElementIndex] = newTitle;
  updateCategories(newCategories);
};

const handleSort = (draggedIndex, dropIndex) => {
  const newCategories = [...categories.value];
  const draggedCategory = newCategories.splice(draggedIndex, 1)[0];
  newCategories.splice(dropIndex, 0, draggedCategory);
  updateCategories(newCategories);
};
</script>
<style scoped>
.button {
  padding: 16px 10px;
  margin: 30px 0;
  gap: 0px;
  border-radius: 999px;
  border: 0;
  opacity: 0px;
  background-color: #059669;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
}

.button:hover {
  background-color: #04ad6a;
}
</style>