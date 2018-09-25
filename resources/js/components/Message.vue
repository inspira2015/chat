<template>
	<li class="list-group-item" :class="className">{{ msg }}</li>
</template>

<script>
	export default {
		props: ['msg', 'color'],
		computed: {
			className() {
				return 'list-group-item-' + this.color;
			}
		}
	}
</script>

<style>
	
</style>