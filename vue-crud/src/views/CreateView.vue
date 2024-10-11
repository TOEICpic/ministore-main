<template>
  <div class="q-gutter-md" style="max-width: 400px">
      <q-form 
          @submit="onSubmit"
          class="q-gutter-md"
      >
          <q-input v-model="first_name" label="First Name" />
          <q-input v-model="last_name" label="Last Name" />
          <q-input v-model="email" label="Email" />
          <q-input v-model="address" label="Address" />
          <q-input v-model="phone_number" label="Phone" />
          <q-btn type="submit" label="Submit" color="primary" />
      </q-form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const first_name = ref('')
const last_name = ref('')
const email = ref('')
const address = ref('')
const phone_number = ref('')

const route = useRoute() // Get route object to extract params
const router = useRouter()

const isEdit = ref(false) // Determine if it's an edit mode
const customerId = ref(null) // Store customer ID for editing

// Fetch customer data if in edit mode
const fetchCustomerData = async (id) => {
  try {
      const response = await fetch(`http://localhost:8800/api/v1/customers/${id}`)
      const customer = await response.json()

      if (customer) {
          first_name.value = customer.first_name
          last_name.value = customer.last_name
          email.value = customer.email
          address.value = customer.address
          phone_number.value = customer.phone_number
          customerId.value = customer.customer_id
          isEdit.value = true // Mark as edit mode
      }
  } catch (error) {
      console.error('Error fetching customer data:', error)
  }
}

// Check if this page is used for editing
onMounted(() => {
  if (route.params.id) {
      fetchCustomerData(route.params.id) // Load customer data for editing
  }
})

const onSubmit = (event) => {
  event.preventDefault() // Prevent default form submission

  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const raw = JSON.stringify({
      first_name: first_name.value,
      last_name: last_name.value,
      email: email.value,
      address: address.value,
      phone_number: phone_number.value
  })

  const requestOptions = {
      method: isEdit.value ? 'PUT' : 'POST', // Use PUT for editing, POST for creating
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
  }

  const url = isEdit.value 
      ? `http://localhost:8800/api/v1/customers/${customerId.value}` // PUT request
      : 'http://localhost:8800/api/v1/customers' // POST request

  fetch(url, requestOptions)
      .then(response => response.json())
      .then(result => {
          alert(result.message)
          if (result.status === 'ok') {
              router.push('/') // Redirect to homepage after success
          }
      })
      .catch(error => console.error('Error submitting customer:', error))
}
</script>
