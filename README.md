虚拟宠物医院后台管理前端页面，基于 [vue-element-admin](https://panjiachen.github.io/vue-element-admin) 

后端代码于：https://github.com/Onion12138/petHospital/tree/master/

部署说明：

前端：

1. 将前端项目打包：npm run build
2. 上传dist.zip文件到服务器上
3. 使用nginx反向代理
4. 具体nginx的server段配置如下

```
server {
        listen       80;
        server_name  xxx; # 公网IP地址
        client_max_body_size 100M;
        proxy_read_timeout 600;
        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

        location / {
                root /root/dist;  # 放置dist文件夹的目录 
                index index.html;
        }

        location /api/ {     # 后端请求转发
                proxy_pass http://xxx:8080/;
        }


        error_page 404 /404.html;
        location = /404.html {
        }

        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
        }
}
```

后端：

1. 使用maven对项目打包 mvn clean install
2. 将jar包上传到服务器
3. 后台运行java程序 nohup java -jar pethospital.jar > pet.out &


