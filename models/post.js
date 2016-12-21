/**
 * @file post.js
 * @brief 
 * @author xianfei - http://www.cnblogs.com/xianfei689
 * @version post Db deal
 * @date 2016-12-13
 */

var mongodb = require('./db');

function Post(name,title,post){
        this.name = name;
        this.title = title;
        this.post = post;
}

module.exports = Post;



/*储存一篇文章及其相关信息 */
Post.prototype.save = function(calback){
        var  date = new Date();
        //储存各种时间格式,方便以后扩展
        var  time = {
                date:date,
                year:date.getFullYear(),
                month:date.getFullYear()+(date.getMonth()+1),
                day:date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate(),
                minute:date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+""+date.getHours()+"."+date.getMinutes()
        }
        //要存入数据库的文档
        var  post = {name:this.name,time:time,title:this.title,post:this.post};
        //打开数据库
        mongodb.open(function(err,db){
                if(err){return calback(err);}
                //读取posts集合
                db.collection('posts',function(){
                        if(err){
                                mongodb.close();
                                return calback(err);
                        }
                        //将文档插入posts集合
                        collection.insert(post,{safe:true},function(err,post){
                                mongodb.close();
                                callback(err,post);//成功! 返回插入的文档
                        })  
                })

        })

}

Post.get  = function(name,callback){

        //打开数据库
        mongodb.open(function(err,db){
                if(err){return calback(err)}
                //读取posts集合
                db.collection("posts",function(err,collection){
                        if(err){mongodb.close(); return callback(err);}  
                        var query = {};
                        if(name){
                                query.name = name;
                        }
                        //根据query对象查询文章
                        collection.find(query).sort({time:-1}).toArray(function(err,docs){
                                mongodb.close();
                                if(err){callback(err,null);}//失败  返回null
                                callback(null,docs);//成功  以数组的形式返回查询的结果
                        })
                })
        })


}



