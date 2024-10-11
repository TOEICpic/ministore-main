<template>
    <div class="q-pa-md">
      <div>
        <q-btn icon="add" @click="onCreate()" />
      </div>
      <q-table
        title="Treats"
        :rows="rows"
        :columns="columns"
        row-key="product_id"
      >
        <template v-slot:body-cell-image_url="props">
            <q-td :props="props">
            <img 
                :src="props.row.image_url" 
                alt="Product Image" 
                style="max-width: 100px; height: auto;" 
            />
            </q-td>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn 
              flat
              dense
              round
              icon="edit" 
              @click="onEdit(props.row.product_id)" 
            />
            <q-btn 
              flat
              dense
              round
              icon="delete" 
              @click="onDelete(props.row.product_id)" 
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
    { name: 'product_id', label: 'product_id', align: 'center', field: 'product_id', sortable: true },
    { name: 'name', label: 'name', align: 'center', field: 'name', sortable: true },
    { name: 'description', label: 'description', align: 'center', field: 'description', sortable: true },
    { name: 'price', label: 'price', align: 'center', field: 'price', sortable: true },
    { name: 'category', label: 'category', align: 'center', field: 'category', sortable: true },
    { name: 'image_url', label: 'image_url', align: 'center', field: 'image_url', sortable: true },
    { name: 'actions', label: 'Actions', align: 'center', field: 'actions', sortable: false }
  ])
  
  const rows = ref([])
  
  // Fetch data from the server
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8800/api/v1/products')
      const result = await response.json()
      rows.value = result
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  
  fetchData()
  
  // Navigate to create page
  const onCreate = () => {
    router.push('/createProduct')
  }
  
  // Navigate to edit page
  const onEdit = (id) => {
    router.push(`/ProductEdit/${id}`)
  }
  
  // Delete handler
  const onDelete = async (id) => {
    const confirmed = confirm('Are you sure you want to delete this product?')
  
    if (confirmed) {
      try {
        const response = await fetch(`http://localhost:8800/api/v1/products/${id}`, {
          method: 'DELETE',
        })
        if (response.ok) {
          rows.value = rows.value.filter(row => row.product_id !== id) // Remove deleted row from table
        } else {
          alert('Failed to delete product')
        }
      } catch (error) {
        console.error('Error deleting product:', error)
        alert('Error deleting product')
      }
    }
  }
  
  </script>
  