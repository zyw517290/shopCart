/**
 * Created by matrix on 2017/6/14.
 */
var app = new Vue({
	el:"#app",
	data:{
		protectList : new Array(),
		overShow:false,
		checkFlag:false,
		delItem:null,
		totalMoney:0
	},
	mounted:function(){
		var that = this;
		this.$nextTick(function(){
			that.getCartData();
		})  
	},
	filters:{
		filterMoney(value){
			return '¥ ' + value.toFixed(2) + ' 元';
		}
	},
	methods:{
//		调取json数据
		getCartData:function(){
			var that = this;
			this.$http.get('data/cartData.json').then( res=> {
				that.protectList=res.data.result.list;
				console.log(that.protectList);
			})
		},
//		遮罩层显示
		showCover:function(item){
			this.overShow = true;
			this.delItem = item;
		},
//		点击删除  实行删除功能
		delProduct:function(){
			var item = this.delItem;
			var index = this.protectList.indexOf(item);
			this.protectList.splice(index,1);
			this.overShow = false; 
			this.priceAdd();
		},
//		遮罩层隐藏
		closeOver:function(){
			this.overShow = false;
		},
//		点击加减
		addProductNum:function(item,num){
//			判断加加
			if(num>=1){
				item.productQuantity++;
			}
			else{
//				判断减的时候小于1的时候不继续减
				item.productQuantity--;
				if(item.productQuantity<=1){
					item.productQuantity = 1;
				}
			}
			this.priceAdd();
		},
//		点击全选
		clickChecked:function(flag){
			var that = this;
			that.checkFlag = flag;
			that.protectList.forEach(function(item,index){
				if(typeof item.checked == 'undefined'){
					that.$set(item,'checked',flag)
				}else{
					item.checked = flag;
				}
			})
			this.priceAdd();
		},		
//		点击单选
		checkAllProduct:function(item){
			if(typeof item.checked == 'undefined'){
				this.$set(item,'checked',true)
			}else{
				item.checked = !item.checked;
			}
			this.priceAdd();
		},
//		点击全选 单选时总价显示
		priceAdd:function(){
			var that = this;
			that.totalMoney = 0;
			that.protectList.forEach(function(item,index){
				if(item.checked){
					that.totalMoney += item.productQuantity*item.productPrice;
				}				
			})
		}
	}
})
