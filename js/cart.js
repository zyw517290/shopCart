/**
 * Created by matrix on 2017/6/14.
 */
var vm = new Vue({
    el: "#app",
    data: {
        productList:[]
    },
    mounted:function () {
        this.cartView();
    },
    methods: {
        cartView: function () {
            var _this = this;
            this.$http.get('data/cartData.json').then(function (res) {
                console.log(res.data);
                // _this.productList = res.result.list;
            })
        }
    }
});