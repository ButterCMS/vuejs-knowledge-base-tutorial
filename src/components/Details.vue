<template>
	<h1 class="title">{{ value.fields.faqs_title }}</h1>
	<h3 class="date">Published on: {{ value.updated.slice(0, 10) }}</h3>
	<div class="card">
		<div class="wrapper">
			<p v-html="value.fields.faqs_body"></p>
		</div>
	</div>
</template>

<script>
import Butter from 'buttercms';
export default {
	data() {
		return {
			value: null,
		};
	},

	created() {
		const resp = this.$route.query.post;
		const butter = Butter('cd3a6987e220e96a1d76283f0d0d928cac2d1d4d');
		butter.page
			.retrieve('*', JSON.parse(resp))
			.then((response) => {
				this.value = response.data.data;
				console.log(this.value);
			})
			.catch((resp) => {
				console.log(resp);
			});
	},
};
</script>

<style scoped>
.card {
	background-color: black;
	border-radius: 10px;
}

.title {
	color: #000;
}

.date {
	color: rgb(30, 29, 29);
	font-size: 25px;
	/* padding-bottom: 10rem; */
}
</style>
