<template>
	<div>
		<h1>demo8 --表单输入</h1>
		<p class="item">
			<span>单选框</span>
			<label>A<input type="radio" name="radio" value="radioA" v-model="radioValue"></label>
			<label>B<input type="radio" name="radio" value="radioB" v-model="radioValue"></label>
			<label>C<input type="radio" name="radio" value="radioC" v-model="radioValue"></label>
			<span>选择值是{{radioValue}}</span>
		</p>
		<p class="item">
			<span>复选框</span>
			<label>A<input type="checkbox" name="checkbox" value="checkboxA" v-model="checkboxValue"></label>
			<label>B<input type="checkbox" name="checkbox" value="checkboxB" v-model="checkboxValue"></label>
			<label>C<input type="checkbox" name="checkbox" value="checkboxC" v-model="checkboxValue"></label>
			<span>选择值是{{checkboxValue}}</span>
		</p>
		<p class="item">
			<span>下拉框</span>
			<label>
				<select v-model="selectValue">
					<option v-for="value of 3" :value="value" :key="value">{{value}}</option>
				</select>
			</label>
			<span>选择值是{{selectValue}}</span>
		</p>
		<p class="item">
			<span>绑定值</span>
			<label>A<input type="checkbox" name="checkbox2" true-value="yes" false-value='no'
										 v-model="checkboxValue2"></label>
			<span>选择值是{{checkboxValue2}}</span>
		</p>
		<p class="item">
			<span>绑定值</span>
			<label>A<input type="radio" name="radio2" :value="obj"
										 v-model="radioValue2"></label>
			<span>选择值是{{radioValue2.username}}</span>
		</p>
		<p class="item">
			<span>lazy+number+trim</span>
			<label>
				<input type="text" v-model.lazy.number.trim="text"></label>
			<span>类型{{typeof text}}</span>
		</p>
	</div>
</template>

<script>
	const obj = {
		username: 'chow'
	};
	export default {
		data(){
			return {
				text: '',
				radioValue: '',
				radioValue2: '',
				checkboxValue: [],
				checkboxValue2: '',
				selectValue: '1',
				obj
			}
		},
		computed: {},
		methods: {},
		components: {}
	}
</script>

<style>

</style>
