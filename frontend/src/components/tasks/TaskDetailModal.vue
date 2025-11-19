<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click.self="$emit('close')">
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="flex justify-between items-center p-6 border-b border-gray-200">
        <div v-if="!isEditing">
          <h2 class="text-xl font-semibold text-gray-900">{{ task.title }}</h2>
        </div>
        <input v-else v-model="editedTask.title" class="text-xl font-semibold text-gray-900 bg-gray-50 border border-gray-300 rounded px-3 py-1 w-full" placeholder="Task title" />
        <button class="text-gray-400 hover:text-gray-600 text-2xl transition-colors w-8 h-8 flex items-center justify-center" @click="$emit('close')">×</button>
      </div>

      <!-- Body -->
      <div class="p-6">
        <div class="space-y-6 mb-6">
          <!-- Description -->
          <div>
            <label class="block text-xs font-semibold text-gray-500 uppercase mb-2">Description</label>
            <p v-if="!isEditing" class="text-gray-900">{{ task.description || "No description" }}</p>
            <textarea v-else v-model="editedTask.description" rows="3" class="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-gray-900" placeholder="Task description" />
          </div>

          <!-- Priority & Status -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-gray-500 uppercase mb-2">Priority</label>
              <span v-if="!isEditing" class="inline-block px-3 py-1 rounded-md text-sm font-semibold" :class="getPriorityClass(task.priority)">
                {{ task.priority }}
              </span>
              <select v-else v-model="editedTask.priority" class="w-full bg-gray-50 border border-gray-300 rounded px-3 py-1 text-sm font-semibold">
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 uppercase mb-2">Status</label>
              <span v-if="!isEditing" class="inline-block px-3 py-1 rounded-md text-sm font-semibold" :class="getStatusClass(task.status)">
                {{ formatStatus(task.status) }}
              </span>
              <select v-else v-model="editedTask.status" class="w-full bg-gray-50 border border-gray-300 rounded px-3 py-1 text-sm font-semibold">
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
          </div>

          <!-- Dates -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-gray-500 uppercase mb-2">Start Date</label>
              <p v-if="!isEditing" class="text-gray-900">{{ formatDate(task.startDatetime) }}</p>
              <input v-else v-model="editedTask.startDate" type="date" class="w-full bg-gray-50 border border-gray-300 rounded px-3 py-1 text-gray-900" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 uppercase mb-2">End Date</label>
              <p v-if="!isEditing" class="text-gray-900">{{ formatDate(task.endDatetime) }}</p>
              <input v-else v-model="editedTask.endDate" type="date" class="w-full bg-gray-50 border border-gray-300 rounded px-3 py-1 text-gray-900" />
            </div>
          </div>
        </div>

        <!-- Subtasks -->
        <SubtaskList :subtasks="task.subtasks" @add-subtask="handleAddSubtask" />
      </div>

      <!-- Footer -->
      <div class="flex gap-3 p-6 border-t border-gray-200">
        <template v-if="!isEditing">
          <button class="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition-colors" @click="enableEditMode">Edit</button>
          <button class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold transition-colors" @click="$emit('close')">Close</button>
        </template>
        <template v-else>
          <button class="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg font-semibold transition-colors" @click="saveChanges">Save</button>
          <button class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold transition-colors" @click="cancelEdit">Cancel</button>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import SubtaskList from "../subtasks/SubtaskList.vue";

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["close", "save", "add-subtask", "toggle-subtask", "delete-subtask"]);

const isEditing = ref(false);
const editedTask = reactive({});

const enableEditMode = () => {
  Object.assign(editedTask, {
    id: props.task.id,
    title: props.task.title,
    description: props.task.description,
    priority: props.task.priority,
    status: props.task.status,
    startDate: props.task.startDatetime ? props.task.startDatetime.slice(0, 16) : "",
    endDate: props.task.endDatetime ? props.task.endDatetime.slice(0, 16) : "",
  });

  isEditing.value = true;
};

const cancelEdit = () => {
  isEditing.value = false;
  Object.keys(editedTask).forEach((key) => delete editedTask[key]);
};

const saveChanges = () => {
  emit("save", { ...editedTask });
  isEditing.value = false;
};

const formatStatus = (status) => {
  const statuses = {
    TODO: "To Do",
    IN_PROGRESS: "In Progress",
    COMPLETED: "Completed",
  };
  return statuses[status] || status;
};

const formatDate = (date) => {
  if (!date) return "Not set";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getPriorityClass = (priority) => {
  return {
    "bg-red-100 text-red-800": priority === "HIGH",
    "bg-yellow-100 text-yellow-800": priority === "MEDIUM",
    "bg-green-100 text-green-800": priority === "LOW",
  };
};

const getStatusClass = (status) => {
  return {
    "bg-blue-100 text-blue-800": status === "TODO",
    "bg-yellow-100 text-yellow-800": status === "IN_PROGRESS",
    "bg-green-100 text-green-800": status === "COMPLETED",
  };
};

const handleAddSubtask = async (title) => {
  try {
    emit("add-subtask", {
      taskId: props.task.id,
      title: title,
    });
  } catch (error) {
    console.error("Failed to add subtask:", error);
  }
};
</script>
