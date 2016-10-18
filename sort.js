var arr = ['a','aaaa','aa',30,20,80,10]
// b-a  从大到小排序，a-b 从小到大 排
	arr.sort(function(a,b){
		return b-a
	})
	console.log(arr.join()) // 数组转字符串