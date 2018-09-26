<template>
	<div>	
		<li class="list-group-item" :class="className">{{ msg }}</li>
		<small class="badge float-right" :class="badgeClass">{{ user }}</small>
	</div>
</template>

<script>
	export default {
		props: ['msg', 'color', 'user'],
		computed: {
			className() {
				return 'list-group-item-' + this.color;
			},
			badgeClass() {
				return 'badge-' + this.color;
			}
		}
	}
</script>

<style>
	
</style>