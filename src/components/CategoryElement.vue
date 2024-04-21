<template>
  <li class="list-item">
    <div class="list-item-content" @click="toggleCheck">
      <input type="checkbox" v-model="isChecked" />
      <span>{{ element }}</span>
    </div>
    <div>
      <button @click="editElement">
        <font-awesome-icon icon="pencil-alt" />
      </button>
      <button @click="removeElement">
        <font-awesome-icon icon="trash" />
      </button>
    </div>
  </li>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  id: Number,
  element: String,
});

const emits = defineEmits(["remove-element", "edit-element"]);

const isChecked = ref(false);

const toggleCheck = () => {
  isChecked.value = !isChecked.value;
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
</style>
