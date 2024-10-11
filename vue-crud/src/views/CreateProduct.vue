<template>
    <div class="q-gutter-md" style="max-width: 400px">
        <q-form 
            @submit="onSubmit"
            class="q-gutter-md"
        >
            <q-input v-model="product_id" label="ID" :disabled="isEdit" />
            <q-input v-model="name" label="Name" />
            <q-input v-model="description" label="Description" />
            <q-input v-model="price" label="Price" />
            <q-input v-model="category" label="Category" />
            <q-input v-model="image_url" label="Image URL" />
            <q-btn type="submit" label="Submit" color="primary" />
        </q-form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const product_id = ref('')
const name = ref('')
const description = ref('')
const price = ref('')
const category = ref('')
const image_url = ref('')

const route = useRoute()
const router = useRouter()

const isEdit = ref(false)

// Fetch product data if in edit mode
const fetchProductData = async (id) => {
    try {
        const response = await fetch(`http://localhost:8800/api/v1/products/${id}`)
        const product = await response.json()

        if (product) {
            product_id.value = product.product_id
            name.value = product.name
            description.value = product.description
            price.value = product.price
            category.value = product.category
            image_url.value = product.image_url
            isEdit.value = true // Mark as edit mode
        }
    } catch (error) {
        console.error('Error fetching product data:', error)
    }
}

// Check if this page is used for editing
onMounted(() => {
    if (route.params.id) {
        fetchProductData(route.params.id) // Load product data for editing
    }
})

const onSubmit = async (event) => {
    event.preventDefault() // Prevent default form submission

    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    const raw = JSON.stringify({
        product_id: parseInt(product_id.value),
        name: name.value,
        description: description.value,
        price: price.value,
        category: category.value,
        image_url: image_url.value
    })

    const requestOptions = {
        method: isEdit.value ? 'PUT' : 'POST', // Use PUT for editing, POST for creating
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    }

    const url = isEdit.value 
        ? `http://localhost:8800/api/v1/products/${product_id.value}` // Use product_id.value for PUT request
        : 'http://localhost:8800/api/v1/products' // POST request

    try {
        const response = await fetch(url, requestOptions);
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.message || 'Something went wrong'); // แสดงข้อผิดพลาดที่ชัดเจน
        }
    
        alert(result.message);
        router.push('/product'); // Redirect to homepage after success
    } catch (error) {
        console.error('Error submitting product:', error);
        alert(`Error: ${error.message}`); // แสดงข้อผิดพลาดที่ชัดเจน
    }

}
</script>
