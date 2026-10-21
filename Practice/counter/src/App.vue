<template>
  <div class="counter">
    <h1>{{ count }}</h1>
    <div class="button">
      <button id="plus" @click="increase">+</button>
      <button id="minus" @click="decrease">-</button>
    </div>
  </div>
</template>

<script>
export default {
    data() {
      return {
        count: 0,
      } 
    },
    methods: {
      increase() {
        ++this.count;
      },
      decrease() {
        if(this.count>0)
        --this.count;
      }
    }
}
</script>