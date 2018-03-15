<template>
	<div>
		<h1>demo4 -- 侦听器 + deferred + debounce</h1>
		<p class="item">
			<span class="title">The question is </span>
			<label><input type="text" v-model="question" :disabled="inputDisabled"></label>
		</p>
		<p class="item">
			<span class="title">The answer is </span>
			<span>{{answer}}</span>
		</p>
		<p class="item item-image" v-if="imageSrc">
			<img :src="imageSrc">
		</p>
	</div>
</template>

<script>
	import _ from 'lodash';
	import $ from 'jquery';

	const DEFAULT_ANSWER = {
		NO_INPUT: 'I cannot give you an answer until you ask a question!',
		TYPING: 'Waiting for you to stop typing...',
		NO_QUESTION_MARK: 'Questions usually end up with a question mark. ;-)',
		NET_WAITING: 'Thinking ... ',
		NET_ERROR: 'Sorry, it seems that some problems happened...'
	};
	const URL = 'https://yesno.wtf/api';

	let reg = /(\?$)|(？$)/;

	export default {
		data(){
			return {
				question: '',
				answer: DEFAULT_ANSWER.NO_INPUT,
				inputDisabled: false,
				imageSrc: ''
			}
		},
		watch: {
			question: function () {
				this.answer = DEFAULT_ANSWER.TYPING;
				this.getAnswer()
			}
		},
		methods: {
			getAnswer: _.debounce(function () {
				if (!reg.test(this.question)) {
					this.answer = DEFAULT_ANSWER.NO_QUESTION_MARK;
					return;
				}

				// 利用了jQuery的ajax和deferred对象
				this.netHandler().always(() => {
					this.inputDisabled = false;
				}).then((res) => {
					this.answer = res.answer;
					this.imageSrc = res.image
				}).catch(() => {
					this.answer = DEFAULT_ANSWER.NET_ERROR;
					this.imageSrc = ''
				});

				// 利用fetch和promise对象
//				this.netHandler2().then((res) => {
//				this.inputDisabled = false;
//					this.answer = res.answer;
//					this.imageSrc = res.image
//				}).catch(() => {
//				this.inputDisabled = false;
//					this.answer = DEFAULT_ANSWER.NET_ERROR;
//					this.imageSrc = ''
//				});
			}, 1000),

			// 利用了jQuery的ajax和deferred对象
			netHandler: function () {
				this.inputDisabled = true;
				this.answer = DEFAULT_ANSWER.NET_WAITING;
				let d = $.Deferred();
				$.ajax({
					type: 'GET',
					url: URL,
					timeout: 2000
				}).then(function (data) {
					d.resolve(data);
				}, function (error) {
					d.reject(error)
				});
				return d.promise()
			},

			// 利用fetch和promise对象
			netHandler2: function () {
				this.inputDisabled = true;
				this.answer = DEFAULT_ANSWER.NET_WAITING;

				return fetch(URL).then(
					function (res) {
						return res.json()
					}, function (error) {
						return error
					});
			},
		}
	}
</script>

<style>
	.item {
		width: 80%;
	}
	.item-image {
		text-align: center;
	}
	.item-image img {
		max-width: 100%;
	}
</style>
