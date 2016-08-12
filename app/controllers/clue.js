var Clue = require('../models/clue')	//引入模型
var _ = require('underscore')
	
	//客户列表页
	exports.list = function(req,res){

		Clue.fetch(function(err,clues){
			res.json({
				success:"1",
				clues:clues
			})
		})
	}
	//客户更新、新建
	exports.save = function(req,res){
		var clueObj = req.body.clue 	//从路由传过来的 clue对象
		var _clue
			_clue = new Clue({
				isTop: clueObj.isTop,
				isChecked: clueObj.isChecked,
				group: clueObj.group,
				companyName: clueObj.companyName,
				name: clueObj.name,
				progress: clueObj. progress,
				tags: clueObj.tags,
				star: clueObj.star,
				group: clueObj.group,
				origins: clueObj.origins,
				mobile: clueObj.mobile,
				fax: clueObj.fax,
				st: clueObj.st,
				remark: clueObj.remark,
				peoples: clueObj.peoples,
				position: clueObj.position,
				email: clueObj.email,
				country: clueObj.country,
				schedule: clueObj.schedule,
				schedule_expired: clueObj.schedule_expired,
				schedule_complete: clueObj.schedule_complete,
				business: clueObj.business
			})
			_clue.save(function(err,clue){
				if(err){
					console.log(err)
				}
				res.json({status:"添加成功",success: 1})
			})
	}
	//客户更新、新建
	exports.update = function(req,res){
		var id = req.body.clue._id
		var clueObj = req.body.clue 	//从路由传过来的 clue对象
		var _clue
		if(id !=="undefined"){
			Clue.findById(id,function(err,clue){
				if(err){
					console.log(err)
				}
				_clue = _.extend(clue,clueObj)	//复制对象的所有属性到目标对象上，覆盖已有属性 ,用来覆盖以前的数据，起到更新作用
				_clue.save(function(err,clue){
					if(err){
						console.log(err)
					}

					res.json({status:"更新成功",success: 1})
				})
			})
		}
		
	}
	//客户详情页
	exports.detail = function(req,res){
		var id = req.params.id		//拿到id的值
		Clue.findById(id,function(err,clue){
			res.json({
				title:'客户详情页',
				clue:clue
			})
		})
	}
	//删除客户
	exports.del = function(req,res){
		var id = req.query.id
		if(id){
			Clue.remove({_id: id},function(err,clue){
				if(err){
					console.log(err)
				}else{
					res.json({success: 1})
				}
			})
		}
	}

	//admin page
	exports.new = function(req,res){
		res.render('admin',{
			title:'后台页面',
			clue:{

			}
		})
	}

	