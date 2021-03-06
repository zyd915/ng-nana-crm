var Clue = require('../../models/customer/clue')	//引入模型
var Schedule = require('../../models/customer/schedule')
var _ = require('underscore')
	
	//潜在客户列表页
	exports.list = function(req,res){
		var user = req.session.user
		Clue.fetch({"userlocal":user.email},function(err,clues){
			if(err){
				res.json({
					msg:err
				})
				console.log(err)
			}else{
				res.json({
					clues:clues
				})
			}
		})
	}
	//潜在客户更新、新建
	exports.save = function(req,res){
		var clueObj = req.body.clue 	//从路由传过来的 clue对象
		var user = req.session.user
		var _clue
		if(!clueObj.companyName){
			res.json({msg:"公司名不能为空",status: 0})
		}else{
			_clue = new Clue({
				isTop: clueObj.isTop,
				isChecked: clueObj.isChecked,
				group: clueObj.group,
				website: clueObj.website,
				class: clueObj.class,
				companyName: clueObj.companyName,
				name: clueObj.name,
				progress: clueObj. progress,
				tags: clueObj.tags,
				star: clueObj.star,
				group: clueObj.group,
				origin: clueObj.origin,
				mobile: clueObj.mobile,
				fax: clueObj.fax,
				st: clueObj.st,
				remark: clueObj.remark,
				peoples: clueObj.peoples,
				position: clueObj.position,
				email: clueObj.email,
				country: clueObj.country,
				address: clueObj.address,
				schedule: clueObj.schedule,
				schedule_expired: clueObj.schedule_expired,
				schedule_complete: clueObj.schedule_complete,
				business: clueObj.business,
				userlocal:user.email,
				domainlocal:user.domain
			})

			clueObj.schedule.forEach(function(value,index){

				var _schedule
				_schedule = new Schedule({
					people: value.selectPeople,
					from: value.fromDate,
					until: value.untilDate,
					remind: value.remind.date,
					content: value.content,
					userlocal:user.email,
					domainlocal:user.domain
				})
				_schedule.save(function(err,customer){
					if(err){
						res.json({
							msg:err
						})
					}

				})
			})

			_clue.save(function(err,clue){
				if(err){
					res.json({
						msg:err
					})
					console.log(err)
				}else{
					res.json({msg:"添加成功",status: 1})

				}
			})

			
		}
			
	}
	//潜在客户更新、新建
	exports.update = function(req,res){
		var user = req.session.user
		var id = req.body.clue._id
		var clueObj = req.body.clue 	//从路由传过来的 clue对象
		var _clue
		if(id !=="undefined"){
			Clue.findById(id,function(err,clue){
				if(err){
					console.log(err)
				}
				if(clueObj.schedule !== []){
					clueObj.schedule.forEach(function(value,index){
						if(clueObj.schedule.length-1 == index ){
							var _schedule
							_schedule = new Schedule({
								people: value.selectPeople,
								from: value.fromDate,
								until: value.untilDate,
								remind: value.remind.date,
								content: value.content,
								userlocal:user.email,
								domainlocal:user.domain
							})
							_schedule.save(function(err,customer){
								if(err){
									res.json({
										msg:err
									})
								}

							})
						}
						
					})
				}

				_clue = _.extend(clue,clueObj)	//复制对象的所有属性到目标对象上，覆盖已有属性 ,用来覆盖以前的数据，起到更新作用
				_clue.save(function(err,clue){
					if(err){
						res.json({
							msg:err
						})
						console.log(err)
					}else{
						res.json({msg:"更新成功",status: 1})

					}
				})
			})
		}
		
	}
	//潜在客户详情页
	exports.detail = function(req,res){
		var id = req.params.id		//拿到id的值
		Clue.findById(id,function(err,clue){
			res.json({
				clue:clue
			})
		})
	}
	//删除潜在客户
	exports.del = function(req,res){
		var id = req.query.id
		if(id){
			Clue.remove({_id: id},function(err,clue){
				if(err){
					res.json({
						msg:err
					})
					console.log(err)
				}else{
					res.json({status: 1,msg:"删除成功"})
				}
			})
		}
	}
	