let http = require('http');
let fs = require('fs');
let url = require('url');
//获取轮播图接口   /sliders
let sliders = require('./sliders');

function read(cb) {
    fs.readFile('./book.json', 'utf8', function (err, data) {
        if (err || data.length == 0) {
            cb([]); // 如果有错误或者文件没长度就是空数组
        } else {
            cb(JSON.parse(data)); //将读出来的内容转化成对象
        }
    })
}

function write(data, cb) { //写入内容
    fs.writeFile('./book.json', JSON.stringify(data), cb)
}

let pageSize = 5; //每页显示5个
/*read(function (books) { //books代表所有图书
  console.log(books);
});*/
http.createServer((req, res) => {
    //解决跨域
    /*res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.setHeader("X-Powered-By", ' 3.2.1');
    if (req.method == "OPTIONS") return res.end();
    /!*让options请求快速返回*!/*/

    let {pathname, query} = url.parse(req.url, true); //true把query转化为对象
    if (pathname === '/page') {
        let offset = parseInt(query.offset) || 0;
        read(function (books) {
            let result = books.reverse().slice(offset, offset + pageSize);//数据倒序
            let hasMore = true; //默认有更多
            if (books.length <= offset + pageSize) { //已经显示的数目大于总条数
                hasMore = false;
            }
            res.setHeader('Content-Type', 'application/json;charset=utf8');

            res.end(JSON.stringify({hasMore, result}));

        });
        return;
    }
    if (pathname === '/sliders') {
        res.setHeader('Content-Type', 'application/json;charset=utf8');
        return res.end(JSON.stringify(sliders));
    }
    if (pathname === '/hot') {
        read(function (books) {
            let hot = books.reverse().slice(0, 6);
            setTimeout(() => {
                res.end(JSON.stringify(hot));
            }, 1000);

        });
        return
    }
    if (pathname === '/book') { //对书进行增删改查
        let id = parseInt(query.id); //去除的是字符串
        switch (req.method) { //?id=1
            case 'GET':
                if (!isNaN(id)) { //查询一个
                    read(function (books) {
                        let book = books.find(item => item.bookId === id);
                        if (!book) book = {}; //如果没找到是undefined
                        res.setHeader('Content-Type', 'application/json;charset=utf8');
                        res.end(JSON.stringify(book));
                    });
                } else {//获取所有图书
                    read(function (books) {
                        res.end(JSON.stringify(books.reverse()));
                    })
                }
                break;
            case 'POST':
                let str = "";
                req.on('data', chunk => {
                    str += chunk
                });
                req.on('end', () => {
                    let book = JSON.parse(str);
                    read(function (books) { //添加id
                        book.bookId = books.length ? books[books.length - 1].bookId + 1 : 1;
                        books.push(book);//将数据放到books中，books在内存中
                        write(books, function () {
                            res.end(JSON.stringify(book));
                        })
                    })
                });
                break;
            case 'PUT':
                if (id) { //获取当前要修改的id
                    let str = '';
                    req.on('data', chunk => {
                        str += chunk;
                    });
                    req.on('end', () => {
                        let book = JSON.parse(str); //book要改成什么样子
                        read(function (books) {
                            books = books.map(item => {
                                if (item.bookId == id) { //找到id相同的一本书
                                    return book
                                }
                                return item; //其他书正常返回即可
                            });
                            write(books, function () {//将数据写回json中
                                res.end(JSON.stringify(book));
                            })
                        })
                    });
                }
                break;
            case 'DELETE':
                read(function (books) {
                    books = books.filter(item => item.bookId !== id);
                    write(books, function () {
                        res.end(JSON.stringify({})) //删除返回空对象
                    })
                });
                break;
        }
        return
    }

    //读取一个路径
    fs.stat('.' + pathname,function (err,stats) {
       if (err) {
           res.statusCode = 404;
           res.end('NOT FOUND');
       }  else {
           if (stats.isDirectory()){
               let p = require('path').join('.' + pathname,'./index.html');
               fs.createReadStream(p).pipe(res);
           } else {
               fs.createReadStream('.' + pathname).pipe(res);
           }

       }
    });
}).listen(3000);
