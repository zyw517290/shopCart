var App = new Vue({
	el:'#appAdress',
	data:{
		addressList:[],
		shippingMethod:1,
		checkAddress:0,
		listNum:3,
		addressBgShow:false,
		delShopAddress:false
	},
	mounted:function(){
		var that = this;
		this.$nextTick(function(){
			that.getAddressList();
		})
	},
	computed:{
		filterAddress:function(){
			return this.addressList.slice(0,this.listNum);
		}
	},
	methods:{
		getAddressList:function(){
			var that = this;
			this.$http.get('data/address.json').then(function(resList){
				that.addressList = resList.data.result;
				console.log(that.addressList);
			})
		},
		setDefaultAddress:function(items){
//			this.currentAddress = items;
			items.isDefault = true
		},
		listShow:function(){
			if(this.listNum == this.addressList.length){
				this.listNum = 3;
			}
			else{
				this.listNum = this.addressList.length
			}
		},
		editShow:function(){
			this.addressBgShow = true;
		},
		editHidden:function(){
			this.addressBgShow = false;
		},
//		删除地址
//		delAddress:function(){
//			this.delShopAddress = true;
//		},
//		delAddressHidden:function(){
//			this.delShopAddress = false;
//		}
	}
})
