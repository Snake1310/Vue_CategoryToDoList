<template>
  <div class="App">
    <h1 style="padding: 20px 0">To do</h1>
    <Category
      v-for="(category, index) in categories"
      :key="index"
      :index="index"
      :title="category.title"
      :listElements="category.listElements"
      :listElementsCount="category.listElements.length"
      @edit-category="editCategory"
      @remove-category="removeCategory"
      @add-element="addElement"
      @remove-element="removeElement"
      @edit-element="editElement"
      @update:listElements="updateListElements(index, $event)"
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
  categories.value = JSON.parse(localStorage.getItem("categories") || "[]");
});

const updateCategories = () => {
  localStorage.setItem("categories", JSON.stringify(categories.value));
};

const addCategory = () => {
  const title = prompt("Introduceti titlul categoriei:");
  if (title) {
    const newCategory = { title, listElements: [] };
    categories.value.push(newCategory);
    updateCategories();
  }
};

const editCategory = (index, newTitle) => {
  categories.value[index].title = newTitle;
  updateCategories();
};

const removeCategory = (index) => {
  categories.value.splice(index, 1);
  updateCategories();
};

const addElement = (categoryIndex, element) => {
  categories.value[categoryIndex].listElements.push({
    ...element,
    isChecked: false,
  });
  updateCategories();
};

const removeElement = (categoryIndex, elementIndex) => {
  categories.value[categoryIndex].listElements.splice(elementIndex, 1);
  updateCategories();
};

const editElement = (categoryIndex, elementIndex, newElement) => {
  categories.value[categoryIndex].listElements[elementIndex] = newElement;
  updateCategories();
};

const updateListElements = (categoryIndex, newList) => {
  categories.value[categoryIndex].listElements = newList;
  updateCategories();
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