$(function()
	{
		new class{
				constructor(){
					this.init()
				}
				init(){
					this.subdom="provide-main",
					this.initSwiper(),
					this.initScroll(),
					this.bindtoSurvey(),
					this.bindbannerClose(),
					this.bindSubmitData(),
					this.initFormvalue()
				}
				initFormvalue(){
					return this.formmapping={"provide-main":[{key:"username",name:"姓名",
					val:$('.provide-main input[name="username"]').val()},
					{key:"mobile",name:"联系方式",
					val:$(".provide-main input[name='mobile']").val()},
					{key:"companyname",name:"公司名称",
					val:$(".provide-main input[name='companyname']").val()},
					{key:"address",name:"公司地址",
					val:$(".provide-main input[name='address']").val()}],
					"partner-main":[{key:"username",name:"姓名",
					val:$(".partner-main input[name='username']").val()},
					{key:"mobile",name:"联系方式",val:$(".partner-main input[name='mobile']").val()},
					{key:"communtiyname",name:"小区名称",val:$(".partner-main input[name='communtiyname']").val()},
					{key:"communtiytype",name:"小区类型",val:$(".partner-main input[name='communtiytype']").val()},
					{key:"address",name:"公司地址",val:$(".partner-main input[name='address']").val()},
					{key:"communtiynum",name:"小区户数",val:$(".partner-main input[name='communtiynum']").val()},
					{key:"joinresult",name:"申请理由",val:$(".partner-main textarea[name='joinresult']").val()}]},
					this.formmapping[this.subdom]}initSwiper(){
						new Swiper(".swiper-container",{
							loop:!1,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},
							on:{slideChangeTransitionStart:function(){let e=[{title:"线上小程序",desc:"提供面向消费者的线上触点，实现整个模式的数据化信息化，商品、需求、销售、会员等。"},
							{title:"线上线下融合社群",desc:"基于线下社区属性和线上需求属性的社群。"}][this.activeIndex];
							$(".second-right-nav-title").hasClass("second-right-nav-title-show")&&$(".second-right-nav-title").removeClass("second-right-nav-title-show"),
							setTimeout(()=>{$(".second-right-nav-title .right-title").html(e.title),
								$(".second-right-nav-title .right-desc").html(e.desc),
								$(".second-right-nav-title").addClass("second-right-nav-title-show")},300)}}})}
				initScroll(){
							let e=null,
							t=!1;
							$(window).scroll(
								function(){
									clearTimeout(e),n(),e=setTimeout(()=>{
									let e=$(window).scrollTop();
									e>300?$("#header-navbar").css({transform:"translateY(-0.6rem)"},
									400):$("#header-navbar").css({transform:"translateY(0)"},400),
									console.log("winHeight",e),console.log("four-content",
									$(window).scrollTop(),
									$(".four-content").offset().top)
									},500)
								}
							);

							const n=()=>{if(t)return;const e=$(".four-content"),
							n=$(window).scrollTop(),
							a=$(".four-content").offset().top;
							n+$(window).height()-e.height()>a&&(t=!0,$(".four-content").css({transform:"translateY(0)"}))}
				}

				bindtoSurvey(){
					$("#survey-btn li").click(e=>{let{query:t,title:n}=e.currentTarget.dataset;
						n&&t&&($(".survey-title").html(n),$(".right-survey-banner").css({transform:"translateX(0)"}),
							this.subdom=t,$(`.${t}`).addClass("survey-form-show").siblings().removeClass("survey-form-show"))})
				}


				bindbannerClose(){
					$(".right-survey-banner img").click(()=>{
					$(".right-survey-banner").css({transform:"translateX(2.87rem)"})})
				}


				bindSubmitData(){
					$('form input[type="button"]').click(e=>{
						let t=this.initFormvalue();
					
						if(this.checkFromData(t)&&t){

							let e=this.formSerialize(t),
								n={
									data:e=Object.assign({
									type:"provide-main"==this.subdom?"provide":"partner"
								},e),
									method:"POST",url:"https://store.freshxiaomei.com/v1/officialwebsite/customerapply"
								};
								
							console.log("pass",n),this.request(n).then(e=>{
								console.log(e,"res"),
								0==e.error_code?(layer.msg("提交成功！"),
								$(".right-survey-banner").css({transform:"translateX(2.87rem)"
							})):layer.msg(e.error_msg)})
						}

					})
				}
							
					formSerialize(e){
						let t={};return console.log("form",e),Array.isArray(e)&&e.forEach(e=>{t[e.key]=e.val}),t
					}
					
					checkFromData(e=[]){
									let t=!0;
									for(let n=0;n<e.length;n++){if(e[n]&&""==e[n].val){
										layer.msg(`${e[n].name}不能为空`),t=!1;
										break
									}
									if("mobile"==e[n].key&&!this.checkMobile(e[n].val)){
										t=this.checkMobile(e[n].val);
										break
									}
								}
								return t
					}

					checkMobile(e){
						return!!/^[1][0-9]{10}$/.test(e)||(layer.msg("手机号不正确"),!1)
					}
					
					request(e){
						return new Promise((t,n)=>{
									$.ajax({
										type:e.method||"GET",
										url:e.url,
										data:JSON.stringify(e.data),dataType:"json",
										contentType:"application/json",
										xhrFields:{withCredentials:!0},
										headers:Object.assign(e.header||{},this.setHeader()),success(e){
											t(e)}})
								})
					}

					setHeader(){
						return{"X-STORE-TYPE":"COLLECTION","X-STORE-APPID":"5be9205ec1fecc50acc12a1d","X-STORE-APPKEY":"TJs7YC039Os5jTlWxC69ALT1"}
					}
				}});







