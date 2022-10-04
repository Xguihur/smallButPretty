module.exports = () => ({
	"easycom": {
		"^u-(.*)": "@/uni_modules/uview-ui/components/u-$1/u-$1.vue"
	},
	"pages": [{
			"path": "pages/index/index"
		},
		{
			"path": "pages/login/login"
		}, {
			"path": "pages/my/my"
		}
	],
	"tabBar": {
		"color": "#7A7E83",
		"borderStyle": "white",
		"selectedColor": "#276fff",
		"list": [{
				"pagePath": "pages/index/index"
			},
			{
				"pagePath": "pages/my/my"
			}
		]
	},
	"globalStyle": {
		"navigationBarTextStyle": "black",
		"navigationBarBackgroundColor": "#f1f2f3",
		"backgroundColor": "#f1f2f3",
		"app-plus": {
			"background": "#efeff4"
		}
	}
})
