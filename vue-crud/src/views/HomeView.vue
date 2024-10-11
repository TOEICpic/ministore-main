<template>
  <div class="q-pa-md">
    <div>
      <q-btn icon="add" @click="onCreate()" />
    </div>
    <q-table
      title="Treats"
      :rows="rows"
      :columns="columns"
      row-key="customer_id"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn 
            flat
            dense
            round
            icon="edit" 
            @click="onEdit(props.row.customer_id)" 
          />
          <q-btn 
            flat
            dense
            round
            icon="delete" 
            @click="onDelete(props.row.customer_id)" 
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import router from '../router'

const columns = ref([
  { name: 'customer_id', label: 'customer_id', align: 'center', field: 'customer_id', sortable: true },
  { name: 'first_name', label: 'first_name', align: 'center', field: 'first_name', sortable: true },
  { name: 'last_name', label: 'last_name', align: 'center', field: 'last_name', sortable: true },
  { name: 'email', label: 'email', align: 'center', field: 'email', sortable: true },
  { name: 'address', label: 'address', align: 'center', field: 'address', sortable: true },
  { name: 'phone_number', label: 'phone_number', align: 'center', field: 'phone_number', sortable: true },
  { name: 'actions', label: 'Actions', align: 'center', field: 'actions', sortable: false }
])

const rows = ref([])

// Fetch data from the server
const fetchData = async () => {
  try {
    const response = await fetch('http://localhost:8800/api/v1/customers')
    const result = await response.json()
    rows.value = result
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

fetchData()

// Navigate to create page
const onCreate = () => {
  router.push('/create')
}

// Navigate to edit page
const onEdit = (id) => {
  router.push(`/edit/${id}`)
}

// Delete handler
const onDelete = async (id) => {
  const confirmed = confirm('Are you sure you want to delete this customer?')

  if (confirmed) {
    try {
      const response = await fetch(`http://localhost:8800/api/v1/customers/${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        rows.value = rows.value.filter(row => row.customer_id !== id) // Remove deleted row from table
      } else {
        alert('Failed to delete customer')
      }
    } catch (error) {
      console.error('Error deleting customer:', error)
      alert('Error deleting customer')
    }
  }
}

</script>
