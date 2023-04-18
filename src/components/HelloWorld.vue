<script>
import Butter from 'buttercms';

export default {
	data() {
		return {
			search: '',
			body: [],
		};
	},
	methods: {
		shareData(post) {
			this.$router.push({
				name: 'Details',
				query: { post: JSON.stringify(post) },
			});
		},
	},
	mounted() {
		const butter = Butter('cd3a6987e220e96a1d76283f0d0d928cac2d1d4d');
		butter.page
			.list('vue_knowledge_base')
			.then((response) => {
				this.body = response.data.data;
				console.log(this.body);
			})
			.catch((resp) => {
				console.log(resp);
			});
	},
	computed: {
		filteredList() {
			return this.body.filter((post) => {
				return post.fields.faqs_title
					.toLowerCase()
					.includes(this.search.toLowerCase());
			});
		},
	},
};
</script>

<template>
	<div id="app">
		<h1 class="title">Developer FAQs</h1>

		<div class="search-wrapper">
			<input type="text" v-model="search" placeholder="Search here.." />
			<label>Search Question</label>
		</div>

		<h3 class="red" v-if="filteredList.length < 1">
			No Articles found for this search!!!!!
		</h3>

		<div class="card" v-for="post in filteredList">
			<div class="wrapper" @click="shareData(post.slug)">
				<div class="timeDiv">
					<span class="green">{{ post.updated.slice(0, 10) }}</span>
				</div>
				<h2>{{ post.fields.faqs_title }}</h2>
				<h4 class="desc">{{ post.fields.faqs_description }}</h4>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
html,
body {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	margin-top: 16px;
	margin-bottom: 16px;
	overflow-x: hidden;
}

.desc {
	color: rgb(182, 182, 182);
}

.red {
	color: rgb(145, 29, 29);
	font-size: 2em;
}

div#app {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	.search-wrapper {
		position: relative;

		label {
			position: absolute;
			font-size: 18px;
			color: rgba(0, 0, 0, 0.5);
			top: 8px;
			left: 2px;
			z-index: -1;
			transition: 0.15s all ease-in-out;
		}

		input {
			padding: 20px 12px;
			margin-bottom: 30px;
			width: 600px;
			color: rgba(0, 0, 0, 0.7);
			border: 1px solid rgba(0, 0, 0, 0.12);
			border-radius: 20px;
			transition: 0.15s all ease-in-out;
			background: white;
			font-size: 18px;

			&:focus {
				outline: none;
				transform: scale(1.5);

				& + label {
					font-size: 18px;
					font-weight: bold;
					transform: translateY(-55px) translateX(-122px);
				}
			}

			&::-webkit-input-placeholder {
				font-size: 18px;
				color: rgba(0, 0, 0, 0.5);
				font-weight: 100;
			}
		}
	}

	.title {
		color: black;
		padding-bottom: 10px;
		font-size: 4rem;
	}

	.wrapper {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		padding-top: 12px;
		text-align: start;
	}

	.card {
		background-color: black;
		border-radius: 10px;
		padding: 60px;
		box-shadow: rgba(0, 0, 0, 0.117647) 0px 4px 10px,
			rgba(0, 0, 0, 0.117647) 0px 1px 4px;
		width: 800px;
		margin: 20px;
		transition: 0.15s all ease-in-out;
    cursor: pointer;

		&:hover {
			transform: scale(1.1);
		}

		a {
			text-decoration: none;
			padding: 12px;
			color: #03a9f4;
			font-size: 24px;
			display: flex;
			flex-direction: column;
			align-items: center;

			img {
				height: 100px;
			}

			small {
				font-size: 10px;
				padding: 4px;
			}
		}
	}

	.timeDiv {
		display: flex;

		align-self: end;
	}

	.hotpink {
		background: hotpink;
	}

	.green {
		padding: 0 7px;
		text-align: center;
		border-radius: 10px;
		background: green;
		font-weight: bold;
	}

	.box {
		width: 100px;
		height: 100px;
		border: 1px solid rgba(0, 0, 0, 0.12);
	}
}
</style>
